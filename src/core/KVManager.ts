import { kvs, ClassOptions, getOptions, saveOptions } from "../types/KVManager";
import Env from "../types/Env";

class KVManager implements ClassOptions {
    isEnabled: boolean;
    debug: boolean;
    env: Env;
    ctx: ExecutionContext;
    kvName: kvs;
    constructor({
        isEnabled = true,
        debug = false,
        env,
        ctx,
        kvName,
    }: ClassOptions) {
        this.isEnabled = isEnabled;
        this.debug = debug;
        this.env = env;
        this.ctx = ctx;
        this.kvName = kvName || 'DEFAULT_KV';
    }

    public async get({
        kvName,
        key,
    }: getOptions): Promise<string | null> {
        if (!this.isEnabled) return null;
        if (!key) return null;
        
        this.log('Getting from kv', { key });
        return await this.getKV(kvName).get(key);
    };

    public save({
        kvName,
        key,
        value,
    }: saveOptions): void {
        if (!this.isEnabled) return this.log('Not enabled');
        if (!key || !value) return this.log('Key or value is missing');
        
        const kv = this.getKV(kvName);

        this.log('Saving to kv', { key, kv });
        return this.ctx.waitUntil(kv.put(key, value));
    }

    private getKV(name: kvs = this.kvName): KVNamespace {
        const kv = this.env[name];
        if (!kv) throw new Error(`kv ${name} not found`);
        
        const r2bucket = kv as KVNamespace;
        return r2bucket;
    };

    private log(...data: any[]): void {
        if (this.debug) console.log('[KV MANAGER]', `[${new Date().toLocaleString()}]`, ...data);
    }
}

export default KVManager;