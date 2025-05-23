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

// minibucket/domain/entities/bucket.ts
var bucket_exports = {};
__export(bucket_exports, {
  Bucket: () => Bucket
});
module.exports = __toCommonJS(bucket_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Bucket
});
