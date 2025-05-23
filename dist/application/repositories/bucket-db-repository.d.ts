import { Bucket } from '../../domain/entities/bucket.js';
import { TypeBucketDbRepository } from '../../domain/repositories/bucket-db-repository.d.js';
import '../../core/entites/entity.js';

declare class BucketDbRepository implements TypeBucketDbRepository {
    findById(bucketId: string): Bucket | null;
    create(bucket: Bucket): void;
}

export { BucketDbRepository };
