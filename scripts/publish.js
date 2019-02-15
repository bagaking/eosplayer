const fs = require('fs-extra')
const Path = require('path')
const { exec } = require('child_process')

const PACKAGE_PATH = Path.join(__dirname, '../package.json')
const pack = fs.readJsonSync(PACKAGE_PATH)
const v = pack.version
const numStr = v.match(/([0-9]+)$/g)

const newVersionNum = parseInt(numStr).toString().padStart(2, '0')

const run = cmd => {
  let bashExecutor = new Promise((resolve, reject) => {
    exec(cmd, (err, stdout, stderr) => {
      if (err) {
        reject(err)
        return
      }
      resolve([stdout, stderr])
    })
  })
  return bashExecutor
}

const execute = async () => {
  pack.version = v.replace(/([0-9]+)$/g, newVersionNum)
  fs.writeJsonSync(PACKAGE_PATH, pack, {
    spaces: 2
  })

  let cmds = [
    'git status',
    'npm run build',
    'git add -A .',
    `git commit -m "publish: version ${pack.version}"`,
    'npm publish'
  ]
  console.log('Publish new version :', newVersionNum)

  for (let i = 0; i < cmds.length; i++) {
      console.log(`==> Execute ${i}: ${cmds[i]}`)
    let ret = await run(cmds[i]).catch(err => console.log(` - !! ERROR !! ${cmds[i]} ${err}`))
    console.log(`
==> Result ${i}
 - INFO: ${ret[0]}
 - WARNING: ${ret[1]}
    `)
  }
}

execute()
