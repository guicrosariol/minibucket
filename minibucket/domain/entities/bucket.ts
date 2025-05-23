import { Entity } from "../../core/entites/entity";
import { UUID } from "../../core/entites/uuid";
import { optionsInstance } from "../../core/options-provider";
import { BucketPath } from "../value-objects/bucket-path";

interface BucketProps {
  name: string;
  description: string;
  bucketsPath: string;
}

export class Bucket extends Entity<BucketProps> {
  static create(props: BucketProps) {
    const bucketId = UUID.create()
    props.bucketsPath = BucketPath.create({
      bucketName: props.name,
      bucketId
    })
    return new Bucket(props, bucketId)
  }
}

