module.exports = {
  /*
    "env": [
      'eslint:recommended',
      'plugin:vue/essential',
      'plugin:vue/vue3-essential',
    ],

    "extends": [
        "eslint:recommended",
        "plugin:vue/essential"
    ],

    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },

    "parserOptions": {
        "parser": "@babel/eslint-parser",
        "ecmaVersion": 2018,
        "sourceType": "module"
    },

    "plugins": [
        "vue"
    ],

    "rules": {
        "no-console":"off"
    },
*/
    root: true,
    
    env: {
      node: true,
      browser: true,
      commonjs: true,
      es6: true,
    },
    extends:[
      "eslint:recommended",
      "plugin:vue/essential"
    ],
    plugins:[
      "vue",
      "plugin:vue/essential",
      'plugin:vue/vue3-essential',
    ],
    parserOptions: {
      parser: '@babel/eslint-parser',
      ecmaVersion: 2020,
      sourceType: 'module'
    },

    rules: {
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
    }
    
};
