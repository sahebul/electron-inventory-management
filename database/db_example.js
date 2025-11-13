const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');

// const dbPath = path.join(__dirname, '../database/inventory.db');

const userDataPath = path.join(process.env.APPDATA || process.env.HOME, 'LocalInventoryApp');
if (!fs.existsSync(userDataPath)) fs.mkdirSync(userDataPath, { recursive: true });

const dbPath = path.join(userDataPath, 'inventory.db');


const db = new Database(dbPath);
// const db = new Database('inventory.db');

db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    price REAL,
    quantity INTEGER
  )
`);

module.exports = {
  getProducts() {
    const stmt = db.prepare('SELECT * FROM products');
    return stmt.all();
  },
  addProduct({ name, price, quantity }) {
    const stmt = db.prepare('INSERT INTO products (name, price, quantity) VALUES (?, ?, ?)');
    stmt.run(name, price, quantity);
    return { success: true };
  }
};
