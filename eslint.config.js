import pluginJs from "@eslint/js";

export default [
  pluginJs.configs.recommended,
  {
    "parser": "@babel/eslint-parser",
    "env": {
      "node": true,
      "es2021": true
    },
    "parserOptions": {
      "requireConfigFile": false,
      "ecmaVersion": 12,
      "sourceType": "module"
    },
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "warn"
    }
  }
];