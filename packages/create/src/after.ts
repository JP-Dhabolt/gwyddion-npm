import fs from 'fs';
import { resolve } from 'path';
import { AfterHookOptions } from 'create-create-app';

function cleanupCrapThatCreateAppCliGeneratesWithoutAsking({ packageDir }: Pick<AfterHookOptions, 'packageDir'>): void {
  fs.rmSync(resolve(packageDir, '.git'), {
    recursive: true,
    force: true,
  });
  try {
    fs.unlinkSync(resolve(packageDir, 'LICENSE'));
  } catch {
    // Ignore failure to remove LICENSE, which is not always generated.
  }
}

function standardAfterWork({ packageDir }: Pick<AfterHookOptions, 'packageDir'>): void {
  fs.renameSync(resolve(packageDir, 'package.json.handlebars'), resolve(packageDir, 'package.json'));
  fs.renameSync(resolve(packageDir, '.npmignore.template'), resolve(packageDir, '.npmignore'));
}

export async function after({ packageDir, answers }: AfterHookOptions): Promise<void> {
  standardAfterWork({ packageDir });

  if (answers.isGwyddion) {
    cleanupCrapThatCreateAppCliGeneratesWithoutAsking({ packageDir });
  }
}
