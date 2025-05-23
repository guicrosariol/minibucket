import type { BucketPath } from "../value-objects/bucket-path";

export interface TypeBucketFolderRepository {
  create(bucket: string): Promise<void>;
}