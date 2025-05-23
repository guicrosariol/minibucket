"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// minibucket/application/use-cases/create-bucket.ts
var create_bucket_exports = {};
__export(create_bucket_exports, {
  CreateBucketUseCase: () => CreateBucketUseCase
});
module.exports = __toCommonJS(create_bucket_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CreateBucketUseCase
});
