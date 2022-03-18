module.exports = {
  extends: [
    '@spotify/eslint-config-base',
    '@spotify/eslint-config-typescript',
    'prettier',
    'plugin:jest/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['import', 'prettier'],
  env: {
    jest: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  ignorePatterns: [
    '.eslintrc.js',
    '**/dist/**',
    'node_modules/',
    'coverage/',
  ],
  rules: {
    "prettier/prettier": "error",
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
            '**/*.spec.*',
            '**/*.stories.*',
            '**/src/setupTests.*',
          ],
        optionalDependencies: true,
        peerDependencies: true,
        bundledDependencies: true,
      },
    ],
  }
};
