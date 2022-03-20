/* eslint-disable no-console */

import { resolve } from 'path';
import { AfterHookOptions } from 'create-create-app';

export function after({ run, packageDir }: AfterHookOptions): void {
  run('npm install', {
    cwd: resolve(packageDir, '..', '..'),
  });
  console.log(`Your package is available at ${packageDir}.  Happy coding!`);
}
