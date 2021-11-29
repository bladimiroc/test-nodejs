module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: [
    "airbnb-base",
    "eslint:recommended",
  ],
  parserOptions: {
    ecmaVersion: 13,
  },
  rules: {
    semi: ["error", "always"],
    quotes: ["error", "double"],
  },
};
