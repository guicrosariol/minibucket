import { Bucket } from "../../domain/entities/bucket";
import type { TypeBucketFolderRepository } from "../../domain/repositories/bucket-folder-respository";
import type { TypeBucketDbRepository } from "../../domain/repositories/bucket-db-repository";
import type { Options } from "../../domain/entities/options";

interface CreateBucketUseCaseProps {
  name: string;
  description: string;
}

export class CreateBucketUseCase {
  constructor(
    private bucketFolderRepository: TypeBucketFolderRepository,
    private bucketDbRepository: TypeBucketDbRepository,
    private OptionsInstance: Options
  ) { }

  execute(props: CreateBucketUseCaseProps) {
    const bucket = Bucket.create(props);
    this.bucketFolderRepository.create(bucket);

    if (this.OptionsInstance.data.bucketDb === true) {
      const doesBucketExist = this.bucketDbRepository.findById(bucket.id);
      if (doesBucketExist) {
        throw new Error("Bucket already exists");
      }
      this.bucketDbRepository.create({
        id: bucket.id,
        name: bucket.name,  
        description: bucket.description,
        bucketsPath: bucket.bucketsPath
      });
    }
  }
}