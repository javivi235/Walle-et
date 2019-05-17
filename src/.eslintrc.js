module.exports = {
    root: true,
    env: {
      node: true
    },
    'extends': [
      'plugin:vue/essential',
      '@vue/standard',
      'google'
    ],
    rules: {
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'comma-dangle': [0],
      'semi': ["error", "never"],
      'max-len': ["error", { "code": 120 }],
      'guard-for-in': "off",
      'linebreak-style': "off"
    },
    parserOptions: {
      parser: 'babel-eslint'
    }
  }
  
  /// https://eslint.org/
  
