import shishamo_grpc_pb from "washambi-rpc/shishamo/v1/shishamo_grpc_pb.js";
import { ClientWrapper } from "grpc-js-wrapper";

declare class TestingClient<C> {
    client: C;
    get(): C;
}

export declare const testingClient: TestingClient<ClientWrapper<shishamo_grpc_pb.ShishamoClient>>;
