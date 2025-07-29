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
