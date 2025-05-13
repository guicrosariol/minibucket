import { Bucket } from "../../domain/entities/bucket";
import type { BucketFolderRepository } from "../repositories/bucket-folder-repository";

interface CreateBucketUseCaseProps {
  name: string;
  description: string;
}

export class CreateBucketUseCase {
  constructor(
    private bucketFolderRepository: BucketFolderRepository
  ) { }

  execute(props: CreateBucketUseCaseProps) {
    const bucket = Bucket.create(props);
    this.bucketFolderRepository.create(bucket);
  }
}