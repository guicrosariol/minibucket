import { Entity } from '../../core/entites/entity.js';

interface BucketProps {
    name: string;
    description: string;
    bucketsPath: string;
}
declare class Bucket extends Entity<BucketProps> {
    static create(props: BucketProps): Bucket;
}

export { Bucket };
