"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// minibucket/application/repositories/bucket-db-repository.ts
var bucket_db_repository_exports = {};
__export(bucket_db_repository_exports, {
  BucketDbRepository: () => BucketDbRepository
});
module.exports = __toCommonJS(bucket_db_repository_exports);

// minibucket/domain/entities/options.ts
var Options = class _Options {
  constructor(options) {
    this.data = options;
  }
  static getInstance() {
    if (!_Options.instance) {
      _Options.instance = new _Options({
        bucketsPath: "./minibucket/buckets",
        bucketDb: true
      });
    }
    return _Options.instance;
  }
  static create(props) {
    return new _Options(props);
  }
};

// minibucket/core/options-provider.ts
var optionsInstance = Options.getInstance();

// minibucket/lib/sqlite.ts
var import_better_sqlite3 = __toESM(require("better-sqlite3"));
var import_node_fs = __toESM(require("fs"));
var import_node_path = __toESM(require("path"));
var Db = class {
  static create() {
    const dirPath = import_node_path.default.resolve(optionsInstance.data.bucketsPath);
    if (!import_node_fs.default.existsSync(dirPath)) {
      import_node_fs.default.mkdirSync(dirPath, { recursive: true });
    }
    const db = new import_better_sqlite3.default(`${dirPath}/minibucket.db`);
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
};

// minibucket/application/repositories/bucket-db-repository.ts
var BucketDbRepository = class {
  findById(bucketId) {
    const db = Db.create();
    const bucket = db.prepare("SELECT * FROM buckets WHERE id = ?").get(bucketId);
    return bucket;
  }
  create(bucket) {
    const db = Db.create();
    db.prepare("INSERT INTO buckets (id, name, description, bucketsPath) VALUES (?, ?, ?, ?)").run(bucket.id, bucket.props.name, bucket.props.description, bucket.props.bucketsPath);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BucketDbRepository
});
