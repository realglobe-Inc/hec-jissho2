const Model = require('./model')
const Sequelize = require('sequelize')

const User = Model('user', {
  /* User key */
  key: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  }
})

module.exports = User
