import { optionsInstance } from "../../core/options-provider";

interface BucketPathProps {
  bucketName: string;
  bucketId: string;
}

export class BucketPath {
  private bucketName: string;
  private bucketId: string;

  constructor(props: BucketPathProps) { 
    this.bucketName = props.bucketName;
    this.bucketId = props.bucketId;
  }

  static create({
    bucketName,
    bucketId,
  }: BucketPathProps) {
    const PathInstance = new BucketPath({
      bucketName,
      bucketId,
    });
    return `${optionsInstance.data.bucketsPath}/${PathInstance.bucketName}-${PathInstance.bucketId}`
  }
}

