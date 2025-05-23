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

// minibucket/application/factories/create-bucket.ts
var create_bucket_exports = {};
__export(create_bucket_exports, {
  makeCreateBucketUseCase: () => makeCreateBucketUseCase
});
module.exports = __toCommonJS(create_bucket_exports);

// minibucket/application/repositories/bucket-folder-repository.ts
var import_promises = require("fs/promises");
var BucketFolderRepository = class {
  async create(bucketsPath) {
    await (0, import_promises.mkdir)(bucketsPath, { recursive: true });
  }
};

// minibucket/core/entites/uuid.ts
var import_node_crypto = require("crypto");
var UUID = class {
  static create(id) {
    return id ?? (0, import_node_crypto.randomUUID)();
  }
};

// minibucket/core/entites/entity.ts
var Entity = class {
  constructor(props, id) {
    this.props = props;
    this.id = UUID.create(id);
  }
};

// minibucket/domain/entities/bucket.ts
var Bucket = class _Bucket extends Entity {
  static create(props) {
    return new _Bucket(props);
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

// minibucket/application/use-cases/create-bucket.ts
var CreateBucketUseCase = class {
  constructor(bucketFolderRepository, bucketDbRepository, OptionsInstance) {
    this.bucketFolderRepository = bucketFolderRepository;
    this.bucketDbRepository = bucketDbRepository;
    this.OptionsInstance = OptionsInstance;
  }
  execute(props) {
    const bucketId = UUID.create();
    const bucketsPath = BucketPath.create({
      bucketName: props.name,
      bucketId
    });
    const bucket = Bucket.create({
      name: props.name,
      description: props.name,
      bucketsPath
    });
    this.bucketFolderRepository.create(bucket.props.bucketsPath);
    if (this.OptionsInstance.data.bucketDb === true) {
      const doesBucketExist = this.bucketDbRepository.findById(bucket.id);
      if (doesBucketExist) {
        throw new Error("Bucket already exists");
      }
      this.bucketDbRepository.create(bucket);
    }
  }
};

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

// minibucket/application/factories/create-bucket.ts
function makeCreateBucketUseCase() {
  const bucketFolderRepository = new BucketFolderRepository();
  const bucketDbRepository = new BucketDbRepository();
  return new CreateBucketUseCase(bucketFolderRepository, bucketDbRepository, optionsInstance);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  makeCreateBucketUseCase
});
