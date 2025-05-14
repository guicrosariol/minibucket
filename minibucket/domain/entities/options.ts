export interface OptionsProps {
  bucketsPath: string;
  bucketDb: boolean
}

export class Options {
  private static instance: Options;
  public data: OptionsProps;

  private constructor(
    options: OptionsProps) {
    this.data = options;
  }

  static getInstance() {
    if (!Options.instance) {
      Options.instance = new Options({
        bucketsPath: "./minibucket/buckets",
        bucketDb: true
      });
    }
    return Options.instance;
  }

  static create(props: OptionsProps) {
    return new Options(props);
  }
}

