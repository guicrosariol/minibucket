import { makeCreateBucketUseCase } from "./application/factories/create-bucket";
import { optionsInstance } from "./core/options-provider";
import { type OptionsProps } from "./domain/entities/options";


type MiniBucketReturn = {
  options: OptionsProps;
  bucket: ReturnType<typeof makeCreateBucketUseCase>;
};

const minibucket = (optionsProps: OptionsProps): MiniBucketReturn => {
  optionsInstance.data = optionsProps;

  return {
    options: optionsInstance.data,
    bucket: makeCreateBucketUseCase()
  };
};

export default minibucket;

minibucket({
  bucketDb: true,
  bucketsPath: 'sla'
}).bucket.execute({
  name: 'gui',
  description: 'gui'
})