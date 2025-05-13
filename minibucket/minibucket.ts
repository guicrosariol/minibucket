import { optionsInstance } from "./core/options-provider";
import { type OptionsProps } from "./domain/entities/options";

const minibucket = (optionsProps: OptionsProps) => {
  optionsInstance.data = optionsProps

  return {
    options: optionsInstance.data,
  }
}
export default minibucket;


