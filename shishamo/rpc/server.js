import { Server, ServerCredentials } from "@grpc/grpc-js";
import shishamo_grpc_pb from "washambi-rpc/shishamo/v1/shishamo_grpc_pb.js";
import * as domain from "./impl/domain.js";
import * as user from "./impl/user.js";

export function serve() {
  const server = new Server();

  server.addService(shishamo_grpc_pb.ShishamoService, {
    userCreate: user.userCreate,
    userGetOne: user.userGetOne,
    userChangePassword: user.userChangePassword,
    userPurge: user.userPurge,
    // userGetToken: user.userGetToken,
    userVerifyToken: user.userVerifyToken,

    domainCreate: domain.domainCreate,
    domainGetAll: domain.domainGetAll,
  });

  server.bindAsync(
    "0.0.0.0:50051", // todo: hardcoded
    ServerCredentials.createInsecure(), // todo: createSsl?
    () => {
      console.log("started grpc server...");
      server.start();
    }
  );
}
