module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['nativewind/babel'],
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
