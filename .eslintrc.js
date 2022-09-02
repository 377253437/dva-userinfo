module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: [
    'prettier',
    'prettier/@typescript-eslint', // ts 项目需要增加此项配置
    'prettier/react',
    '@sc/eslint-config-sensorsdata-react', '@sc/eslint-config-sensorsdata-typescript/react'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2020,
    sourceType: 'module',
    project: ['./tsconfig.json']
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'react-hooks'
  ],
  rules: {
    'require-jsdoc': 'off',
    'react/require-default-props': 'off',
    'react-hooks/exhaustive-deps': 'warn'
  },
  overrides: [{
    files: ['*.ts', '*.tsx']
  }]
};
