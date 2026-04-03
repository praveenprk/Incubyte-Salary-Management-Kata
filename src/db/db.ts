import Database from 'better-sqlite3'
import path from 'path'

const db = new Database(path.join(__dirname, '../../salary_kata.db'))

db.exec(`
  CREATE TABLE IF NOT EXISTS employees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    salary REAL NOT NULL,
    job_title TEXT NOT NULL,
    country TEXT NOT NULL
  )
`)

export default db