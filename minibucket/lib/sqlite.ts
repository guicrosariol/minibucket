import { optionsInstance } from "../core/options-provider";
import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";

export class Db {
  static create() {
    const dirPath = path.resolve('buckets');

    if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    }

    const db = new Database(`${dirPath}/test.db`)
    db.exec(`
      CREATE TABLE IF NOT EXISTS buckets (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT NOT NULL,
        bucketsPath TEXT NOT NULL
      )
      `)
    return db;
  }
}
