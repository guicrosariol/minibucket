interface BucketPathProps {
    bucketName: string;
    bucketId: string;
}
declare class BucketPath {
    private bucketName;
    private bucketId;
    constructor(props: BucketPathProps);
    static create({ bucketName, bucketId, }: BucketPathProps): string;
}

export { BucketPath };
