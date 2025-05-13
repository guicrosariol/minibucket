import type { Bucket } from "../../domain/entities/bucket";
import { mkdir } from "node:fs/promises";
import type { TypeBucketFolderRepository } from "../../domain/repositories/bucket-folder-respository";

export class BucketFolderRepository implements TypeBucketFolderRepository {
  async create(bucket: Bucket): Promise<void> {
    await mkdir(bucket.bucketsPath, { recursive: true });
  }
}

