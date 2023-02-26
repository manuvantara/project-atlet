module.exports = {
  extends: [
    '@react-native-community',
    'eslint-config-prettier',
    'eslint:recommended',
    // 'plugin:import/recommended',
    'universe/native',
  ],
  rules: {
    'react-native/no-inline-styles': 0,
    'react/react-in-jsx-scope': 0,
  },
};
