import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier/flat';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: { globals: globals.node },
  },
  tseslint.configs.recommended,
  eslintConfigPrettier,
  globalIgnores(['dist/*', 'node_modules/*', '.vscode/*']),
  {
    rules: {
      // 'no-console': 'warn',
      'array-callback-return': 'warn',
      'for-direction': 'error',
      'no-await-in-loop': 'warn',
      'no-class-assign': 'error',
      'no-compare-neg-zero': 'error',
      'no-cond-assign': 'error',
      'no-const-assign': 'error',
      'no-constant-binary-expression': 'error',
      'no-constant-condition': 'warn',
      'no-constructor-return': 'error',
      'no-dupe-else-if': 'warn',
      'no-dupe-keys': 'warn',
      'no-duplicate-case': 'warn',
      'no-duplicate-imports': 'error',
      'valid-typeof': 'error',
      'arrow-body-style': ['warn', 'as-needed'],
      eqeqeq: 'warn',
      'dot-notation': 'warn',
      'logical-assignment-operators': ['warn', 'always'],
    },
  },
]);
