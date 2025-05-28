import js from '@eslint/js';
import globals from 'globals';
import typescriptParser from '@typescript-eslint/parser';
import typescript from '@typescript-eslint/eslint-plugin';
import svelte from 'eslint-plugin-svelte';
import svelteParser from 'svelte-eslint-parser';
import vue from 'eslint-plugin-vue';
import vueParser from 'vue-eslint-parser';
import prettier from 'eslint-plugin-prettier';

export default [
  // Global ignores
  {
    ignores: [
      '**/*.json',
      'src/style/**',
      'src/assets/**',
      'src/vite-env.d.ts',
      '**/dist/**',
      '**/dev-dist/**',
      '**/node_modules/**',
      '**/build/**',
      '**/cache/**',
    ],
  },

  // Base JavaScript configuration
  {
    files: ['**/*.js', '**/*.mjs'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
      },
    },
    plugins: {
      prettier,
    },
    rules: {
      ...js.configs.recommended.rules,
      indent: ['error', 2, { SwitchCase: 1 }],
      'no-console': 'off',
      'no-debugger': 'off',
      'no-sequences': 'off',
      'prettier/prettier': 'error',
    },
  },

  // TypeScript configuration
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
      },
    },
    plugins: {
      '@typescript-eslint': typescript,
      prettier,
    },
    rules: {
      indent: ['error', 2, { SwitchCase: 1 }],
      'no-console': 'off',
      'no-debugger': 'off',
      'no-sequences': 'off',
      '@typescript-eslint/strict-boolean-expressions': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/ban-types': 'off',
      '@typescript-eslint/consistent-type-definitions': 'off',
      'prettier/prettier': 'error',
    },
  },

  // Svelte files
  {
    files: ['**/*.svelte'],
    languageOptions: {
      parser: svelteParser,
      parserOptions: {
        parser: typescriptParser,
        extraFileExtensions: ['.svelte'],
      },
    },
    plugins: {
      svelte,
      '@typescript-eslint': typescript,
      prettier,
    },
    rules: {
      'svelte/valid-compile': 'off',
      '@typescript-eslint/unbound-method': 'off',
      'prettier/prettier': 'error',
    },
  },

  // Vue files
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: typescriptParser,
        extraFileExtensions: ['.vue'],
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      vue,
      '@typescript-eslint': typescript,
      prettier,
    },
    rules: {
      'vue/multi-word-component-names': 'off',
      'prettier/prettier': 'error',
    },
  },

  // Model files (服务模型文件，pnpm命令抛错，先关闭)
  {
    files: ['**/*.model.ts'],
    rules: {
      indent: 'off',
      'prettier/prettier': 'error',
    },
  },

  // ESLint config files
  {
    files: ['.eslintrc.{js,cjs}', 'eslint.config.js'],
    languageOptions: {
      globals: {
        process: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        module: 'readonly',
        require: 'readonly',
      },
      parserOptions: {
        sourceType: 'script',
      },
    },
  },

  // Prettier config - integrated into individual rule sets above
];
