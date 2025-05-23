import { TypeBucketFolderRepository } from '../../domain/repositories/bucket-folder-respository.d.js';

declare class BucketFolderRepository implements TypeBucketFolderRepository {
    create(bucketsPath: string): Promise<void>;
}

export { BucketFolderRepository };
