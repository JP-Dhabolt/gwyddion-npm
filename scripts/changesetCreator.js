/* eslint-disable no-console */
const SKIPPED = 'SKIPPED';
const NO_CHANGES = 'NO_CHANGES';
const CHANGES = 'CHANGES';
const PR_BRANCH = 'prBranch';
const PROD_DEPENDENCY = 'direct:production';
const CHANGESET_DIR = '.changeset';

async function getPackageFilesWithChangedDependencies(diffFiles, fs) {
  const packageFiles = diffFiles.filter(f => f !== 'package.json').filter(f => f.includes('package.json'));
  const changedPackages = [];

  for (const file of packageFiles) {
    const prPackage = JSON.parse(await fs.readFile(file, 'utf8'));

    if (!prPackage.private) {
      changedPackages.push(prPackage.name);
    }
  }

  return changedPackages;
}

async function createChangeset(fs, packages, context, changesetFile) {
  const { title: message } = context.payload.pull_request;
  const packageFrontMatter = packages.map(p => `${p}: patch`).join('\n');
  const fileContents = `---\n${packageFrontMatter}\n---\n\n${message}\n`;
  await fs.writeFile(changesetFile, fileContents);
}

async function getChangedFiles(exec) {
  const diffOutput = await exec.getExecOutput('git diff --name-only HEAD~1');
  const diffFiles = diffOutput.split('\n');
  return diffFiles;
}

async function commitAndPushChanges(exec, changesetFile) {
  await exec.exec('git', ['add', changesetFile]);
  await exec.exec('git', ['commit', '-C', 'HEAD', '--amend', '--no-edit']);
  await exec.exec('git', ['push', '--force']);
}

async function handleChangesets({ context, exec, fs }) {
  const { DEPENDENCY_TYPE } = process.env;

  if (DEPENDENCY_TYPE !== PROD_DEPENDENCY) {
    console.log('Non-production dependencies, skipping changeset creation');
    return NO_CHANGES;
  }

  process.chdir(`./${PR_BRANCH}`);

  const { sha } = context.payload.pull_request.head;
  const changesetFile = `${CHANGESET_DIR}/dependabot-${sha}.md`;

  const diffFiles = await getChangedFiles(exec);
  if (diffFiles.find(f => f === changesetFile)) {
    console.log('Changeset already created, skipping');
    return SKIPPED;
  }

  const changedPackages = await getPackageFilesWithChangedDependencies(diffFiles, fs);
  if (changedPackages.length === 0) {
    console.log('No packages with modified dependencies');
    return NO_CHANGES;
  }

  await createChangeset(fs, changedPackages, context, changesetFile);
  await commitAndPushChanges(exec, changesetFile);
  return CHANGES;
}

module.exports = { handleChangesets };
