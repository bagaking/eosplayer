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

export class TimeoutError extends Error {

    public name: string;

    constructor(public readonly message: string, public readonly ms?: number) {
        super(message);
        this.name = 'TimeoutError';
    }
}

export async function timeoutPromise<T>(ms: number, promiseLike: Promise<T>, onCancel?: (...args: any[]) => any[]) {
    let timeOut: NodeJS.Timeout;
    const tPromise = new Promise((resolve, reject) => {
        timeOut = setTimeout(() => {
            if (onCancel) {
                onCancel(ms);
            }
            reject(new TimeoutError(`Timed out in ${ms} ms.`, ms));
        }, ms);
    });
    return Promise.race([
        Promise.resolve(promiseLike),
        tPromise,
    ]).then((v) => {
        clearTimeout(timeOut);
        return v;
    }, (err) => {
        clearTimeout(timeOut);
        throw err;
    });
}