#!/usr/bin/env node
/**
 * 開発用プロキシサーバー
 * /jissho2/ へのアクセスをプロキシする
 */

const Koa = require('koa')
const proxy = require('koa-proxy')
const { port } = require('@self/server/env')

// function app (name, port) {
//   let server = new Koa()
//   server.use(function * () {
//     this.body = `APP: ${name},URL: ${this.request.url}\n`
//   })
//   server.listen(port)
// }
//
// app('app1', 3001)
// app('app2', 3002)
// app('app3', 3003)

let proxyServer = new Koa()
useProxy(proxyServer, /^\/jissho2\/rest\/cameras/, port.CAMERA)
useProxy(proxyServer, /^\/jissho2\/rest\/reports/, port.REPORT)
useProxy(proxyServer, /^\/jissho2/, port.UI)
let listen = proxyServer.listen.bind(proxyServer)
proxyServer.listen = (port) => {
  return new Promise((resolve, reject) => {
    listen(port, (err) => {
      err ? reject(err) : resolve()
    })
  })
}

if (!module.parent) {
  proxyServer.listen(port.PROXY)
}

/**
 * Proxy to some port
 */
function useProxy (server, match, port) {
  server.use(proxy({
    host: `http://localhost:${port}`,
    match: match,
    map: cut
  }))
}

/**
 * /jissho2/hoge -> /hoge
 */
function cut (path) {
  let shorten = path.replace(/^\/jissho2/, '') || '/'
  return shorten
}

module.exports = proxyServer
