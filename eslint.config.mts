import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import tsParser from "@typescript-eslint/parser";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {},

      globals: {
        ...globals.node,
      },
    },
    rules: {
      // 🚫 Warn when using console.log, allow console.warn/error
      "no-console": ["warn", { allow: ["warn", "error"] }],

      // Example: enforce semi-colons
      semi: ["error", "always"],

      // Example: enforce single quotes
      // quotes: ["error", "single"],

      "no-unused-vars": ["warn"],
    },
    ignores: ["dist/", "node_modules/"],
  },

  tseslint.configs.recommended,
]);

// module.exports = {
//   root: true,
//   parser: "@typescript-eslint/parser",
//   parserOptions: {
//     ecmaVersion: 2020,
//     sourceType: "module",
//     project: "./tsconfig.json",
//     tsconfigRootDir: __dirname,
//   },
//   env: {
//     node: true,
//     es2021: true,
//   },
//   plugins: ["@typescript-eslint", "node"],
//   extends: [
//     "eslint:recommended",
//     "plugin:@typescript-eslint/recommended",
//     "plugin:node/recommended",
//     "prettier",
//   ],
//   rules: {
//     // Customize rules here
//     "@typescript-eslint/no-explicit-any": "warn",
//     "no-console": "off",
//     "node/no-unsupported-features/es-syntax": ["error", { ignores: ["modules"] }],
//   },
// };
