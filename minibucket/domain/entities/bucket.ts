import { Entity } from "../../core/entites/entity";
import { UUID } from "../../core/entites/uuid";
import { BucketPath } from "../value-objects/bucket-path";

interface BucketProps {
  name: string;
  description: string;
  bucketsPath: string;
}

export class Bucket extends Entity<BucketProps> {
  static create(props: BucketProps) {
    return new Bucket(props)
  }
}

