declare class Entity<T> {
    readonly props: T;
    readonly id: string;
    constructor(props: T, id?: string);
}

export { Entity };
