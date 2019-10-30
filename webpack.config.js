const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const imageminMozjpeg = require('imagemin-mozjpeg');
const periodsInfo = require('./src/content/periodsInfo');

const pages = [
  'index',
  'history-page',
  'periods-page',
  'victims-page'
];

module.exports = {
  entry: './src/main.js',
  module: {
    rules: [
      {
        test: /\.twig$/,
        loader: 'twig-loader'
      },
      {
        test: /\.s?css$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: false
            }
          },
          'sass-loader'
        ]
      }
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css?h=[hash]'
    }),
    ...pages.map(page => {
      return new HtmlWebpackPlugin({
        template: path.resolve(`./src/pages/${page}.twig`),
        filename: path.resolve(`./dist/${page}.html`),
        templateParameters: {
          periodsInfo
        }
      })
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),
    new CopyWebpackPlugin([
      {
        from: './src/img/**/*',
        to: './img/[name].[ext]',
        test: /\.(png|jpg|gif)$/
      }
    ]),
    new ImageminPlugin({
      test: /\.(png|jpg|gif)$/,
      plugins: [
        imageminMozjpeg({
          quality: 95,
          progressive: true
        })
      ]}),
    new CopyWebpackPlugin([
      {
        from: './src/fonts/',
        to: './fonts/',
        test: /\.(svg|woff|woff2|ttf|eot)$/
      }
    ])
  ]
};
