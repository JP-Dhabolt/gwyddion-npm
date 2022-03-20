#!/usr/bin/env node

import { resolve } from 'path';
import { create } from 'create-create-app';

import { after } from './after';

const templateRoot = resolve(__dirname, '..', 'templates');

create('create-package', {
  templateRoot,
  after,
});
