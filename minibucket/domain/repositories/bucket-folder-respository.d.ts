import type { Bucket } from "../entities/bucket";

export interface TypeBucketFolderRepository {
  create(bucket: Bucket): Promise<void>;
}