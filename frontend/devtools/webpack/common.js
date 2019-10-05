require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const formatter = require('eslint-formatter-pretty');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const uuid = require('uuid');

const { env } = process;

const options = {
  mode: env.NODE_ENV,
  entry: ['./src/index.js'],
  output: {
    filename: '[name].js',
    publicPath: '/',
    chunkFilename: '[name].js'
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: 'vendor',
          chunks: 'all'
        }
      }
    }
  },
  resolve: {
    modules: ['src', 'node_modules'],
    alias: {
      components: 'common/components',
      containers: 'common/containers',
      utils: 'common/utils'
    }
  },
  module: {
    rules: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        options: {
          formatter,
          emitWarning: false // build doesn't fail on eslint warnings (but does on eslint errors)
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'babel-loader'
          },
          {
            loader: 'react-svg-loader',
            options: {
              jsx: true, // true outputs JSX tags
              svgo: {
                plugins: [
                  {
                    cleanupIDs: {
                      prefix: {
                        toString() {
                          return uuid();
                        }
                      }
                    }
                  }
                ]
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html',
      favicon: './src/assets/icons/favicon.ico'
    }),
    new Dotenv({
      systemvars: true
    }),
    new MomentLocalesPlugin({
      localesToKeep: [] // (“en” is built into Moment and can’t be removed)
    }),
    new CleanWebpackPlugin()
  ],
  devServer: {
    stats: {
      moduleTrace: false // hide the annoying stack trace for eslint errors
    }
  }
};

module.exports = options;
