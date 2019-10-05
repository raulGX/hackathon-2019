const webpack = require('webpack');
let merge = require('webpack-merge');
let common = require('./common.js');

const prodConfig = merge(common, {
  output: {
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].js'
  },
  plugins: [new webpack.HashedModuleIdsPlugin()]
});

module.exports = prodConfig;
