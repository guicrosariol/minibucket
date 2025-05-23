import { Database } from 'better-sqlite3';

declare class Db {
    static create(): Database;
}

export { Db };
