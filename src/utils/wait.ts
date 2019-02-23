export function forMs(ms: number) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}
export async function forCondition(fnPredict: () => boolean, spanMs: number = 100) {
  while (true) {
    if (fnPredict()) return;
    await forMs(spanMs);
  }
}

export async function TimeoutPromise<T>(ms: number, promise: Promise<T>) {
  const timeout = new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error(`Timed out in ${ms} ms.`));
    }, ms);
  });
  return Promise.race([
    promise,
    timeout,
  ]);
}
