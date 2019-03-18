const fs = require('fs-extra')
const Path = require('path')

const PACKAGE_PATH = Path.resolve(__dirname, '../package.json')
const pack = fs.readJsonSync(PACKAGE_PATH)

pack.files = undefined
fs.writeJSONSync(Path.resolve(__dirname, '../build/package.json'), pack, {
  spaces: 2
})
