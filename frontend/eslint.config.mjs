// import fsd from '@conarti/eslint-plugin-feature-sliced';
import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
/* Plugins import */
import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';
import eslintPluginReactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default [
  /* Built-in config */
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: {
        browser: true,
      },
    },
    rules: {
      /* no-restricted-imports rules */
      'no-restricted-imports': [
        'error',
        {
          paths: [
            // TODO: make restrict messages for Redux
            {
              name: '@/shared/lib/server',
              message: "Don't use server modules in client code",
            },
            {
              name: 'react-router-dom',
              importNames: ['useParams'],
              message:
                'Use `import { useTypedParams } from @/shared/lib/router` instead.',
            },
          ],
        },
      ],
    },
  },

  /* Plugins config */
  {
    plugins: {
      react: eslintPluginReact,
      'react-hooks': eslintPluginReactHooks,
      'react-refresh': eslintPluginReactRefresh,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      /* react-hooks rules */
      ...eslintPluginReactHooks.configs.recommended.rules,
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      /* react-refresh rules */
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },

  /* Feature-Sliced Design config */
  // {
  //   plugins: {
  //     '@conarti/feature-sliced': fsd,
  //   },
  //   settings: {
  //     '@conarti/feature-sliced': {
  //       allowTypeImports: true,
  //     },
  //   },
  //   rules: {
  //     '@conarti/feature-sliced/layers-slices': 'error',
  //     '@conarti/feature-sliced/absolute-relative': 'error',
  //     '@conarti/feature-sliced/public-api': 'error',
  //   },
  // },

  /* CJS Support */
  {
    files: ['**/*.cjs'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'commonjs',
    },
  },

  /* Overriding configs (overrides all previous rules) */
  eslintConfigPrettier,
  {
    ignores: ['dist/', 'node_modules/'],
  },
];
