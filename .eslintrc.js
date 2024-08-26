module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    // Your custom rules here
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"], // Apply to TypeScript files only
      rules: {
        // TypeScript-specific rules
      },
    },
    {
      files: ["frontend/**/*.{js,jsx,ts,tsx}"],
      env: {
        browser: true,
      },
      rules: {
        // Frontend-specific rules
      },
    },
    {
      files: ["backend/**/*.ts"],
      env: {
        node: true,
      },
      rules: {
        // Backend-specific rules
      },
    },
  ],
};
