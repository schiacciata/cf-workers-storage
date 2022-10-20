import Env from "./Env";

type kvs = keyof Env;
interface ClassOptions {
    isEnabled: boolean;
    debug: boolean;
    env: Env;
    ctx: ExecutionContext;
    kvName?: kvs;
};

interface baseOptions {
    kvName?: kvs;
    key: string;
}

type saveOptions = baseOptions & {
    value: string | ReadableStream | ArrayBuffer | ArrayBufferView;
};

type getOptions = baseOptions;

export type {
    kvs,
    ClassOptions,
    saveOptions,
    getOptions,
}