export interface ISignPlugin {
    signkeyPlugin(): { [perm: string]: ((accountName: string) => string) };
    validateSignPlugin(): { [perm: string]: ((accountName: string, recoverKey: string) => boolean) };
}