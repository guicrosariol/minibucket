import { BucketFolderRepository } from "../repositories/bucket-folder-repository";
import { CreateBucketUseCase } from "../use-cases/create-bucket";
import { BucketDbRepository } from "../repositories/bucket-db-repository";
import { optionsInstance } from "../../core/options-provider";

export function makeCreateBucketUseCase() {
  const bucketFolderRepository = new BucketFolderRepository()
  const bucketDbRepository = new BucketDbRepository()
  return new CreateBucketUseCase(bucketFolderRepository, bucketDbRepository, optionsInstance)
}
