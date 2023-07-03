module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  parserOption: {
    ecmaVersion: "lastest",
  },
  extends: [
    "eslint:recommended",
    "airbnb-base",
    "prettier",
    "plugin:prettier/recommended",
  ],
  rules: {
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
    "no-console": "off",
  },
};
