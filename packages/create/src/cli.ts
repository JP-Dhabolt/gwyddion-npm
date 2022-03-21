#!/usr/bin/env node

import { resolve } from 'path';
import { create } from 'create-create-app';

import { after } from './after';

const templateRoot = resolve(__dirname, '..', 'templates');

create('create-package', {
  templateRoot,
  extra: {
    scope: {
      prompt: 'never',
      type: 'input',
      describe: 'Scope of the package, if any',
    },
    isGwyddion: {
      prompt: 'never',
      type: 'confirm',
      describe: 'Whether this is an @gwyddion scoped package',
      default: false,
    },
  },
  after,
});
