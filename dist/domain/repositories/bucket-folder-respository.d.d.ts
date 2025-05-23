interface TypeBucketFolderRepository {
  create(bucket: string): Promise<void>;
}

export type { TypeBucketFolderRepository };
