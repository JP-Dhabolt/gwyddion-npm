#!/usr/bin/env node

const fs = require('fs');

const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const overrideConfig = packageJson.overrideConfig || {};

fs.writeFileSync('./package.json', JSON.stringify({ ...packageJson, ...overrideConfig }, null, 2));
