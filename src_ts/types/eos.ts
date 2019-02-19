export interface IAuthorization {
    actor: string;
    permission: string;
}

export interface IEosClient {
    transaction(cb: Function): Promise<any>;

    getInfo(args: any): Promise<any>;

    __conf?: any;
}

export interface IIdentity {
    name: string,
    authority: string
}