const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const merge = require('webpack-merge');
const common = require('./common.js');

const analyzeConfig = merge(common, {
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerPort: 8889
    })
  ]
});

module.exports = analyzeConfig;
