const path = require('path');
const { makeWebpackConfig } = require('webpack-simple');

const config = makeWebpackConfig({
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.js',
    library: 'swipey',
    libraryTarget: 'umd',
  },
  mode: 'production',
  devtool: 'source-map',
});

module.exports = config;
