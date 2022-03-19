#!/usr/bin/env node
/* eslint-disable no-console */

const fs = require('fs');

const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

function getPublishConfig(packageData, key) {
  const publishConfig = packageData.publishConfig || {};
  return publishConfig[key] || packageData[key];
}

const main = getPublishConfig(packageJson, 'main');
const types = getPublishConfig(packageJson, 'types');

packageJson.main = main;
packageJson.types = types;

fs.writeFileSync('./package.json', JSON.stringify(packageJson, null, 2));
