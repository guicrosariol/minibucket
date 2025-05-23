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

// minibucket/application/repositories/bucket-folder-repository.ts
var bucket_folder_repository_exports = {};
__export(bucket_folder_repository_exports, {
  BucketFolderRepository: () => BucketFolderRepository
});
module.exports = __toCommonJS(bucket_folder_repository_exports);
var import_promises = require("fs/promises");
var BucketFolderRepository = class {
  async create(bucketsPath) {
    await (0, import_promises.mkdir)(bucketsPath, { recursive: true });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BucketFolderRepository
});
