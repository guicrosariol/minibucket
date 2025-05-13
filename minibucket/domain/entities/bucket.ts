import { UUID } from "../../core/uuid";
import { BucketPath } from "../value-objects/bucket-path";

interface BucketProps {
  id?: string;
  name: string;
  description: string;
  bucketsPath?: string;
}

export class Bucket {
  private id: string;
  public readonly bucketsPath: string;
  public readonly name: string;
  public readonly description: string;

  constructor({
    name,
    description,
  }: BucketProps) {
    this.id = UUID.create();
    this.name = name;
    this.description = description;
    this.bucketsPath = BucketPath.create({
      bucketName: name,
      bucketId: this.id
    });
  }

  static create(props: BucketProps) {
    return new Bucket(props)
  }
}

