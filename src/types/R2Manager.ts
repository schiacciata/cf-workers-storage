import Env from "./Env";

type buckets = keyof Env;
interface ClassOptions {
    isEnabled: boolean;
    debug: boolean;
    env: Env;
    ctx: ExecutionContext;
    bucketName?: buckets;
};

interface baseOptions {
    bucketName?: buckets;
    key: string;
}

type saveOptions = baseOptions & {
    value: string | ReadableStream | ArrayBuffer | Blob | ArrayBufferView | null;
};

type getOptions = baseOptions;

export type {
    buckets,
    ClassOptions,
    saveOptions,
    getOptions,
}