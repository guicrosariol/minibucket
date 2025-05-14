import { BucketFolderRepository } from "../repositories/bucket-folder-repository";
import { CreateBucketUseCase } from "../use-cases/create-bucket";
import { BucketDbRepository } from "../repositories/bucket-db-repository";
import { optionsInstance } from "../../core/options-provider";

const bucketFolderRepository = new BucketFolderRepository()
const bucketDbRepository = new BucketDbRepository()
export const makeCreateBucketUseCase = new CreateBucketUseCase(bucketFolderRepository, bucketDbRepository, optionsInstance)