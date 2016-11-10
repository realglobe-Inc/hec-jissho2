const model = 'User'
const seed = [{
  id: 1,
  key: 'edac'
}, {
  id: 2,
  key: 'realglobe'
}, {
  id: 3,
  key: 'demo'
}]

module.exports = {
  model, seed
}

if (!module.parent) {
  console.log(`[${model}Seed]`, JSON.stringify(seed, null, 2))
}
