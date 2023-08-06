import shishamo_grpc_pb from "washambi-rpc/shishamo/v1/shishamo_grpc_pb.js";
import test from "node:test";
import { credentials } from "@grpc/grpc-js";
import { db } from "../db/connection.js";
import { userCreateTestInt } from "./user.js";

const client = new shishamo_grpc_pb.ShishamoClient("localhost:50051", credentials.createInsecure());

test("int :: userCreate", userCreateTestInt(client, db));
// test("unit :: root", rootTestUnit);

