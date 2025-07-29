module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "airbnb",
    "airbnb-typescript",
    "prettier", // Must be the last item
  ],
  parserOptions: {
    project: "./tsconfig.json",
  },
  ignorePatterns: ["playwright-report/**", "test-results/**", "coverage/**"],
  rules: {
    "react/react-in-jsx-scope": "off",
  },
  overrides: [
    {
      files: [
        "vite.config.js",
        "vitest.config.ts",
        "playwright.config.ts",
        "**/*.test.{js,jsx,ts,tsx}",
        "**/setupTests.{js,ts,tsx}",
      ],
      rules: {
        "import/no-extraneous-dependencies": [
          "error",
          { devDependencies: true },
        ],
      },
    },
  ],
};
