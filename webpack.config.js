const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const pages = [
  'index',
  'history-page',
  'goda-page',
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
        filename: path.resolve(`./dist/${page}.html`)
      })
    }),
    new CopyWebpackPlugin([
      {
        from: './src/img/**/*',
        to: './img/[name].[ext]',
        test: /\.(png|jpg|gif|svg|woff|woff2|ttf|eot)$/
      }
    ])
  ]
};
