module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ["eslint:recommended", "plugin:react/recommended"],
  globals: {
    Atomics: "readonly",
    React: true,
    ReactDOM: true,
    SharedArrayBuffer: "readonly",
    require: true,
    exports: true,
  },
  parserOptions: {
    ecmaVersion: 11,
    sourceType: "module",
  },
  rules: {
    "react/react-in-jsx-scope": "off",
  },
};
