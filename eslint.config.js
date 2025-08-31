import typescriptEslint from "typescript-eslint";
import reactRefresh from "eslint-plugin-react-refresh";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import eslintConfigPrettier from "eslint-config-prettier";
import globals from "globals";
import js from "@eslint/js";
import storybook from "eslint-plugin-storybook";

export default typescriptEslint.config(
  js.configs.recommended,
  ...typescriptEslint.configs.recommended,
  react.configs.flat.recommended,
  react.configs.flat["jsx-runtime"],
  eslintConfigPrettier,
  ...storybook.configs["flat/recommended"],
  {
    ignores: ["dist/**", "public/**", "lib/**", "node_modules/**"],
  },
  {
    plugins: {
      "react-refresh": reactRefresh,
      "react-hooks": reactHooks,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      "react-hooks/exhaustive-deps": "off",
      "@typescript-eslint/no-redeclare": "off",
      "no-labels": "off",
      "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
      "@typescript-eslint/no-explicit-any": "warn",
      "react/prop-types": "off",
    },
  },
  {
    files: ["**/*.stories.*", "**/*.spec.*", "**/*.test.*"],
    rules: {
      "import/no-anonymous-default-export": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-non-null-asserted-optional-chain": "off",
      "@typescript-eslint/no-unnecessary-type-constraint": "off",
    },
  },
);
