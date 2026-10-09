const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const db = require('./db');

const app = express();
app.set('trust proxy', 1);

const PORT = process.env.PORT || 3000;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
const DATA_DIR = process.env.DATA_DIR || __dirname;
const tokens = new Set();

const uploadDir = path.join(DATA_DIR, 'uploads');
fs.mkdirSync(uploadDir, { recursive: true });

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) =>
      cb(null, Date.now() + '-' + Math.round(Math.random() * 1e6) + path.extname(file.originalname).toLowerCase())
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => cb(null, /^image\/(jpeg|png|webp|gif)$/.test(file.mimetype))
});

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
app.use('/uploads', express.static(uploadDir));

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
app.get('/api/reports', (req, res) => {
  const { status, q } = req.query;
  let sql = 'SELECT * FROM reports WHERE 1=1';
  const params = [];
  if (status && status !== 'all') { sql += ' AND status = ?'; params.push(status); }
  if (q) {
    sql += ' AND (title LIKE ? OR address LIKE ? OR description LIKE ?)';
    params.push(`%${q}%`, `%${q}%`, `%${q}%`);
  }
  sql += ' ORDER BY id DESC';
  res.json(db.prepare(sql).all(...params));
});

// Similar open reports (to avoid duplicates)
const STOP = ['road', 'street', 'main', 'near', 'the', 'and', 'opposite', 'nagar', 'salai', 'big', 'pothole', 'with', 'for'];
app.get('/api/similar', (req, res) => {
  const words = String(req.query.text || '').toLowerCase()
    .split(/[\s,.\-\/]+/).filter(w => w.length >= 3 && !STOP.includes(w)).slice(0, 8);
  if (!words.length) return res.json([]);
  const need = words.length >= 3 ? 2 : 1;
  const rows = db.prepare("SELECT id,title,address,status,upvotes FROM reports WHERE status != 'fixed' ORDER BY id DESC LIMIT 500").all();
  const found = rows
    .map(r => { const hay = (r.title + ' ' + r.address).toLowerCase(); return { r, s: words.filter(w => hay.includes(w)).length }; })
    .filter(x => x.s >= need)
    .sort((a, b) => b.s - a.s || b.r.upvotes - a.r.upvotes)
    .slice(0, 3).map(x => x.r);
  res.json(found);
});

// Stats
app.get('/api/stats', (req, res) => {
  const rows = db.prepare('SELECT status, COUNT(*) c FROM reports GROUP BY status').all();
  const s = { total: 0, pending: 0, inprogress: 0, fixed: 0 };
  rows.forEach(r => { s[r.status] = r.c; s.total += r.c; });
  res.json(s);
});

// New report
app.post('/api/reports', limitReports, upload.single('image'), (req, res) => {
  const b = req.body;
  if (!b.name || !b.title || !b.damage_type || !b.severity || !b.address)
    return res.status(400).json({ error: 'Missing required fields' });
  const lat = b.latitude ? parseFloat(b.latitude) : null;
  const lng = b.longitude ? parseFloat(b.longitude) : null;
  const info = db.prepare(
    `INSERT INTO reports (name,title,damage_type,severity,description,address,latitude,longitude,image)
     VALUES (?,?,?,?,?,?,?,?,?)`
  ).run(b.name, b.title, b.damage_type, b.severity, b.description || '', b.address, lat, lng, req.file ? req.file.filename : null);
  res.json({ id: info.lastInsertRowid });
});

// Upvote
app.post('/api/reports/:id/upvote', (req, res) => {
  db.prepare('UPDATE reports SET upvotes = upvotes + 1 WHERE id = ?').run(req.params.id);
  const r = db.prepare('SELECT upvotes FROM reports WHERE id = ?').get(req.params.id);
  res.json(r || {});
});

// Admin login
app.post('/api/admin/login', (req, res) => {
  if (req.body.password !== ADMIN_PASSWORD) return res.status(401).json({ error: 'Wrong password' });
  const token = crypto.randomBytes(16).toString('hex');
  tokens.add(token);
  res.json({ token });
});

// Admin: change status
app.put('/api/reports/:id/status', adminOnly, (req, res) => {
  const { status } = req.body;
  if (!['pending', 'inprogress', 'fixed'].includes(status)) return res.status(400).json({ error: 'Bad status' });
  db.prepare('UPDATE reports SET status = ? WHERE id = ?').run(status, req.params.id);
  res.json({ ok: true });
});

// Admin: delete
app.delete('/api/reports/:id', adminOnly, (req, res) => {
  const r = db.prepare('SELECT image FROM reports WHERE id = ?').get(req.params.id);
  if (r && r.image) fs.unlink(path.join(uploadDir, r.image), () => {});
  db.prepare('DELETE FROM reports WHERE id = ?').run(req.params.id);
  res.json({ ok: true });
});

app.use((err, req, res, next) => {
  console.error('ERROR:', err.message);
  res.status(400).json({ error: err.message });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));