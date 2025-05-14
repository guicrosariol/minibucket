import type { Bucket } from "../entities/bucket";

export interface TypeBucketDbRepository {
  create(bucket: Bucket): void;
  findById(bucketId: string): Bucket | null
}