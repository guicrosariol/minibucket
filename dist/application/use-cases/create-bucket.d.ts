import { TypeBucketFolderRepository } from '../../domain/repositories/bucket-folder-respository.d.js';
import { TypeBucketDbRepository } from '../../domain/repositories/bucket-db-repository.d.js';
import { Options } from '../../domain/entities/options.js';
import '../../domain/entities/bucket.js';
import '../../core/entites/entity.js';

interface CreateBucketUseCaseProps {
    name: string;
    description: string;
}
declare class CreateBucketUseCase {
    private bucketFolderRepository;
    private bucketDbRepository;
    private OptionsInstance;
    constructor(bucketFolderRepository: TypeBucketFolderRepository, bucketDbRepository: TypeBucketDbRepository, OptionsInstance: Options);
    execute(props: CreateBucketUseCaseProps): void;
}

export { CreateBucketUseCase };
