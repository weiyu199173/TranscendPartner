module.exports = {
  root: true,
  extends: ['eslint:recommended'],
  env: {
    'react-native/react-native': true,
  },
  rules: {
    'react-native/no-inline-styles': 'off',
    'react-native/no-unused-styles': 'warn',
    'react-hooks/exhaustive-deps': 'warn',
  },
};
