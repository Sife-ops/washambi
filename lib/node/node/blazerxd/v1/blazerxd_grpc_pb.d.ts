// GENERATED CODE -- DO NOT EDIT!

// package: blazerxd.v1
// file: blazerxd/v1/blazerxd.proto

import * as blazerxd_v1_blazerxd_pb from "../../blazerxd/v1/blazerxd_pb";
import * as grpc from "@grpc/grpc-js";

interface IBlazerxdService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  create: grpc.MethodDefinition<blazerxd_v1_blazerxd_pb.CreateRequest, blazerxd_v1_blazerxd_pb.CreateResponse>;
  get: grpc.MethodDefinition<blazerxd_v1_blazerxd_pb.GetRequest, blazerxd_v1_blazerxd_pb.GetResponse>;
}

export const BlazerxdService: IBlazerxdService;

export interface IBlazerxdServer extends grpc.UntypedServiceImplementation {
  create: grpc.handleUnaryCall<blazerxd_v1_blazerxd_pb.CreateRequest, blazerxd_v1_blazerxd_pb.CreateResponse>;
  get: grpc.handleUnaryCall<blazerxd_v1_blazerxd_pb.GetRequest, blazerxd_v1_blazerxd_pb.GetResponse>;
}

export class BlazerxdClient extends grpc.Client {
  constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
  create(argument: blazerxd_v1_blazerxd_pb.CreateRequest, callback: grpc.requestCallback<blazerxd_v1_blazerxd_pb.CreateResponse>): grpc.ClientUnaryCall;
  create(argument: blazerxd_v1_blazerxd_pb.CreateRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<blazerxd_v1_blazerxd_pb.CreateResponse>): grpc.ClientUnaryCall;
  create(argument: blazerxd_v1_blazerxd_pb.CreateRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<blazerxd_v1_blazerxd_pb.CreateResponse>): grpc.ClientUnaryCall;
  get(argument: blazerxd_v1_blazerxd_pb.GetRequest, callback: grpc.requestCallback<blazerxd_v1_blazerxd_pb.GetResponse>): grpc.ClientUnaryCall;
  get(argument: blazerxd_v1_blazerxd_pb.GetRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<blazerxd_v1_blazerxd_pb.GetResponse>): grpc.ClientUnaryCall;
  get(argument: blazerxd_v1_blazerxd_pb.GetRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<blazerxd_v1_blazerxd_pb.GetResponse>): grpc.ClientUnaryCall;
}
