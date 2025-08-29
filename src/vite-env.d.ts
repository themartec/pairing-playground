/// <reference types="vite/client" />
// If using Vite, this provides base types

interface ImportMetaEnv {
  readonly VITE_CHALLENGE_ONE: boolean;
  readonly VITE_CHALLENGE_TWO: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
