import ChainHelper from '../helpers/chain';

export type GetSignKeyDelegate = (accountName: string, chain: ChainHelper) => Promise<string>;
export type ValidateDelegate = (accountName: string, recoverKey: string, chain: ChainHelper) => Promise<boolean>;

export interface ISignPlugin {
    signKeyProvider: { [perm: string]: GetSignKeyDelegate };
    validatorProvider: { [perm: string]: ValidateDelegate };
}