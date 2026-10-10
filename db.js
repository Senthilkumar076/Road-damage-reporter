const { createClient } = require('@libsql/client');

// On the live site these come from Render. On your PC it uses a local file.
const db = createClient({
  url: process.env.TURSO_DATABASE_URL || 'file:local.db',
  authToken: process.env.TURSO_AUTH_TOKEN
});

const all = async (sql, args = []) =>
  (await db.execute({ sql, args })).rows.map(r => ({ ...r }));
const run = (sql, args = []) => db.execute({ sql, args });

const ready = db.execute(`CREATE TABLE IF NOT EXISTS reports (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  damage_type TEXT NOT NULL,
  severity TEXT NOT NULL,
  description TEXT,
  address TEXT NOT NULL,
  latitude REAL,
  longitude REAL,
  image_data TEXT,
  image_type TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  upvotes INTEGER NOT NULL DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)`);

module.exports = { all, run, ready };