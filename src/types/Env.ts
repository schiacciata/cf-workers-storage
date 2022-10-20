export default interface Env {
    [key: string]: string | KVNamespace | R2Bucket;
};