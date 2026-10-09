CREATE TABLE IF NOT EXISTS reports (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  damage_type TEXT NOT NULL,
  severity TEXT NOT NULL,
  description TEXT,
  address TEXT NOT NULL,
  latitude REAL,
  longitude REAL,
  image TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  upvotes INTEGER NOT NULL DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);