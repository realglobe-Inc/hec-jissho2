#!/usr/bin/env node
/**
 * Start webpack-dev-server.
 */
const co = require('co')
const webpack = require('webpack')
const DevServer = require('webpack-dev-server')
const config = require('../webpack.config.dev')

const PORT = 3000
const HOST = 'localhost'

co(function * () {
  const compiler = webpack(config)
  let server = new DevServer(compiler, {
    contentBase: 'public',
    hot: true,
    historyApiFallback: false,
    compress: false,
    staticOptions: {},

    // webpack-dev-middleware options
    quiet: false,
    noInfo: true,
    publicPath: '/',
    stats: { colors: true }
  })

  server.listen(PORT, HOST, function (err) {
    err ? console.error(err)
        : console.log(`webpack-dev-server listening at http://${HOST}:${PORT}`)
  })
})
