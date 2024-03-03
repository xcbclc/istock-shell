module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'standard-with-typescript',
    'plugin:svelte/recommended',
    'plugin:prettier/recommended',
    'plugin:svelte/prettier',
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
    {
      files: ['*.svelte'],
      parser: 'svelte-eslint-parser',
      // Parse the `<script>` in `.svelte` as TypeScript by adding the following configuration.
      parserOptions: {
        parser: '@typescript-eslint/parser',
      },
      rules: {
        'svelte/valid-compile': 'off',
      },
    },
    {
      files: ['**/*.model.ts'], // 服务模型文件，pnpm命令抛错，先关闭
      rules: {
        indent: 'off',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
    extraFileExtensions: ['.svelte'],
  },
  rules: {
    // 解决ESLint和Prettier的switch/case缩进冲突
    indent: ['error', 2, { SwitchCase: 1 }],
    // vite打包时去除console和debugger
    'no-console': 'off',
    'no-debugger': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/consistent-type-definitions': 'off',
  },
};
