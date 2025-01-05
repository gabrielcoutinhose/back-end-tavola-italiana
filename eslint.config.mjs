// import pluginStandard from 'eslint-config-standard';
import globals from "globals";
import pluginJs from "@eslint/js";
import pluginPrettier from "eslint-plugin-prettier";
import configPrettier from "eslint-config-prettier";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: {
      // ecmaVersion: 12,
      // sourceType: 'module',
      globals: globals.node,
    },
    // env: {
    //   es2021: true,
    //   node: true,
    // },
  },
  // pluginStandard,
  pluginJs.configs.recommended, // Recommended JS Settings
  {
    plugins: {
      prettier: pluginPrettier, // Add the Prettier plugin
    },
    rules: {
      ...configPrettier.rules, // Disable conflicting rules between ESLint and Prettier
      "prettier/prettier": "error", // Flags Prettier formatting errors
    },
  },
];
