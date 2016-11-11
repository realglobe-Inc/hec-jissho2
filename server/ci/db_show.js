#!/usr/bin/env node
/**
 * Show Datebase
 */
process.env.DEBUG = 'hec:db'
const db = require('@self/db')

db.show()
