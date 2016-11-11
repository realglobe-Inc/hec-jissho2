const Sequelize = require('sequelize')
const { DATABASE, ROOT_USER, ROOT_PASSWORD, PORT, HOST, PROTOCOL } = require('@self/env').database
const debug = require('debug')('hec:db')

/**
 * Make Model
 */
function Model (name, attributes) {
  let sequelize = new Sequelize(DATABASE, ROOT_USER, ROOT_PASSWORD, {
    host: HOST,
    port: PORT,
    protocol: PROTOCOL,
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      idle: 100
    },
    logging: (data) => debug(data)
  })

  let model = sequelize.define(name, attributes, {
    freezeTableName: true
  })

  return model
}

module.exports = Model
