const { generateToken } = require('../../../helper')

const model = 'Camera'
const seed = [1, 2, 3].map((i) => ({
  id: i,
  name: `camera-${i}`,
  token: generateToken(),
  ownerId: i
}))

module.exports = {
  model, seed
}

if (!module.parent) {
  console.log(`[${model}Seed]`, JSON.stringify(seed, null, 2))
}
