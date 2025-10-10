module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended", // Ensures Prettier rules override ESLint formatting rules
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint", "prettier"],
  rules: {
    // Add custom ESLint rules here
    "react/react-in-jsx-scope": "off", // Not needed with React 17+ JSX transform
    "prettier/prettier": [
      "error",
      {
        singleQuote: true,
        semi: false,
      },
    ],
  },
  settings: {
    react: {
      version: "detect", // Automatically detect React version
    },
  },
};
