import { mkdir } from "node:fs/promises";
import type { TypeBucketFolderRepository } from "../../domain/repositories/bucket-folder-respository";

export class BucketFolderRepository implements TypeBucketFolderRepository {
  async create(bucketsPath: string): Promise<void> {
    await mkdir(bucketsPath, { recursive: true });
  }
}

