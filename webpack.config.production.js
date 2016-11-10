const { join } = require('path')
const { readdirSync } = require('fs')
const webpack = require('webpack')
const devConfig = require('./webpack.config.dev')
const CssConfig = devConfig[1]

const NODE_ENV = process.env.NODE_ENV || 'production'
const JS_ENTRY_PATH = 'ui/js/entries'

const JsConfig = () => {
  let entries = readdirSync(join(__dirname, JS_ENTRY_PATH))
    .map((file) => file.split('.')[0])

  return {
    entry: entries.reduce((obj, name) => {
      return Object.assign(obj, {
        [name]: [ join(__dirname, `ui/js/entries/${name}`) ]
      })
    }, {}),
    output: {
      path: join(__dirname, 'public/js'),
      filename: '[name].bundle.js',
      publicPath: '/js/'
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
      }),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.OccurenceOrderPlugin()
      // new webpack.optimize.UglifyJsPlugin({
      //   compress: {
      //     warnings: false
      //   }
      // })
    ],
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

module.exports = [
  JsConfig(),
  CssConfig
]
