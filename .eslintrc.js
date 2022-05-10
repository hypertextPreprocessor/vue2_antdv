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
      "plugin:vue/essential",
      'plugin:vue/vue3-essential',
    ],
    plugins:[
      "vue",
      "@babel"
    ],
    //parser: "@babel/eslint-parser",
    parserOptions: {
      parser: '@babel/eslint-parser',
      ecmaVersion: 2020,
      sourceType: 'module'
    },
    
    rules: {
      "vue/no-v-model-argument": "off",
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
    }
    
};
