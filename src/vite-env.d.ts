/// <reference types="svelte" />
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_AKSHARE_API: string;
  readonly VITE_ISTOCK_API: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface ErrorConstructor {
  captureStackTrace: Function;
}
