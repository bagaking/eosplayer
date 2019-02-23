import { Debug } from '../types/libs';

export const createLogger = (name: string) => ({
  verbose: Debug(`verbose:${name}`),
  info: Debug(`info:${name}`),
  warning: Debug(`warning:${name}`),
  error: Debug(`error:${name}`),
});

const namespaces = Debug.disable();
if (namespaces === '') {
    Debug.enable('info:*,warning:*,error:*');
} else {
    Debug.enable(namespaces);
}
