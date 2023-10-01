interface IBaseClass {
    isEnabled: boolean;
    debug: boolean;
    context: ExecutionContext;
    get(opts: getOptions): void;
    set(opts: setOptions<never>): void;
};

interface BaseClassOptions {
    isEnabled?: boolean;
    debug?: boolean;
    context: ExecutionContext;
};

interface baseMethodsOptions {
    key: string;
}

type setOptions <T> = baseMethodsOptions & {
    value: T;
};
type getOptions = baseMethodsOptions;

type FilterKeysByValueType<T, ValueType> = {
    [K in keyof T]: T[K] extends ValueType ? K : never;
};  

export type {
    IBaseClass,
    BaseClassOptions,

    baseMethodsOptions,
    setOptions,
    getOptions,

    FilterKeysByValueType,
}