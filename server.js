const express = require('express');
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const { all, run, ready } = require('./db');

const app = express();
app.set('trust proxy', 1);

const PORT = process.env.PORT || 3000;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
const tokens = new Set();

// Photos are kept in memory, then saved inside the database
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 1.5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => cb(null, /^image\//.test(file.mimetype))
});

const wrap = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-token');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});
app.use(express.json());

const sendPage = file => (req, res) =>
  res.sendFile(path.join(__dirname, file), err => { if (err) res.status(404).end(); });
app.get('/', sendPage('index.html'));
app.get('/index.html', sendPage('index.html'));
app.get('/style.css', sendPage('style.css'));
app.get('/app.js', sendPage('app.js'));
app.get('/road.jpg', sendPage('road.jpg'));

function adminOnly(req, res, next) {
  if (tokens.has(req.headers['x-token'])) return next();
  res.status(401).json({ error: 'Unauthorized' });
}

// Limit: 10 new reports per hour from one internet connection
const hits = new Map();
function limitReports(req, res, next) {
  const now = Date.now();
  const list = (hits.get(req.ip) || []).filter(t => now - t < 3600000);
  if (list.length >= 10) return res.status(429).json({ error: 'Too many reports. Please try again after some time.' });
  list.push(now); hits.set(req.ip, list);
  next();
}

// List reports (filter + search)
app.get('/api/reports', wrap(async (req, res) => {
  const { status, q } = req.query;
  let sql = `SELECT id,name,title,damage_type,severity,description,address,latitude,longitude,
             status,upvotes,created_at,(image_data IS NOT NULL) AS has_image FROM reports WHERE 1=1`;
  const params = [];
  if (status && status !== 'all') { sql += ' AND status = ?'; params.push(status); }
  if (q) {
    sql += ' AND (title LIKE ? OR address LIKE ? OR description LIKE ?)';
    params.push(`%${q}%`, `%${q}%`, `%${q}%`);
  }
  sql += ' ORDER BY id DESC';
  res.json(await all(sql, params));
}));

// Photo of a report
app.get('/api/reports/:id/image', wrap(async (req, res) => {
  const rows = await all('SELECT image_data, image_type FROM reports WHERE id = ?', [req.params.id]);
  if (!rows[0] || !rows[0].image_data) return res.status(404).end();
  res.set('Content-Type', rows[0].image_type || 'image/jpeg');
  res.set('Cache-Control', 'public, max-age=86400');
  res.send(Buffer.from(rows[0].image_data, 'base64'));
}));

// Similar open reports (to avoid duplicates)
const STOP = ['road', 'street', 'main', 'near', 'the', 'and', 'opposite', 'nagar', 'salai', 'big', 'pothole', 'with', 'for'];
app.get('/api/similar', wrap(async (req, res) => {
  const words = String(req.query.text || '').toLowerCase()
    .split(/[\s,.\-\/]+/).filter(w => w.length >= 3 && !STOP.includes(w)).slice(0, 8);
  if (!words.length) return res.json([]);
  const need = words.length >= 3 ? 2 : 1;
  const rows = await all("SELECT id,title,address,status,upvotes FROM reports WHERE status != 'fixed' ORDER BY id DESC LIMIT 500");
  const found = rows
    .map(r => { const hay = (r.title + ' ' + r.address).toLowerCase(); return { r, s: words.filter(w => hay.includes(w)).length }; })
    .filter(x => x.s >= need)
    .sort((a, b) => b.s - a.s || b.r.upvotes - a.r.upvotes)
    .slice(0, 3).map(x => x.r);
  res.json(found);
}));

// Stats
app.get('/api/stats', wrap(async (req, res) => {
  const rows = await all('SELECT status, COUNT(*) AS c FROM reports GROUP BY status');
  const s = { total: 0, pending: 0, inprogress: 0, fixed: 0 };
  rows.forEach(r => { s[r.status] = Number(r.c); s.total += Number(r.c); });
  res.json(s);
}));

// New report
app.post('/api/reports', limitReports, upload.single('image'), wrap(async (req, res) => {
  const b = req.body;
  if (!b.name || !b.title || !b.damage_type || !b.severity || !b.address)
    return res.status(400).json({ error: 'Missing required fields' });
  const lat = b.latitude ? parseFloat(b.latitude) : null;
  const lng = b.longitude ? parseFloat(b.longitude) : null;
  const r = await run(
    `INSERT INTO reports (name,title,damage_type,severity,description,address,latitude,longitude,image_data,image_type)
     VALUES (?,?,?,?,?,?,?,?,?,?)`,
    [b.name, b.title, b.damage_type, b.severity, b.description || '', b.address, lat, lng,
     req.file ? req.file.buffer.toString('base64') : null, req.file ? req.file.mimetype : null]
  );
  res.json({ id: Number(r.lastInsertRowid) });
}));

// Upvote
app.post('/api/reports/:id/upvote', wrap(async (req, res) => {
  await run('UPDATE reports SET upvotes = upvotes + 1 WHERE id = ?', [req.params.id]);
  const rows = await all('SELECT upvotes FROM reports WHERE id = ?', [req.params.id]);
  res.json(rows[0] || {});
}));

// Admin login
app.post('/api/admin/login', (req, res) => {
  if (req.body.password !== ADMIN_PASSWORD) return res.status(401).json({ error: 'Wrong password' });
  const token = crypto.randomBytes(16).toString('hex');
  tokens.add(token);
  res.json({ token });
});

// Admin: change status
app.put('/api/reports/:id/status', adminOnly, wrap(async (req, res) => {
  const { status } = req.body;
  if (!['pending', 'inprogress', 'fixed'].includes(status)) return res.status(400).json({ error: 'Bad status' });
  await run('UPDATE reports SET status = ? WHERE id = ?', [status, req.params.id]);
  res.json({ ok: true });
}));

// Admin: delete
app.delete('/api/reports/:id', adminOnly, wrap(async (req, res) => {
  await run('DELETE FROM reports WHERE id = ?', [req.params.id]);
  res.json({ ok: true });
}));

app.use((err, req, res, next) => {
  console.error('ERROR:', err.message);
  res.status(400).json({ error: err.message });
});

ready
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch(e => { console.error('Database error:', e.message); process.exit(1); });