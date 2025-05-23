import { makeCreateBucketUseCase } from './application/factories/create-bucket.js';
import { OptionsProps } from './domain/entities/options.js';
import './application/use-cases/create-bucket.js';
import './domain/repositories/bucket-folder-respository.d.js';
import './domain/repositories/bucket-db-repository.d.js';
import './domain/entities/bucket.js';
import './core/entites/entity.js';

type MiniBucketReturn = {
    options: OptionsProps;
    bucket: ReturnType<typeof makeCreateBucketUseCase>;
};
declare const minibucket: (optionsProps: OptionsProps) => MiniBucketReturn;

export { minibucket as default };
