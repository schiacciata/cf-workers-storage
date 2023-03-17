import { IR2Class, buckets, R2ClassOptions, getOptions, setOptions } from "../types/R2Manager";
import Env from "../types/Env";
import BaseManager from "./Base";

class R2Manager extends BaseManager implements IR2Class {
    env: Env;
    bucketName: buckets;
    constructor(options: R2ClassOptions) {
        super(options);

        this.env = options.env;
        this.bucketName = options.bucketName || 'DEFAULT_BUCKET';
    }

    public async get({
        bucketName,
        key,
    }: getOptions): Promise<R2ObjectBody | null> {
        if (!this.isEnabled) return null;
        if (!key) return null;
        
        this.log('Getting from bucket', { key });
        return await this.getBucket(bucketName).get(key);
    };

    public async set({
        bucketName,
        key,
        value,
    }: setOptions): Promise<void | R2Object> {
        if (!this.isEnabled) return this.log('Not enabled');
        if (!key || !value) return this.log('Key or value is missing');
        
        const bucket = this.getBucket(bucketName);

        this.log('Saving to bucket', { key, bucket });
        return await bucket.put(key, value);
    }

    private getBucket(name: buckets = this.bucketName): R2Bucket {
        const bucket = this.env[name];
        if (!bucket) throw new Error(`bucket ${name} not found`);
        
        const r2bucket = bucket as R2Bucket;
        return r2bucket;
    };

    private log(...data: any[]): void {
        if (this.debug) console.log('[R2 MANAGER]', `[${new Date().toLocaleString()}]`, ...data);
    }
}

export default R2Manager;