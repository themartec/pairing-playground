# Setup

The express/react project with setup with the following steps

## 1. Create a new repo

```sh
mkdir pairing-playground
cd pairing-playground
npm init --yes
```

## 2. Set version of Node

```sh
# find latest LTS
nvm ls-remote --lts

# adn add it to .nvmrc
nvm use 22.17.1 --save
```

## 3. Install core dependencies

```sh
# Core dependencies
npm install \
    express

# Development dependencies (Vite handles most build tools)
npm install --save-dev \
  vite \
  @vitejs/plugin-react \
  typescript \
  @types/node \
  @types/express

# React dependencies
npm install react react-dom
npm install --save-dev \
    @types/react \
    @types/react-dom
```

## 3. Base configuration

add node style `.gitignore` via

```sh
npx gitignore node
```

add script to run `vite` as server

```sh
echo $(jq '.scripts.dev="vite"' package.json) | jq . \
 | > package_new.json && mv package{\_new,}.json
```

## 4. Basic component setup

1. `./index.html`

```sh
cat <<EOF > index.html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Pairing Playground</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
EOF
```

2. `./src/main.tsx`

```sh
mkdir src

cat <<EOF > src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
EOF
```

3. `./src/App.tsx`

```sh
cat <<EOF > src/App.tsx
import React from "react";
import LandingPage from "./components/LandingPage";

function App() {
  return <LandingPage />
}

export default App;
EOF
```

4. `./src/components/LandingPage.tsx`

```sh
mkdir src/components

cat <<EOF > src/components/LandingPage.tsx
import React from "react";

export default function LandingPage() {
  return (
    <>
      <h1>Pairing Playground</h1>
      <h3>This is where the magic happens</h3>
    </>
  );
}
EOF
```

## 5. Run server

```sh
npm run dev
open http://localhost:5173/
```

## 6. Create basic build

```sh
make
make build
```

also `.github/workflows/tests.yml`

## 7. Git commit

```sh
git init
git commit -m "React/Express app 🎉"
```

## 8. Add basic API call

A basic health check at `src/api/healthCheckHandler.ts`

```sh
mkdir src/api

cat <<EOF > src/api/healthCheckHandler.ts
const healthCheckHandler = (_req: Request, res: any) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
};

export default healthCheckHandler;
EOF
```

update `vite.config.ts` to proxy API requests

```javascript
// create express app
const app = express();
app.use(express.json());

// API Routes
app.get("/api/health", healthCheckHandler);

// Proxy config to let Vite know about our API routes
const proxy = {
  "/api": {}, // proxy our /api route to nowhere (handled by middleware)
};

// setup expressPlugin to deal with API proxy
function expressPlugin() {
  ...
}

export default defineConfig({
 plugins: [expressPlugin(), react()],
});
```

test it

```sh
npm run dev
open http://localhost:5173/
curl http://localhost:5173/api/health
```

## 9. Linting & Formatting

install ESLint

```sh
npm install --save-dev \
    eslint \
    eslint-config-airbnb \
    eslint-plugin-import \
    eslint-plugin-react \
    eslint-plugin-react-hooks \
    eslint-plugin-jsx-a11y \
    eslint-config-airbnb-typescript \
    @typescript-eslint/eslint-plugin \
    @typescript-eslint/parser
```

**NOTE:** may need to downgrade typescript to `>=4.7.4 <5.6.0` as supported by
`@typescript-eslint/typescript-estree.`

```sh
  # in package.json
  "devDependencies": {
    ...
    "typescript": "<5.6",

npm install
```

and `prettier` for **Formatting**

```sh
npm install --save-dev \
    prettier \
    eslint-config-prettier
```

add some `.eslintrc.js` configuration

```sh
cat <<EOF > .eslintrc.js
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
};
EOF
```

and some `.tsconfig.json` configuration

```sh
cat <<EOF > tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src", "vite.config.js"]
}
EOF
```

add script to run `lint` and `format`

```sh
# npm run lint
echo $(jq '.scripts.lint="eslint ."' package.json) | jq . \
 | > package_new.json && mv package{\_new,}.json

# npm run lint:fix
echo $(jq '.scripts["lint:fix"]="eslint . --fix"' package.json) | jq . \
 | > package_new.json && mv package{\_new,}.json

# npm run format
echo $(jq '.scripts.format="prettier --write ."' package.json) | jq . \
 | > package_new.json && mv package{\_new,}.json

# npm run format:check
echo $(jq '.scripts["format:check"]="prettier --check ."' package.json) | jq . \
 | > package_new.json && mv package{\_new,}.json
```

## 10. Testing

### Unit Testing

using `vitest` which is similar to `Jest` but easier to setup with `vite`,
`typescript` and `.tsx` files.

```sh
npm install --save-dev \
    vitest \
    @vitest/ui \
    jsdom \
    @testing-library/react \
    @testing-library/jest-dom
```

add `test` scripts to `package.json`

```sh
# npm test
echo $(jq '.scripts.test="vitest"' package.json) | jq . \
 | > package_new.json && mv package{\_new,}.json

# npm run test:unit
echo $(jq '.scripts["test:unit"]="vitest --run"' package.json) | jq . \
 | > package_new.json && mv package{\_new,}.json
```

A basic testing `src/components/LandingPage.test.tsx`

a `vitest.config.ts` and `src/setupTests.ts` file

and update the `Makefile` and now you can run

```sh
npm test
npm run test:unit

# full build script
make build
```

### E2E testing

add playwrite for E2E (End to End) testing

```sh
npm install --save-dev @playwright/test
```

some `.gitignore`'s

```sh
cat <<EOF >> .gitignore

# Playwright
/test-results/
/playwright-report/
/blob-report/
/playwright/.cache/
EOF
```

```sh
# npm run test:e2e
echo $(jq '.scripts["test:e2e"]="playwright test"' package.json) | jq . \
 | > package_new.json && mv package{\_new,}.json

# npm run test:e2e:ui
echo $(jq '.scripts["test:e2e:ui"]="playwright test --ui"' package.json) | jq . \
 | > package_new.json && mv package{\_new,}.json

# npm run test:e2e:headed
echo $(jq '.scripts["test:e2e:headed"]="playwright test --headed"' package.json) | jq . \
 | > package_new.json && mv package{\_new,}.json
```

add some configuration

```sh
playwright.config.ts
```

add some tests

```sh
e2e/api-health-check.spec.ts
e2e/landing-page.spec.ts
```

and update gitbuild scripts and run the E2E in a separate GitHub Action Task

```sh
.github/workflows/tests.yml
```

### A11y (Accessibility) testing

```sh
npm install --save-dev \
  jest-axe \
  @types/jest-axe
```

and write a test `src/components/LandingPage.a11y.test.tsx`

```sh
const { container } = render(<LandingPage />);

const results = await axe(container);
expect(results).toHaveNoViolations();
```

## 11. UI Styling

Add https://ant.design/

```sh
# Ant Design
npm install antd

# and styled components
npm install styled-components
npm install --save-dev @types/styled-components
```

Required fix for using antd with React 19
https://ant.design/docs/react/v5-for-19

```sh
npm install --save \
  @ant-design/v5-patch-for-react-19
```

Add a custom config provider

```typescript
<ConfigProvider
  theme={{
    token: {
      colorPrimary: "#91DBB6",
      colorBgLayout: "#FEF9ED",
    },
    algorithm: theme.defaultAlgorithm,
  }}
>
  ...
</ConfigProvider>
```

## 12. Coverage reporting

install vitest coverage with `v8`

```sh
npm install --save-dev @vitest/coverage-v8
```

and some configuration to `vitest.config.ts`

```typescript
coverage: {
  provider: "v8",
  exclude: [
    "*.config.{ts,js}", // Excludes all config files
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
```

add a test runner including coverage `npm run test:unit:coverage`

```sh
# npm run lint
echo $(jq '.scripts["test:unit:coverage"]="vitest run --coverage"' package.json) | jq . \
 | > package_new.json && mv package{\_new,}.json
```

and update the `make build` to use it in the `Makefile`

NOTE: _this also requires that you have sufficent coverage to pass the build_

## 13. API Error and Delay simulator

Add the ability to slow down or force error in API responses

```sh
# in vite.config.js
app.use(apiErrorAndDelaySimulator);
```

can be run with environment variables `API_DELAY` and/or `API_FAILURE_RATE`

```sh
# add a 1 second delay
API_DELAY=1000 npm run dev

# 50% failure rate
API_FAILURE_RATE=0.5 npm run dev
```
