module.exports = {
  "extends": "airbnb",
  "parser": "babel-eslint",
  "plugins": ["react"],
  "rules": {
    "import/no-extraneous-dependencies": ["error", {"devDependencies": true}],
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "prop-types": [2],
    "prop-types": "off",
    "linebreak-style": "off",
    "one-var": 0,
    "no-unused-vars": ["off"],
    "no-multi-assign": ["off"],
    "global-require": ["off"],
    "one-var-declaration-per-line": 0,
    "no-underscore-dangle": ["off"],
    "no-undef": ["off"],
    "new-cap": 0,
    "no-console": 0,
    "func-names": 0,
    "max-len": [1, { "code": 150 }],
    "consistent-return": 0,
    "no-param-reassign": 0,
    "comma-dangle": 0,
    "curly": ["error", "multi-line"],
    "import/no-unresolved": "off",
    "import/extensions": "off",
    "no-shadow": ["error", { "allow": ["req", "res", "err"] }],
    "valid-jsdoc": ["error", {
      "requireReturn": true,
      "requireReturnType": true,
      "requireParamDescription": false,
      "requireReturnDescription": true
    }],
    "require-jsdoc": ["error", {
      "require": {
        "FunctionDeclaration": true,
        "MethodDefinition": true,
        "ClassDeclaration": true
      }
    }]
  }
};