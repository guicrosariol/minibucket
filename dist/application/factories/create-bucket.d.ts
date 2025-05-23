import { CreateBucketUseCase } from '../use-cases/create-bucket.js';
import '../../domain/repositories/bucket-folder-respository.d.js';
import '../../domain/repositories/bucket-db-repository.d.js';
import '../../domain/entities/bucket.js';
import '../../core/entites/entity.js';
import '../../domain/entities/options.js';

declare function makeCreateBucketUseCase(): CreateBucketUseCase;

export { makeCreateBucketUseCase };
