export function forMs (time) {
  return new Promise(resolve => {
    setTimeout(resolve, time)
  })
}
export async function forCondition (fnPredict, spanMs = 100) {
  while (true) {
    if (fnPredict()) return
    await forMs(spanMs)
  }
}