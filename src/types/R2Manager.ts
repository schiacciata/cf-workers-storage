import { BaseClassOptions, baseMethodsOptions, FilterKeysByValueType, IBaseClass } from "./Base";
import Env from "./Env";

type BucketKeys = FilterKeysByValueType<Env, R2Bucket>;
type buckets = BucketKeys[keyof BucketKeys];
interface IR2Class extends IBaseClass {
    env: Env
    bucketName: buckets;
};

interface R2ClassOptions extends BaseClassOptions {
    bucketName?: buckets;
    env: Env;
};

interface baseR2MethodsOptions extends baseMethodsOptions {
    bucketName?: buckets;
    key: string;
}

type setOptions = baseR2MethodsOptions & {
    value: string | ReadableStream | ArrayBuffer | Blob | ArrayBufferView | null;
    options?: R2PutOptions;
};

type getOptions = baseR2MethodsOptions;

type deleteOptions = baseR2MethodsOptions & {
    key: string | string[];
}

export type {
    IR2Class,
    buckets,
    R2ClassOptions,
    
    setOptions,
    getOptions,
    deleteOptions,
}