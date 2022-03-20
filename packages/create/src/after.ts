/* eslint-disable no-console */

import fs from 'fs';
import { resolve } from 'path';
import { AfterHookOptions } from 'create-create-app';

function cleanupCrapThatCreateAppCliGeneratesWithoutAsking({
  run,
  packageDir,
}: Pick<AfterHookOptions, 'run' | 'packageDir'>): void {
  run('npm install', {
    cwd: resolve(packageDir, '..', '..'),
  });

  fs.rmdirSync(resolve(packageDir, '.git'));
  fs.unlinkSync(resolve(packageDir, 'yarn.lock'));
}

export async function after({ run, packageDir, answers }: AfterHookOptions): Promise<void> {
  if (answers.isGwyddion) {
    cleanupCrapThatCreateAppCliGeneratesWithoutAsking({ run, packageDir });
  }

  fs.renameSync(resolve(packageDir, 'package.json.handlebars'), resolve(packageDir, 'package.json'));
  console.log(`Your package is available at ${packageDir}.  Happy coding!`);
}
