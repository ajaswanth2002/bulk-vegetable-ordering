import sqlite3 from "sqlite3";
import { open } from "sqlite";

const dbPromise = open({
  filename: "./db/database.sqlite",
  driver: sqlite3.Database,
});

export async function initDB() {
  const db = await dbPromise;

  await db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      price INTEGER,
      category TEXT,
      image TEXT
    )
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      buyerName TEXT,
      productName TEXT,
      quantity INTEGER,
      address TEXT,
      status TEXT DEFAULT 'Pending'
    )
  `);

  return db;
}