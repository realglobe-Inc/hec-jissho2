#!/usr/bin/env node
/**
 * 開発用プロキシサーバー
 * /jissho2/ へのアクセスをプロキシする
 */

const Koa = require('koa')
const proxy = require('koa-proxy')
const promisify = require('es6-promisify')
const { port } = require('@self/server/env')

let proxyServer = new Koa()

// Depends on @self/server/lib/consts
useProxy(proxyServer, /^\/jissho2\/rest\/cameras/, port.CAMERA)
useProxy(proxyServer, /^\/jissho2\/rest\/reports/, port.REPORT)
useProxy(proxyServer, /^\/jissho2/, port.UI)

// promisify listen
let listen = proxyServer.listen.bind(proxyServer)
proxyServer.listen = promisify(listen)

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
 * Cut URL: /jissho2/hoge -> /hoge
 */
function cut (path) {
  let shorten = path.replace(/^\/jissho2/, '') || '/'
  return shorten
}

module.exports = proxyServer
