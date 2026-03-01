// src/app.d.ts
import type { PlatformProxy } from 'wrangler';

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    // interface PageState {}
    interface Platform {
      env?: {
        GITHUB_TOKEN?: string;
        // Add other Cloudflare bindings here
        // KV?: KVNamespace;
        // DB?: D1Database;
      };
      context?: ExecutionContext;
      caches?: CacheStorage & { default: Cache };
    }
  }
}

export {};
