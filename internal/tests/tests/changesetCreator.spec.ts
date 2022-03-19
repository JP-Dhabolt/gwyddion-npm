import { handleChangesets } from '../../../scripts/changesetCreator';

const mockChdir = jest.fn();
const mockExec = {
  getExecOutput: jest.fn(async () => '.changeset/dependabot-foo.md'),
  exec: jest.fn(),
};
const mockFs = {
  readFile: jest.fn(),
  writeFile: jest.fn(),
};

describe('changesetCreator', () => {
  const ORIGINAL_ENV = process.env;
  const ORIGINAL_CHDIR = process.chdir;
  const input = {
    context: {
      payload: {
        pull_request: {
          head: {
            sha: 'foo',
          },
          title: 'bump version',
        },
      },
    },
    exec: mockExec,
    fs: mockFs,
  };

  beforeEach(() => {
    process.env = { ...ORIGINAL_ENV };
    process.env.DEPENDENCY_TYPE = 'direct:production';
    mockChdir.mockClear();
    mockExec.exec.mockClear();
    mockExec.getExecOutput.mockClear();
    mockFs.readFile.mockClear();
    mockFs.writeFile.mockClear();
    process.chdir = mockChdir;
  });

  afterAll(() => {
    process.env = ORIGINAL_ENV;
    process.chdir = ORIGINAL_CHDIR;
  });

  it('should return "NO_CHANGES" if not prod dependency', async () => {
    process.env.DEPENDENCY_TYPE = 'direct:dev';
    const result = await handleChangesets(input);
    expect(result).toEqual('NO_CHANGES');
  });

  it('should change the working directory', async () => {
    await handleChangesets(input);
    expect(mockChdir).toHaveBeenCalledTimes(1);
    expect(mockChdir).toHaveBeenCalledWith('./prBranch');
  });

  it('should return "SKIPPED" if changeset already exists', async () => {
    const result = await handleChangesets(input);
    expect(result).toEqual('SKIPPED');
  });

  it('should return "NO_CHANGES" if no modified packages', async () => {
    mockExec.getExecOutput.mockImplementationOnce(async () => 'not-package');
    const result = await handleChangesets(input);
    expect(result).toEqual('NO_CHANGES');
  });

  it('should return "NO_CHANGES" if root package.json changed only', async () => {
    mockExec.getExecOutput.mockImplementationOnce(async () => 'package.json');
    const result = await handleChangesets(input);
    expect(result).toEqual('NO_CHANGES');
  });

  it('should return "NO_CHANGES" if changed package is private', async () => {
    mockExec.getExecOutput.mockImplementationOnce(async () => 'internal/foo/package.json');
    mockFs.readFile.mockImplementationOnce(async () => JSON.stringify({ private: true }));
    const result = await handleChangesets(input);
    expect(result).toEqual('NO_CHANGES');
  });

  it('should write a changeset it changed package is public', async () => {
    mockExec.getExecOutput.mockImplementationOnce(async () => 'packages/foo/package.json');
    mockFs.readFile.mockImplementationOnce(async () => JSON.stringify({ name: '@scope/foo' }));
    const result = await handleChangesets(input);
    expect(result).toEqual('CHANGES');
    expect(mockFs.writeFile).toHaveBeenCalledTimes(1);
    expect(mockFs.writeFile).toHaveBeenCalledWith(
      '.changeset/dependabot-foo.md',
      '---\n@scope/foo: patch\n---\n\nbump version\n',
    );
  });

  it('should should commit and push after changeset is created', async () => {
    mockExec.getExecOutput.mockImplementationOnce(async () => 'packages/foo/package.json');
    mockFs.readFile.mockImplementationOnce(async () => JSON.stringify({ name: '@scope/foo' }));
    await handleChangesets(input);
    expect(mockExec.exec).toHaveBeenCalledTimes(3);
    expect(mockExec.exec).toHaveBeenCalledWith('git', ['add', '.changeset/dependabot-foo.md']);
    expect(mockExec.exec).toHaveBeenCalledWith('git', ['commit', '-C', 'HEAD', '--amend', '--no-edit']);
    expect(mockExec.exec).toHaveBeenCalledWith('git', ['push', '--force']);
  });
});
