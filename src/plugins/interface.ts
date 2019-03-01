export type FnSignPluginSignKey = (accountName: string) => string;
export type FnSignPluginValidate = (accountName: string, recoverKey: string) => boolean;
export interface ISignPlugin {
    signkeyPlugin(): { [perm: string]: FnSignPluginSignKey };
    validateSignPlugin(): { [perm: string]: FnSignPluginValidate };
}