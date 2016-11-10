const { readdirSync } = require('fs')
const { join } = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const autoprefixer = require('autoprefixer')

const HOST = 'localhost'
const PORT = 3000
const JS_ENTRY_PATH = 'ui/js/entries'
const CSS_ENTRY_PATH = 'ui/scss'

const JsConfig = () => {
  let entries = readdirSync(join(__dirname, JS_ENTRY_PATH))
    .map((file) => file.split('.')[0])

  return {
    entry: entries.reduce((obj, name) => {
      return Object.assign(obj, {
        [name]: [
          `webpack-dev-server/client?http://${HOST}:${PORT}/`,
          'webpack/hot/dev-server',
          join(__dirname, JS_ENTRY_PATH, name)
        ]
      })
    }, {}),
    output: {
      path: join(__dirname, 'public/js'),
      filename: '[name].bundle.js',
      publicPath: '/js/'
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('development')
      }),
      new webpack.HotModuleReplacementPlugin()
    ],
    devtool: 'source-map',
    module: {
      loaders: [
        {
          test: /\.ts(x?)$/,
          loader: 'ts-loader',
          exclude: /node_modules/
        },
        {
          test: /\.json$/,
          loader: 'json-loader'
        }
      ],
      preLoaders: [
        {
          test: /\.js$/,
          loader: 'source-map-loader'
        }
      ]
    },
    resolve: {
      extensions: [ '', '.js', '.jsx', '.ts', '.tsx', '.json' ]
    },
    externals: {
      'react': 'React',
      'react-dom': 'ReactDOM'
    }
  }
}

const CssConfig = () => {
  let entries = readdirSync(join(__dirname, CSS_ENTRY_PATH))
    .map((file) => file.split('.')[0])

  return {
    entry: entries.reduce((obj, name) => {
      return Object.assign(obj, {
        [name]: join(__dirname, `ui/scss/${name}.scss`)
      })
    }, {}),
    output: {
      path: join(__dirname, 'public/css'),
      filename: '[name].css',
      publicPath: '/css/'
    },
    module: {
      loaders: [
        {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract('style-loader', [ 'css-loader', 'postcss-loader', 'sass-loader' ])
        }
      ]
    },
    sassLoader: {
      // importer: jsonImporter
    },
    postcss () {
      return [ autoprefixer ]
    },
    plugins: [
      new ExtractTextPlugin('[name].css')
    ]
  }
}

module.exports = [
  JsConfig(),
  CssConfig()
]
