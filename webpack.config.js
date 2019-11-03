const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ProvidePlugin = require('webpack').ProvidePlugin;
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  entry: {
    'assets/engine.js': [
      './src/js/main.js'
    ],
    'assets/style.css': [
      './src/css/style.css',
      'perfect-scrollbar/dist/css/perfect-scrollbar.css'
    ]
  },
  output: {
    filename: '[name]',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new CleanWebpackPlugin(),
    new ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      PIXI: 'pixi.js'
    }),
    new CopyPlugin([
      { from: './src/assets', to: 'assets' },
      { from: './src/robots.txt', to: 'robots.txt' },
    ]),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/html/index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      },
      hash: true,
      inject: 'head'
    }),
    new ExtractTextPlugin("assets/style.css"),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: {
            loader: 'css-loader',
            options: {
              url: false
            }
          },
          fallback: 'style-loader'
        })
      },
    ],
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          mangle: true,
          comments: false
        },
      }),
      new OptimizeCssAssetsPlugin({
        cssProcessorOptions: {
          zindex: false,
        },
      })
    ],
  }
}
