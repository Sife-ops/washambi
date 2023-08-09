import shishamo_grpc_pb from "washambi-rpc/shishamo/v1/shishamo_grpc_pb.js";
import { ClientWrapper } from "grpc-js-wrapper";
import { credentials } from "@grpc/grpc-js";

/** @type {ClientWrapper<shishamo_grpc_pb.ShishamoClient>} */
export const client = new ClientWrapper(
    new shishamo_grpc_pb.ShishamoClient(
        "localhost:50051", // todo: hardcoded
        credentials.createInsecure(),
    )
);

