import { BaseClassOptions, baseMethodsOptions, IBaseClass } from "./Base";

interface ICacheClass extends IBaseClass {
    cacheName: customCaches;
};

type customCaches = keyof CacheStorage;
interface CacheClassOptions extends BaseClassOptions {
    cacheName?: customCaches;
};

interface baseCacheMethodsOptions extends baseMethodsOptions {
    cacheName?: customCaches;
}

type setOptions = baseCacheMethodsOptions & {
    value: Response;
};
type getOptions = baseCacheMethodsOptions & {
    options?: CacheQueryOptions
};

export type {
    ICacheClass,
    customCaches,
    CacheClassOptions,

    setOptions,
    getOptions,
}