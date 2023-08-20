import shishamo_grpc_pb from "washambi-rpc/shishamo/v1/shishamo_grpc_pb.js";
import { ClientWrapper } from "node-grpc-wrapper";
import { credentials } from "@grpc/grpc-js";

class TestingClient {
    /** @type {import("node-grpc-wrapper").ClientWrapper<shishamo_grpc_pb.ShishamoClient>} */
    client;

    /** @returns {import("node-grpc-wrapper").ClientWrapper<shishamo_grpc_pb.ShishamoClient>} */
    get() {
        if (!this.client) {
            this.client = new ClientWrapper(
                new shishamo_grpc_pb.ShishamoClient(
                    "localhost:50051", // todo: hardcoded
                    credentials.createInsecure(),
                )
            )
        }
        return this.client
    }
}

export const testingClient = new TestingClient();

