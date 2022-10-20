import { customCaches, ClassOptions, getOptions, saveOptions } from "../types/CacheManager";

class CacheManager implements ClassOptions {
    isEnabled: boolean;
    debug: boolean;
    ctx: ExecutionContext;
    cacheName: customCaches;
    constructor({
        isEnabled = true,
        debug = false,
        ctx,
        cacheName,
    }: ClassOptions) {
        this.isEnabled = isEnabled;
        this.debug = debug;
        this.ctx = ctx;
        this.cacheName = cacheName || "default";
    }

    public async get({
        cacheName,
        key,
    }: getOptions): Promise<Response | undefined> {
        if (!this.isEnabled) return;
        
        const cache = await this.getCache(cacheName);
        this.log('Matching cache', { key });
        return await cache.match(key);
    };

    public async save({
        cacheName,
        key,
        value,
    }: saveOptions): Promise<void> {
        if (!this.isEnabled) return;
        
        const cache = await this.getCache(cacheName);

        this.log('Saving to cache', { key, value });
        return this.ctx.waitUntil(cache.put(key, value.clone()));
    };

    private async getCache(name: customCaches = this.cacheName): Promise<Cache> {
        let cache: Cache | undefined;

        if (name === "default") {
            cache = caches[name];
        } else {
            cache = await caches.open(name)
            .catch((error) => {
                throw new Error(error);
            });
        };

        if (!cache) throw new Error(`cache ${name} not found`);
        this.log('Cache found', { name });

        return cache;
    };

    private log(...data: any[]): void {
        if (this.debug) console.log('[CACHE MANAGER]', `[${new Date().toLocaleString()}]`, ...data);
    };
}

export default CacheManager;