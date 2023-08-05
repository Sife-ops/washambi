// GENERATED CODE -- DO NOT EDIT!

// package: shishamo.v1
// file: shishamo/v1/shishamo.proto

import * as shishamo_v1_shishamo_pb from "../../shishamo/v1/shishamo_pb";
import * as grpc from "@grpc/grpc-js";

interface IShishamoServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  userCreate: grpc.MethodDefinition<shishamo_v1_shishamo_pb.UserCreateRequest, shishamo_v1_shishamo_pb.UserCreateResponse>;
}

export const ShishamoServiceService: IShishamoServiceService;

export interface IShishamoServiceServer extends grpc.UntypedServiceImplementation {
  userCreate: grpc.handleUnaryCall<shishamo_v1_shishamo_pb.UserCreateRequest, shishamo_v1_shishamo_pb.UserCreateResponse>;
}

export class ShishamoServiceClient extends grpc.Client {
  constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
  userCreate(argument: shishamo_v1_shishamo_pb.UserCreateRequest, callback: grpc.requestCallback<shishamo_v1_shishamo_pb.UserCreateResponse>): grpc.ClientUnaryCall;
  userCreate(argument: shishamo_v1_shishamo_pb.UserCreateRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<shishamo_v1_shishamo_pb.UserCreateResponse>): grpc.ClientUnaryCall;
  userCreate(argument: shishamo_v1_shishamo_pb.UserCreateRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<shishamo_v1_shishamo_pb.UserCreateResponse>): grpc.ClientUnaryCall;
}
