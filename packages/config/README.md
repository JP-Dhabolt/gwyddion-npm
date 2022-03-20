# @gwyddion/config

This package contains various configuration files, plus a package script.

## Jest Configuration

```js
// jest.config.js


// eslint-disable-next-line
const base = require('@gwyddion/config/files/jest.config');

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  ...base,
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
};

```

## Typescript Configuration (`tsconfig.json`)

```json
{
  "extends": "@gwyddion/config/files/node-tsconfig.json",
  "include": [
    "./**/*.ts"
  ],
  "exclude": [
    "dist"
  ],
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src"
  },
}

```
