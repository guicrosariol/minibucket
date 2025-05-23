import { Bucket } from "../../domain/entities/bucket";
import type { TypeBucketFolderRepository } from "../../domain/repositories/bucket-folder-respository";
import type { TypeBucketDbRepository } from "../../domain/repositories/bucket-db-repository";
import type { Options } from "../../domain/entities/options";
import { UUID } from "../../core/entites/uuid";
import { BucketPath } from "../../domain/value-objects/bucket-path";

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

    const bucketId = UUID.create()
    const bucketsPath = BucketPath.create({
      bucketName: props.name,
      bucketId
    });

    const bucket = Bucket.create({
      name: props.name,
      description: props.name,
      bucketsPath
    });
    
    this.bucketFolderRepository.create(bucket.props.bucketsPath);

    if (this.OptionsInstance.data.bucketDb === true) {
      const doesBucketExist = this.bucketDbRepository.findById(bucket.id);
      if (doesBucketExist) {
        throw new Error("Bucket already exists");
      }
      this.bucketDbRepository.create(bucket);
    }
  }
}