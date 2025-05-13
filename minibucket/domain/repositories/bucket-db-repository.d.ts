import type { Bucket } from "../entities/bucket";

export interface TypeBucketDbRepository {
  create(bucket: Bucket): Promise<void>;
}