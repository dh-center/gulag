const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const imageminMozjpeg = require('imagemin-mozjpeg');

const contentDataset = {
  ru: {
    periodsInfo: require('./src/content/ru/periodsInfo'),
    dict: require('./src/content/ru/dict')
  },
  en: {
    periodsInfo: require('./src/content/en/periodsInfo'),
    dict: require('./src/content/en/dict')
  }
};

const pages = [
  'index',
  'history-page',
  'periods-page',
  'victims-page'
];

function getPagesArray() {
  const result = [];

  pages.forEach(page => {
    Object.keys(contentDataset).forEach(lang => {

      const pageConfig = new HtmlWebpackPlugin({
        template: path.resolve(`./src/pages/${page}.twig`),
        filename: page === 'index'? path.resolve(`./dist/${lang}/index.html`): path.resolve(`./dist/${lang}/${page}/index.html`),
        templateParameters: {
          ...contentDataset[lang],
          lang
        }
      });

      result.push(pageConfig)
    });

    const pageConfig = new HtmlWebpackPlugin({
      template: path.resolve(`./src/pages/${page}.twig`),
      filename: page === 'index'? path.resolve(`./dist/index.html`): path.resolve(`./dist/${page}/index.html`),
      templateParameters: {
        ...contentDataset.ru,
        lang: 'ru'
      }
    });

    result.push(pageConfig)
  });

  return result;
}


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
    ...getPagesArray(),
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
      ]
    }),
    new CopyWebpackPlugin([
      {
        from: './src/fonts/',
        to: './fonts/',
        test: /\.(svg|woff|woff2|ttf|eot)$/
      }
    ])
  ]
};
