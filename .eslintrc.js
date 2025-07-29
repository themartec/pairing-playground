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
  rules: {
    "react/react-in-jsx-scope": "off",
  },
  overrides: [
    {
      files: ["vite.config.js", "**/*.test.{js,jsx,ts,tsx}"],
      rules: {
        "import/no-extraneous-dependencies": [
          "error",
          { devDependencies: true },
        ],
      },
    },
  ],
};
