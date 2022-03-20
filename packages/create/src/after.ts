/* eslint-disable no-console */

import fs from 'fs';
import { resolve } from 'path';
import { AfterHookOptions } from 'create-create-app';

type LogFunction = (m: string) => void;

function cleanupCrapThatCreateAppCliGeneratesWithoutAsking(
  { run, packageDir }: Pick<AfterHookOptions, 'run' | 'packageDir'>,
  log: LogFunction,
): void {
  log(`Removing ${resolve(packageDir, '.git')}`);
  fs.rmdirSync(resolve(packageDir, '.git'));
  log(`Removing ${resolve(packageDir, 'yarn.lock')}`);
  fs.unlinkSync(resolve(packageDir, 'yarn.lock'));
  log(`Removing ${resolve(packageDir, 'LICENSE')}`);
  fs.unlinkSync(resolve(packageDir, 'LICENSE'));

  run('npm install', {
    cwd: resolve(packageDir, '..', '..'),
  });
}

function standardAfterWork({ packageDir }: Pick<AfterHookOptions, 'packageDir'>, log: LogFunction): void {
  log(`Renaming ${resolve(packageDir, 'package.json.handlebars')} to ${resolve(packageDir, 'package.json')}`);
  fs.renameSync(resolve(packageDir, 'package.json.handlebars'), resolve(packageDir, 'package.json'));
}

export async function after({ run, packageDir, answers }: AfterHookOptions): Promise<void> {
  const debugLog = (message: string) => {
    if (answers.debug) {
      console.log(message);
    }
  };

  standardAfterWork({ packageDir }, debugLog);

  if (answers.isGwyddion) {
    cleanupCrapThatCreateAppCliGeneratesWithoutAsking({ run, packageDir }, debugLog);
  }

  console.log(`Your package is available at ${packageDir}.  Happy coding!`);
}
