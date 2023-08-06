import "./cli.js";

import * as rpc_user from "../rpc/user.js";
import shishamo_grpc_pb from "washambi-rpc/shishamo/v1/shishamo_grpc_pb.js";
import { Server, ServerCredentials } from "@grpc/grpc-js";

async function main() {
    console.log("starting shishamo");

    const server = new Server();
    server.addService(shishamo_grpc_pb.ShishamoService, {
        userCreate: rpc_user.userCreate,
        userGetOne: rpc_user.userGetOne,
        userChangePassword: rpc_user.userChangePassword,
    });
    server.bindAsync(
        "0.0.0.0:50051",
        ServerCredentials.createInsecure(), // todo: createSsl?
        () => {
            console.log("starting grpc");
            server.start();
        }
    );
}

main();
