/* eslint-disable no-console */

import fs from 'fs';
import { resolve } from 'path';
import { AfterHookOptions } from 'create-create-app';

function cleanupCrapThatCreateAppCliGeneratesWithoutAsking({
  run,
  packageDir,
}: Pick<AfterHookOptions, 'run' | 'packageDir'>): void {
  fs.rmSync(resolve(packageDir, '.git'), {
    recursive: true,
    force: true,
  });
  fs.unlinkSync(resolve(packageDir, 'LICENSE'));

  run('npm install', {
    cwd: resolve(packageDir, '..', '..'),
  });
}

function standardAfterWork({ packageDir }: Pick<AfterHookOptions, 'packageDir'>): void {
  fs.renameSync(resolve(packageDir, 'package.json.handlebars'), resolve(packageDir, 'package.json'));
}

export async function after({ run, packageDir, answers }: AfterHookOptions): Promise<void> {
  standardAfterWork({ packageDir });

  if (answers.isGwyddion) {
    cleanupCrapThatCreateAppCliGeneratesWithoutAsking({ run, packageDir });
  }

  console.log(`Your package is available at ${packageDir}.  Happy coding?`);
}
