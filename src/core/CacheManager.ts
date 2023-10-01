import { ICacheClass, CacheClassOptions, customCaches, getOptions, setOptions } from "../types/CacheManager";
import BaseManager from "./Base";

class CacheManager extends BaseManager implements ICacheClass {
    cacheName: customCaches;
    constructor(options: CacheClassOptions) {
        super(options);
        
        this.cacheName = options.cacheName || "default";
    }

    public async get({
        cacheName,
        key,
        options,
    }: getOptions): Promise<Response | undefined> {
        if (!this.isEnabled) return;
        
        const cache = await this.getCache(cacheName);
        this.log('Matching cache', { key });
        return await cache.match(key, options);
    };

    public async set({
        cacheName,
        key,
        value,
    }: setOptions): Promise<void> {
        if (!this.isEnabled) return;
        
        const cache = await this.getCache(cacheName);

        this.log('Saving to cache', { key, value });
        return this.context.waitUntil(cache.put(key, value.clone()));
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