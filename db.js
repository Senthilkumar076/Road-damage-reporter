const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');

// On the live website the database is kept on a permanent disk (DATA_DIR)
const DATA_DIR = process.env.DATA_DIR || __dirname;
fs.mkdirSync(DATA_DIR, { recursive: true });

const db = new Database(path.join(DATA_DIR, 'road.db'));
db.exec(fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8'));

module.exports = db;