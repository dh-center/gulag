const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
require('dotenv').config();

const PUBLIC_PATH = process.env.PUBLIC_PATH || '';

const contentDataset = {
  ru: {
    periodsInfo: require('./src/content/ru/periodsInfo'),
    dict: require('./src/content/ru/dict'),
    history: require('./src/content/ru/history'),
    victims: require('./src/content/ru/victims'),
    deportations: require('./src/content/ru/deportations')
  },
  en: {
    periodsInfo: require('./src/content/en/periodsInfo'),
    dict: require('./src/content/en/dict'),
    history: require('./src/content/en/history'),
    victims: require('./src/content/en/victims'),
    deportations: require('./src/content/en/deportations')
  }
};

const pages = [
  'index',
  'history-page',
  'periods-page',
  'victims-page',
  'deportation-page'
];

function getPagesArray() {
  const result = [];

  pages.forEach(page => {
    Object.keys(contentDataset).forEach(lang => {

      const pageConfig = new HtmlWebpackPlugin({
        template: path.resolve(`./src/pages/${page}.twig`),
        filename: page === 'index' ? path.resolve(`./dist/${lang}/index.html`) : path.resolve(`./dist/${lang}/${page}/index.html`),
        templateParameters: {
          ...contentDataset[lang],
          lang,
          publicPath: PUBLIC_PATH
        }
      });

      result.push(pageConfig)
    });

    const pageConfig = new HtmlWebpackPlugin({
      template: path.resolve(`./src/pages/${page}.twig`),
      filename: page === 'index' ? path.resolve(`./dist/index.html`) : path.resolve(`./dist/${page}/index.html`),
      templateParameters: {
        ...contentDataset.ru,
        lang: 'ru',
        publicPath: PUBLIC_PATH
      }
    });

    result.push(pageConfig)
  });

  return result;
}


module.exports = (env, args) => {
  const plugins = [
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
        from: './src/img/',
        to: './img/',
        test: /\.(png|jpg|gif)$/
      }
    ]),
    new CopyWebpackPlugin([
      {
        from: './src/fonts/',
        to: './fonts/',
        test: /\.(svg|woff|woff2|ttf|eot)$/
      }
    ]),
    new CopyWebpackPlugin([
      {
        from: './src/favicons/',
        to: './favicons/',
        test: /\.(png|ico)$/
      }
    ]),
    new CopyWebpackPlugin([
      {
        from: './src/browserconfig.xml',
        to: './browserconfig.xml',
      }
    ]),
    new CopyWebpackPlugin([
      {
        from: './src/site.webmanifest',
        to: './site.webmanifest',
      }
    ])
  ];

  return {
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

    plugins
  };
};
