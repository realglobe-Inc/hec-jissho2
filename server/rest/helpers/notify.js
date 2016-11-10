/**
 * @function notify
 */
'use strict'

function notify (message) {
  if (process.send) {
    process.send(message)
  }
  process.emit('notify', message)
}

module.exports = notify
