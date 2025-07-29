# Pairing playground

[![Tests](https://github.com/themartec/pairing-playground/actions/workflows/tests.yml/badge.svg)](https://github.com/themartec/pairing-playground/actions/workflows/tests.yml)

## TL;DR

```sh
git clone git@github.com:themartec/pairing-playground.git
cd pairing-playground

nvm use
make                # show usage instructions
make full-build     # run full build including E2E tests
```

---

## Overview

This is a simple repo for a `NodeJS` project. It has a frontend using `React`,
a backend using `Express` and runs on `vite`.

### Local development server

```sh
# run development server
npm run dev

# open in browser
open http://localhost:5173/

# or curl the API
curl http://localhost:5173/api/health
```

### Developer tools

#### 1. Linting

using `ESLint`

```sh
npm run lint
npm run lint:fix
```

#### 2. Formatting

using `Prettier`

```sh
npm run format
```

#### 3. Unit Testing

using `vitest`

```sh
npm run test:unit
```

#### 4. a11y (Accessiblity) Testing

using `jest-axe`

```sh
npm run test:a11y
```

#### 5. E2E (end-to-end) Testing

using `playwright`

```sh
npm run test:e2e        # run the e2e test
npm run test:e2e:ui     # open the Playwright UI
npm run test:e2e:headed # run e2e tests with headed browser
```

#### 6. Build

The build can be run with

```sh
make build          # excluding e2e tests
make full-build
```

This is what is run by the GitHub Actions.

## Setup

The full setup is documented here

- [docs/SETUP.md](docs/SETUP.md)
