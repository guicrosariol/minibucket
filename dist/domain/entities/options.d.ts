interface OptionsProps {
    bucketsPath: string;
    bucketDb: boolean;
}
declare class Options {
    private static instance;
    data: OptionsProps;
    private constructor();
    static getInstance(): Options;
    static create(props: OptionsProps): Options;
}

export { Options, type OptionsProps };
