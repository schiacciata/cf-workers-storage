import { BaseClassOptions, baseMethodsOptions, IBaseClass } from "./Base";
import Env from "./Env";

type buckets = keyof Env;
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
};
type getOptions = baseR2MethodsOptions;

export type {
    IR2Class,
    buckets,
    R2ClassOptions,
    
    setOptions,
    getOptions,
}