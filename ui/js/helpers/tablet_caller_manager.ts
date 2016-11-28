import * as sugoCaller from 'sugo-caller'
import urls from './urls'
import { Caller } from '../interfaces/app'

const debug = require('debug')('hec:tablet_caller_manager')
const { SUGOS } = require('@self/server/lib/consts')
const {
  PUB_PHOTO_ACTOR
} = SUGOS

/**
 * PubPhoto server 用の actor に接続する
 * タブレットで見る画面用なので store を使わない
 */
export function connectPubPhotoCaller (cb: Function) {
  let key: string = PUB_PHOTO_ACTOR.KEY
  return sugoCaller(urls.pubPhotoCallers())
          .connect(key)
          .then((caller: Caller) => {
            debug(`Connected caller: ${key}`)
            initializePubPhoto(key, caller, cb)
          })
}

/**
 * pubPhoto caller
 */
function initializePubPhoto (key: string, caller: Caller, cb: Function) {
  let pubPhoto = caller.get(PUB_PHOTO_ACTOR.MODULE)
  pubPhoto.on(PUB_PHOTO_ACTOR.UPDATE_PHOTO_EVENT, (data) => {
    debug(data)
    cb(data)
  })
}