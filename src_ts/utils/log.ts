import debug from 'debug'

export const createLogger = (name : string) => ({
  verbose: debug(`verbose:${name}`),
  info: debug(`info:${name}`),
  warning: debug(`warning:${name}`),
  error: debug(`error:${name}`)
})

const namespaces = debug.disable()
if (namespaces === '') {
  debug.enable('info:*,warning:*,error:*')
} else {
  debug.enable(namespaces)
}
