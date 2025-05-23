import { optionsInstance } from "../core/options-provider";
import type { Database as BetterSqlite3Database } from "better-sqlite3";
import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";

export class Db {
  static create(): BetterSqlite3Database {
    const dirPath = path.resolve(optionsInstance.data.bucketsPath);

    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    const db = new Database(`${dirPath}/minibucket.db`);
    db.exec(`
      CREATE TABLE IF NOT EXISTS buckets (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT NOT NULL,
        bucketsPath TEXT NOT NULL
      )
    `);

    return db;
  }
}