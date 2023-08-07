import * as user from "./impl/user.js";
import shishamo_grpc_pb from "washambi-rpc/shishamo/v1/shishamo_grpc_pb.js";
import { Server, ServerCredentials } from "@grpc/grpc-js";

export function serve() {
    const server = new Server();

    server.addService(shishamo_grpc_pb.ShishamoService, {
        userCreate: user.userCreate,
        userGetOne: user.userGetOne,
        userChangePassword: user.userChangePassword,
    });

    server.bindAsync(
        "0.0.0.0:50051", // todo: hardcoded
        ServerCredentials.createInsecure(), // todo: createSsl?
        () => {
            console.log("starting grpc");
            server.start();
        }
    );
}

