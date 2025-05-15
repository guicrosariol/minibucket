import { optionsInstance } from "../../core/options-provider";
import type { Bucket } from "../../domain/entities/bucket";
import type { TypeBucketDbRepository } from "../../domain/repositories/bucket-db-repository";
import { Db } from "../../lib/sqlite";

export class BucketDbRepository implements TypeBucketDbRepository {
  findById(bucketId: string): Bucket | null {
    const db = Db.create();
    const bucket = db.prepare("SELECT * FROM buckets WHERE id = ?").get(bucketId) as Bucket | null;
    return bucket
  }

  create(bucket: Bucket) {
    const db = Db.create();
    db.prepare("INSERT INTO buckets (id, name, description, bucketsPath) VALUES (?, ?, ?, ?)").run(bucket.id, bucket.name, bucket.description, bucket.bucketsPath);
  }

}