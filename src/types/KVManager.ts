import { BaseClassOptions, baseMethodsOptions, FilterKeysByValueType, IBaseClass } from "./Base";
import Env from "./Env";

type KVNamespaceKeys = FilterKeysByValueType<Env, KVNamespace>;
type kvs = KVNamespaceKeys[keyof KVNamespaceKeys];

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
    options?: KVNamespacePutOptions;
};

type getOptions = baseKVMethodsOptions & {
    options?: Partial<KVNamespaceGetOptions<undefined>>;
};

type deleteOptions = baseKVMethodsOptions & {};

export type {
    IKVClass,
    kvs,
    KVClassOptions,
    
    setOptions,
    getOptions,
    deleteOptions,
}