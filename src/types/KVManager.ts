import { BaseClassOptions, baseMethodsOptions, IBaseClass } from "./Base";
import Env from "./Env";

type kvs = keyof Env;
interface IKVClass extends IBaseClass {
    env: Env;
    kvName: kvs;
};

interface KVClassOptions extends BaseClassOptions {
    kvName?: kvs;
    env: Env;
};

interface baseKVMethodsOptions extends baseMethodsOptions {
    kvName?: kvs;
}

type setOptions = baseKVMethodsOptions & {
    value: string | ReadableStream | ArrayBuffer | ArrayBufferView;
};
type getOptions = baseKVMethodsOptions;

export type {
    IKVClass,
    kvs,
    KVClassOptions,
    
    setOptions,
    getOptions,
}