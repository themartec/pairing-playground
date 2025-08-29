/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./src/setupTests.ts"],
    globals: true,
    exclude: [
      "**/node_modules/**",
      "**/e2e/**",
      "**/dist/**",
      "**/.{idea,git,cache,output,temp}/**",
      "**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*",
      "src/setupTests.ts",
    ],
    coverage: {
      provider: "v8",
      exclude: [
        "*.config.{ts,mts,js,mjs}", // Excludes all config files
        "**/*.d.*", // Excludes all declaration files
        ".*.{ts,js}", // Excludes all hidden files
        "**/*.styles.ts", // Excludes all style files
      ],
      all: true,
      thresholds: {
        lines: 90,
        functions: 90,
        branches: 90,
        statements: 90,
      },
    },
  },
});
