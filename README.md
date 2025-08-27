# Pairing playground

[![Tests](https://github.com/themartec/pairing-playground/actions/workflows/tests.yml/badge.svg)](https://github.com/themartec/pairing-playground/actions/workflows/tests.yml)

## TL;DR

```sh
git clone git@github.com:themartec/pairing-playground.git
cd pairing-playground

nvm use
make                # show usage instructions
make full-build     # run full build including E2E tests
                    # NOTE: check Debugging section below if you get errors
```

NOTE: extra installation help that would be required for above

```sh
# you may need to install correct version of node
nvm install             # assuming you have nvm installed

# you may need to install playwright
npx playwright install
```

to run the code

```sh
npm run dev
open http://localhost:5173/
```

---

## Pairing Challenges

The idea is that the following challenges are done in a pairing session. There
are no "right" or "wrong" answers, there is only the ability to "share intent"
through design, communications and code. By all means take a look at them, but
there is no need to prepare for them in any way. The only thing to prepare is
that you can run the code and test suite as per the [TL;DR](#tldr). In the
pairing session we will see how well we can work through the problems in a
collaborative pairing session.

### Challenge I - accessibility

Bring in the challenge.

```sh
export VITE_CHALLENGE_ONE=1       # or enable it in .env file
```

Run and fix the tests.

```sh
npm run test:a11y
# alternatively in watch mode
npm run test:a11y -- --watch
```

The test failures are handy in providing links to more information on a11y.

### Challenge II - CSS styling

Bring in the challenge.

```sh
export VITE_CHALLENGE_TWO=1       # or enable it in .env file
npm run dev
```

Two `400px` cards will appear on the page. Your aim is to:

- On desktop (≥768px), keep the two cards side by side and 400px wide.
- On mobile (<768px), stack the cards vertically and ensure they span the full
  width with appropriate spacing.

### Challenge III - slow loading UX

Bring in the challenge.

```sh
export API_DELAY=2000             # or enable it in .env file
npm run dev
```

You will work with the file `src/components/LandingPage.tsx`.

Notice that pressing `submit` now takes 2 seconds to complete and the user has
no feedback what is happening.

- Fix the UX (User experience)
- Do you need to write any tests?

### Challenge IV - API errors

Bring in the challenge.

```sh
export API_FAILURE_RATE=0.5       # or enable it in .env file
npm run dev
```

You will work with the file `src/components/LandingPage.tsx`.

Notice that pressing `submit` will now fail around 50% of the time (the 0.5 RATE
set in environment variable).

- Inform the user that an error has occured
- Do you need to write any tests?

### Challenge V - Architecture

Right now the form `POST` is to a locally server `/api/submit`. We will provide
you with an external `API` endpoint on the internet. Architect a solution to use
either:

- local `/api/submit`
- internet `https://some-url.com/api/submit`

You will work with the file `src/components/LandingPage.tsx`.

### Challenge VI - Error retries

Bring in the challenge.

```sh
export API_FAILURE_RATE=0.5       # or enable it in .env file
npm run dev
```

You will work with the file `src/components/LandingPage.tsx`.

As mentioned in [Challenge IV](#challenge-iv---api-errors) you will have an
error based on the `RATE` you set. Expand your code to always succeed through
some kind of retry mechanism.

---

## Debugging

if you get an error like

```sh
  Oops! Something went wrong! :(

  ESLint: 8.57.1

  Error [ERR_MODULE_NOT_FOUND]: Cannot find package ...
```

You may have a conflicting `eslint.config.js` file in your `PATH`. You can
check with the following command

```sh
make find-conflict-lint-config
```

simplest way around it, is to remove any conflicting `eslint.config.mjs` files.

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

#### 7. Styling

This repo uses `ant.design` https://ant.design/docs/react/introduce and has
styled components configured as well.

## Setup

The full setup is documented here

- [docs/SETUP.md](docs/SETUP.md)
