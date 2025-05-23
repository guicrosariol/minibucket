import { Bucket } from '../entities/bucket.js';
import '../../core/entites/entity.js';

interface TypeBucketDbRepository {
  create(bucket: Bucket): void;
  findById(bucketId: string): Bucket | null
}

export type { TypeBucketDbRepository };
