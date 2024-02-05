module.exports = {
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": [
    "standard-with-typescript",
    "plugin:react/recommended"
  ],
  "overrides": [
    {
      "env": {
        "node": true
      },
      "files": [
        ".eslintrc.{js,cjs}"
      ],
      "parserOptions": {
        "sourceType": "script"
      }
    }
  ],
  "parser": '@typescript-eslint/parser',
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": [
    "react"
  ],
  "rules": {
    "react/jsx-uses-react": 2,
    "react/jsx-uses-vars": 2,
    "react/react-in-jsx-scope": 2,
    "react/jsx-quotes": 0,
    "block-scoped-var": 0,
    "padded-blocks": 0,
    "quotes": [ 1, "single" ],
    "comma-style": [ 2, "last" ],
    "eol-last": 0,
    "no-unused-vars": 0,
    "no-console": 0,
    "func-names": 0,
    "prefer-const": 0,
    "comma-dangle": 0,
    "spaced-comment": 0,
    "dot-notation": 0,
    "id-length": 0,
    "no-undef": 0,
    "no-var": 0,
    "new-cap": 0,
    "indent": [2, 2, {"SwitchCase": 1}]
  },
  ignorePatterns: ['.eslintrc.js']
}
