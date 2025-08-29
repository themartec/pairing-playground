import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.json"],
      },
    },
    ignores: [
      "playwright-report/**",
      "test-results/**",
      "coverage/**",
      "vite.config.js",
    ],
    rules: {},
  },
  {
    files: ["src/**/*.test.{ts,tsx}"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
  {
    files: ["vite.config.js"],
    extends: [js.configs.recommended],
    rules: {
      "no-undef": "off", // deal with process
    },
  },
);
