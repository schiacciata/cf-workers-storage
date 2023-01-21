# cf-workers-storage

🗂 Set of utilities to help you manage your cloudflare worker storages

**Avaible classes:**

• [CacheManager.ts](src/core/CacheManager.ts)

• [KVManager.ts](src/core/KVManager.ts)

• [R2Manager.ts](src/core/R2Manager.ts)

# Installation

```bash
npm i schiacciata/cf-workers-storage
```

# Example

```typescript
import { KVManager, StorageEnv } from '@schiacciata/cf-workers-storage';

export interface Env extends StorageEnv {
	CUSTOM_KV: KVNamespace;
	//remember to add them in the wrangler.toml file
}

export default {
	async fetch(
		request: Request,
		env: Env,
		ctx: ExecutionContext
	): Promise<Response> {
		const kvStorage = new KVManager({
			context: ctx,
			env: env,
			kvName: 'DEFAULT_KV'
		});

		const newKV  = 'CUSTOM_KV';
		const key = request.url;

		const result = await kvStorage.get({
			key,
			kvName: newKV
		});
		if (result) return new Response(`Key ${key} has value ${result}`);

		const value = request.method;
		kvStorage.set({
			key,
			kvName: newKV,
			value,
		});

		return new Response(`Saved value ${value} for key ${key} in kv ${newKV}`);
	},
};
```