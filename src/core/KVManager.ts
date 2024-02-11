import { IKVClass, kvs, KVClassOptions, getOptions, setOptions, deleteOptions } from "../types/KVManager";
import Env from "../types/Env";
import BaseManager from "./Base";

class KVManager extends BaseManager implements IKVClass {
    env: Env;
    kvName: kvs;
    constructor(options: KVClassOptions) {
        super(options);

        this.env = options.env;
        this.kvName = options.kvName || 'DEFAULT_KV';
    }

    public async get({
        kvName,
        key,
        options,
    }: getOptions): Promise<string | null> {
        if (!this.isEnabled) return null;
        if (!key) return null;
        
        this.log('Getting from kv', { key });
        return await this
            .getKV(kvName)
            .get(key, options);
    };

    public set({
        kvName,
        key,
        value,
        options,
    }: setOptions): void {
        if (!this.isEnabled) return this.log('Not enabled');
        if (!key || !value) return this.log('Key or value is missing');

        this.log('Saving to kv', { key });
        return this.context.waitUntil(this
            .getKV(kvName)
            .put(key, value, options));
    }

    public async delete({
        kvName,
        key,
    }: deleteOptions): Promise<void> {
        if (!this.isEnabled) return;
        
        this.log('Deleting from kv', { key });
        return await this
            .getKV(kvName)
            .delete(key);
    };

    private getKV(name: kvs = this.kvName): KVNamespace {
        if (!name) throw new Error(`kv name not provided`);
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