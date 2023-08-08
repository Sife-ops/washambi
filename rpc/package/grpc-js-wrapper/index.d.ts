import { Client, Metadata, CallOptions, requestCallback, ClientUnaryCall } from "@grpc/grpc-js";

type AsyncCall<T, U> = (argument: T, metadata: Metadata | null, options: CallOptions | null, callback: requestCallback<U>) => ClientUnaryCall;
type PromiseCall<T, U> = (argument: T, metadata?: Metadata | null, options?: CallOptions | null) => Promise<U>;

type PromisifiedClient<C> = {
    [prop in keyof C]: C[prop] extends AsyncCall<infer T, infer U> ? PromiseCall<T, U> : any;
}

declare function promisifyClient<C extends Client>(client: C): PromisifiedClient<C>;

declare class ClientWrapper<C extends Client> {
    async: C;
    promise: PromisifiedClient<C>;
    constructor(client: C);
}


