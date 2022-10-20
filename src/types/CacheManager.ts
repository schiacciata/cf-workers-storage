type customCaches = keyof CacheStorage;
interface ClassOptions {
    isEnabled: boolean;
    debug: boolean;
    ctx: ExecutionContext;
    cacheName?: customCaches;
};

interface baseOptions {
    key: string;
    cacheName?: customCaches;
}

type saveOptions = baseOptions & {
    value: Response;
};
type getOptions = baseOptions;

export type {
    customCaches,
    ClassOptions,
    saveOptions,
    getOptions,
}