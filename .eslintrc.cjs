/* eslint-env node */

module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    // Gebruik alleen TypeScript-variant voor unused vars
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^React$',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
    // Toestaan van `any` waar nodig
    '@typescript-eslint/no-explicit-any': 'off',
    // Interfaces die enkel platformtypes doorgeven zijn toegestaan
    '@typescript-eslint/no-empty-object-type': 'off',
  },
};

