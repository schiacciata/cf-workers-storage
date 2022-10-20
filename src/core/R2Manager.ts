import { buckets, ClassOptions, getOptions, saveOptions } from "../types/R2Manager";
import Env from "../types/Env";

class R2Manager implements ClassOptions {
    isEnabled: boolean;
    debug: boolean;
    env: Env;
    ctx: ExecutionContext;
    bucketName: buckets;
    constructor({
        isEnabled = true,
        debug = false,
        env,
        ctx,
        bucketName,
    }: ClassOptions) {
        this.isEnabled = isEnabled;
        this.debug = debug;
        this.env = env;
        this.ctx = ctx;
        this.bucketName = bucketName || 'DEFAULT_BUCKET';
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

    public save({
        bucketName,
        key,
        value,
    }: saveOptions): void {
        if (!this.isEnabled) return this.log('Not enabled');
        if (!key || !value) return this.log('Key or value is missing');
        
        const bucket = this.getBucket(bucketName);

        this.log('Saving to bucket', { key, bucket });
        return this.ctx.waitUntil(bucket.put(key, value));
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