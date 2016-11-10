const Model = require('./model')
const Sequelize = require('sequelize')
const User = require('./user_model')

const Camera = Model('camera', {
  /* Camera key */
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  /* Access token */
  token: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  }
})

Camera.belongsTo(User, { as: 'owner' })

module.exports = Camera
