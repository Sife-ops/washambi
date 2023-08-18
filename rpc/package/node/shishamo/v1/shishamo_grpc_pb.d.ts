// GENERATED CODE -- DO NOT EDIT!

// package: shishamo.v1
// file: shishamo/v1/shishamo.proto

import * as shishamo_v1_shishamo_pb from "../../shishamo/v1/shishamo_pb";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";
import * as grpc from "@grpc/grpc-js";

interface IShishamoService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  userCreate: grpc.MethodDefinition<shishamo_v1_shishamo_pb.UserCreateRequest, shishamo_v1_shishamo_pb.UserCreateResponse>;
  userGetOne: grpc.MethodDefinition<shishamo_v1_shishamo_pb.UserGetOneRequest, shishamo_v1_shishamo_pb.UserGetOneResponse>;
  userChangePassword: grpc.MethodDefinition<shishamo_v1_shishamo_pb.UserChangePasswordRequest, shishamo_v1_shishamo_pb.UserChangePasswordResponse>;
  userPurge: grpc.MethodDefinition<shishamo_v1_shishamo_pb.UserPurgeRequest, google_protobuf_empty_pb.Empty>;
  userGetToken: grpc.MethodDefinition<shishamo_v1_shishamo_pb.UserGetTokenRequest, shishamo_v1_shishamo_pb.UserGetTokenResponse>;
  userVerifyToken: grpc.MethodDefinition<shishamo_v1_shishamo_pb.UserVerifyTokenRequest, shishamo_v1_shishamo_pb.UserVerifyTokenResponse>;
  domainCreate: grpc.MethodDefinition<shishamo_v1_shishamo_pb.DomainCreateRequest, shishamo_v1_shishamo_pb.DomainCreateResponse>;
  domainGetAll: grpc.MethodDefinition<shishamo_v1_shishamo_pb.DomainGetAllRequest, shishamo_v1_shishamo_pb.DomainGetAllResponse>;
  domainGetOne: grpc.MethodDefinition<shishamo_v1_shishamo_pb.DomainGetOneRequest, shishamo_v1_shishamo_pb.DomainGetOneResponse>;
}

export const ShishamoService: IShishamoService;

export interface IShishamoServer extends grpc.UntypedServiceImplementation {
  userCreate: grpc.handleUnaryCall<shishamo_v1_shishamo_pb.UserCreateRequest, shishamo_v1_shishamo_pb.UserCreateResponse>;
  userGetOne: grpc.handleUnaryCall<shishamo_v1_shishamo_pb.UserGetOneRequest, shishamo_v1_shishamo_pb.UserGetOneResponse>;
  userChangePassword: grpc.handleUnaryCall<shishamo_v1_shishamo_pb.UserChangePasswordRequest, shishamo_v1_shishamo_pb.UserChangePasswordResponse>;
  userPurge: grpc.handleUnaryCall<shishamo_v1_shishamo_pb.UserPurgeRequest, google_protobuf_empty_pb.Empty>;
  userGetToken: grpc.handleUnaryCall<shishamo_v1_shishamo_pb.UserGetTokenRequest, shishamo_v1_shishamo_pb.UserGetTokenResponse>;
  userVerifyToken: grpc.handleUnaryCall<shishamo_v1_shishamo_pb.UserVerifyTokenRequest, shishamo_v1_shishamo_pb.UserVerifyTokenResponse>;
  domainCreate: grpc.handleUnaryCall<shishamo_v1_shishamo_pb.DomainCreateRequest, shishamo_v1_shishamo_pb.DomainCreateResponse>;
  domainGetAll: grpc.handleUnaryCall<shishamo_v1_shishamo_pb.DomainGetAllRequest, shishamo_v1_shishamo_pb.DomainGetAllResponse>;
  domainGetOne: grpc.handleUnaryCall<shishamo_v1_shishamo_pb.DomainGetOneRequest, shishamo_v1_shishamo_pb.DomainGetOneResponse>;
}

export class ShishamoClient extends grpc.Client {
  constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
  userCreate(argument: shishamo_v1_shishamo_pb.UserCreateRequest, callback: grpc.requestCallback<shishamo_v1_shishamo_pb.UserCreateResponse>): grpc.ClientUnaryCall;
  userCreate(argument: shishamo_v1_shishamo_pb.UserCreateRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<shishamo_v1_shishamo_pb.UserCreateResponse>): grpc.ClientUnaryCall;
  userCreate(argument: shishamo_v1_shishamo_pb.UserCreateRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<shishamo_v1_shishamo_pb.UserCreateResponse>): grpc.ClientUnaryCall;
  userGetOne(argument: shishamo_v1_shishamo_pb.UserGetOneRequest, callback: grpc.requestCallback<shishamo_v1_shishamo_pb.UserGetOneResponse>): grpc.ClientUnaryCall;
  userGetOne(argument: shishamo_v1_shishamo_pb.UserGetOneRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<shishamo_v1_shishamo_pb.UserGetOneResponse>): grpc.ClientUnaryCall;
  userGetOne(argument: shishamo_v1_shishamo_pb.UserGetOneRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<shishamo_v1_shishamo_pb.UserGetOneResponse>): grpc.ClientUnaryCall;
  userChangePassword(argument: shishamo_v1_shishamo_pb.UserChangePasswordRequest, callback: grpc.requestCallback<shishamo_v1_shishamo_pb.UserChangePasswordResponse>): grpc.ClientUnaryCall;
  userChangePassword(argument: shishamo_v1_shishamo_pb.UserChangePasswordRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<shishamo_v1_shishamo_pb.UserChangePasswordResponse>): grpc.ClientUnaryCall;
  userChangePassword(argument: shishamo_v1_shishamo_pb.UserChangePasswordRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<shishamo_v1_shishamo_pb.UserChangePasswordResponse>): grpc.ClientUnaryCall;
  userPurge(argument: shishamo_v1_shishamo_pb.UserPurgeRequest, callback: grpc.requestCallback<google_protobuf_empty_pb.Empty>): grpc.ClientUnaryCall;
  userPurge(argument: shishamo_v1_shishamo_pb.UserPurgeRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<google_protobuf_empty_pb.Empty>): grpc.ClientUnaryCall;
  userPurge(argument: shishamo_v1_shishamo_pb.UserPurgeRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<google_protobuf_empty_pb.Empty>): grpc.ClientUnaryCall;
  userGetToken(argument: shishamo_v1_shishamo_pb.UserGetTokenRequest, callback: grpc.requestCallback<shishamo_v1_shishamo_pb.UserGetTokenResponse>): grpc.ClientUnaryCall;
  userGetToken(argument: shishamo_v1_shishamo_pb.UserGetTokenRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<shishamo_v1_shishamo_pb.UserGetTokenResponse>): grpc.ClientUnaryCall;
  userGetToken(argument: shishamo_v1_shishamo_pb.UserGetTokenRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<shishamo_v1_shishamo_pb.UserGetTokenResponse>): grpc.ClientUnaryCall;
  userVerifyToken(argument: shishamo_v1_shishamo_pb.UserVerifyTokenRequest, callback: grpc.requestCallback<shishamo_v1_shishamo_pb.UserVerifyTokenResponse>): grpc.ClientUnaryCall;
  userVerifyToken(argument: shishamo_v1_shishamo_pb.UserVerifyTokenRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<shishamo_v1_shishamo_pb.UserVerifyTokenResponse>): grpc.ClientUnaryCall;
  userVerifyToken(argument: shishamo_v1_shishamo_pb.UserVerifyTokenRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<shishamo_v1_shishamo_pb.UserVerifyTokenResponse>): grpc.ClientUnaryCall;
  domainCreate(argument: shishamo_v1_shishamo_pb.DomainCreateRequest, callback: grpc.requestCallback<shishamo_v1_shishamo_pb.DomainCreateResponse>): grpc.ClientUnaryCall;
  domainCreate(argument: shishamo_v1_shishamo_pb.DomainCreateRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<shishamo_v1_shishamo_pb.DomainCreateResponse>): grpc.ClientUnaryCall;
  domainCreate(argument: shishamo_v1_shishamo_pb.DomainCreateRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<shishamo_v1_shishamo_pb.DomainCreateResponse>): grpc.ClientUnaryCall;
  domainGetAll(argument: shishamo_v1_shishamo_pb.DomainGetAllRequest, callback: grpc.requestCallback<shishamo_v1_shishamo_pb.DomainGetAllResponse>): grpc.ClientUnaryCall;
  domainGetAll(argument: shishamo_v1_shishamo_pb.DomainGetAllRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<shishamo_v1_shishamo_pb.DomainGetAllResponse>): grpc.ClientUnaryCall;
  domainGetAll(argument: shishamo_v1_shishamo_pb.DomainGetAllRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<shishamo_v1_shishamo_pb.DomainGetAllResponse>): grpc.ClientUnaryCall;
  domainGetOne(argument: shishamo_v1_shishamo_pb.DomainGetOneRequest, callback: grpc.requestCallback<shishamo_v1_shishamo_pb.DomainGetOneResponse>): grpc.ClientUnaryCall;
  domainGetOne(argument: shishamo_v1_shishamo_pb.DomainGetOneRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<shishamo_v1_shishamo_pb.DomainGetOneResponse>): grpc.ClientUnaryCall;
  domainGetOne(argument: shishamo_v1_shishamo_pb.DomainGetOneRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<shishamo_v1_shishamo_pb.DomainGetOneResponse>): grpc.ClientUnaryCall;
}
