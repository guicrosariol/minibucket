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

// minibucket/minibucket.ts
var minibucket_exports = {};
__export(minibucket_exports, {
  default: () => minibucket_default
});
module.exports = __toCommonJS(minibucket_exports);

// minibucket/application/repositories/bucket-folder-repository.ts
var import_promises = require("fs/promises");
var BucketFolderRepository = class {
  async create(bucket) {
    await (0, import_promises.mkdir)(bucket.bucketsPath, { recursive: true });
  }
};

// minibucket/core/uuid.ts
var UUID = class {
  static create() {
    return crypto.randomUUID();
  }
};

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

// minibucket/domain/value-objects/bucket-path.ts
var BucketPath = class _BucketPath {
  constructor(props) {
    this.bucketName = props.bucketName;
    this.bucketId = props.bucketId;
  }
  static create({
    bucketName,
    bucketId
  }) {
    const pathInstance = new _BucketPath({
      bucketName,
      bucketId
    });
    return `${optionsInstance.data.bucketsPath}/${pathInstance.bucketName}-${pathInstance.bucketId}`;
  }
};

// minibucket/domain/entities/bucket.ts
var Bucket = class _Bucket {
  constructor({
    name,
    description
  }) {
    this.id = UUID.create();
    this.name = name;
    this.description = description;
    this.bucketsPath = BucketPath.create({
      bucketName: name,
      bucketId: this.id
    });
  }
  static create(props) {
    return new _Bucket(props);
  }
};

// minibucket/application/use-cases/create-bucket.ts
var CreateBucketUseCase = class {
  constructor(bucketFolderRepository2, bucketDbRepository2, OptionsInstance) {
    this.bucketFolderRepository = bucketFolderRepository2;
    this.bucketDbRepository = bucketDbRepository2;
    this.OptionsInstance = OptionsInstance;
  }
  async execute(props) {
    const bucket = Bucket.create(props);
    await this.bucketFolderRepository.create(bucket);
    if (this.OptionsInstance.data.bucketDb === true) {
      const doesBucketExist = this.bucketDbRepository.findById(bucket.id);
      if (doesBucketExist) {
        throw new Error("Bucket already exists");
      }
      this.bucketDbRepository.create({
        id: bucket.id,
        name: bucket.name,
        description: bucket.description,
        bucketsPath: bucket.bucketsPath
      });
    }
  }
};

// minibucket/lib/sqlite.ts
var import_better_sqlite3 = __toESM(require("better-sqlite3"));
var import_node_fs = __toESM(require("fs"));
var import_node_path = __toESM(require("path"));
var Db = class {
  static create() {
    const dirPath = import_node_path.default.resolve("buckets");
    if (!import_node_fs.default.existsSync(dirPath)) {
      import_node_fs.default.mkdirSync(dirPath, { recursive: true });
    }
    const db = new import_better_sqlite3.default(`${dirPath}/test.db`);
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
  constructor() {
    this.db = Db.create();
  }
  findById(bucketId) {
    const bucket = this.db.prepare("SELECT * FROM buckets WHERE id = ?").get(bucketId);
    return bucket;
  }
  create(bucket) {
    this.db.prepare("INSERT INTO buckets (id, name, description, bucketsPath) VALUES (?, ?, ?, ?)").run(bucket.id, bucket.name, bucket.description, bucket.bucketsPath);
  }
};

// minibucket/application/factories/create-bucket.ts
var bucketFolderRepository = new BucketFolderRepository();
var bucketDbRepository = new BucketDbRepository();
var makeCreateBucketUseCase = new CreateBucketUseCase(bucketFolderRepository, bucketDbRepository, optionsInstance);

// minibucket/minibucket.ts
var minibucket = (optionsProps) => {
  optionsInstance.data = optionsProps;
  return {
    options: optionsInstance.data,
    bucket: makeCreateBucketUseCase
  };
};
var minibucket_default = minibucket;
minibucket({
  bucketsPath: "buckets",
  bucketDb: true
}).bucket.execute({
  name: "jean",
  description: "jean"
});
