import tsParser from "@typescript-eslint/parser";

export default [
  {
    ignores: [
      ".next/**", 
      "node_modules/**", 
      "out/**", 
      "build/**"
    ],
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: { 
          jsx: true
        },
      },
    },
    rules: {
      "prefer-const": "warn",
      "no-unused-vars": "warn"
    }
  }
];