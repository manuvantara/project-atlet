module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['nativewind/babel'],
    env: {
      production: {
        plugins: ['transform-remove-console', 'react-native-paper/babel'],
      },
    },
    // plugins: [
    //   [
    //     'module-resolver',
    //     {
    //       root: ['./src'],
    //       extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
    //       alias: {
    //         '@app': './src',
    //       },
    //     },
    //   ],
    // ],
  };
};
