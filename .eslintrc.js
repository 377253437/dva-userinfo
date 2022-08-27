module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'prettier',
    'prettier/@typescript-eslint', // ts 项目需要增加此项配置
    'prettier/react',
    '@sc/eslint-config-sensorsdata-typescript/react',
    '@sc/eslint-config-sensorsdata-react',
  ],
  settings: {
    react: {
      version: '16.9',
    },
  },
  parserOptions: {
    project: ['./tsconfig.json'],
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    node: false,
    jest: true,
    es6: true,
  },
  plugins: ['markdown', 'jest', 'babel'],
  // https://github.com/typescript-eslint/typescript-eslint/issues/46#issuecomment-470486034
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-unused-vars': [2, { args: 'none' }],
      },
    },
  ],
  rules: {
    'prettier/prettier': 'error',
    'require-jsdoc': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    '@typescript-eslint/ban-ts-comment': 0,
  },
};
