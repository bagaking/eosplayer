export function forMs (ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}
export async function forCondition (fnPredict, spanMs = 100) {
  while (true) {
    if (fnPredict()) return
    await forMs(spanMs)
  }
}

export async function TimeoutPromise (ms, promise) {
  let timeout = new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error(`Timed out in ${ms} ms.`))
    }, ms)
  })
  return Promise.race([
    promise,
    timeout
  ])
}
