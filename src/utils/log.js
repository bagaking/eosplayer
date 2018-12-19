const debug = require('debug');

module.exports = name => ({
  verbose: debug(`verbose:${name}`),
  info: debug(`info:${name}`),
  warning: debug(`warning:${name}`),
  error: debug(`error:${name}`)
})
debug.enable('info:*,warning:*,error:*')
