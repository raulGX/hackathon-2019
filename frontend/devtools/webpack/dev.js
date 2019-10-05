let merge = require('webpack-merge');
let common = require('./common.js');

const devConfig = merge(common, {
  devServer: {
    port: 3000,
    host: 'local.huddldev.com',
    disableHostCheck: true,
    historyApiFallback: true,
    hot: true
  },
  devtool: 'cheap-module-eval-source-map'
});

module.exports = devConfig;
