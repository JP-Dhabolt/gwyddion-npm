/* eslint-disable no-console */

import { resolve } from 'path';
import { AfterHookOptions } from 'create-create-app';

function cleanupCrapThatCreateAppCliGeneratesWithoutAsking({
  run,
  packageDir,
}: Pick<AfterHookOptions, 'run' | 'packageDir'>): void {
  run('npm install', {
    cwd: resolve(packageDir, '..', '..'),
  });

  run('rm -rf .git/', {
    cwd: packageDir,
  });

  run('rm yarn.lock', {
    cwd: packageDir,
  });
}

export function after({ run, packageDir, answers }: AfterHookOptions): void {
  if (answers.isGwyddion) {
    cleanupCrapThatCreateAppCliGeneratesWithoutAsking({ run, packageDir });
  }
  console.log(`Your package is available at ${packageDir}.  Happy coding!`);
}
