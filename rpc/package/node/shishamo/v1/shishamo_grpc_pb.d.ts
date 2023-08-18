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
  domainDelete: grpc.MethodDefinition<shishamo_v1_shishamo_pb.DomainDeleteRequest, shishamo_v1_shishamo_pb.DomainDeleteResponse>;
  domainPurge: grpc.MethodDefinition<shishamo_v1_shishamo_pb.DomainPurgeRequest, shishamo_v1_shishamo_pb.DomainPurgeResponse>;
  bookmarkCreate: grpc.MethodDefinition<shishamo_v1_shishamo_pb.BookmarkCreateRequest, shishamo_v1_shishamo_pb.BookmarkCreateResponse>;
  bookmarkGetAll: grpc.MethodDefinition<shishamo_v1_shishamo_pb.BookmarkGetAllRequest, shishamo_v1_shishamo_pb.BookmarkGetAllResponse>;
  bookmarkGetDomain: grpc.MethodDefinition<shishamo_v1_shishamo_pb.BookmarkGetForDomainRequest, shishamo_v1_shishamo_pb.BookmarkGetForDomainResponse>;
  bookmarkGetOne: grpc.MethodDefinition<shishamo_v1_shishamo_pb.BookmarkGetOneRequest, shishamo_v1_shishamo_pb.BookmarkGetOneResponse>;
  bookmarkDelete: grpc.MethodDefinition<shishamo_v1_shishamo_pb.BookmarkDeleteRequest, shishamo_v1_shishamo_pb.BookmarkDeleteResponse>;
  bookmarkPurge: grpc.MethodDefinition<shishamo_v1_shishamo_pb.BookmarkPurgeRequest, shishamo_v1_shishamo_pb.BookmarkPurgeResponse>;
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
  domainDelete: grpc.handleUnaryCall<shishamo_v1_shishamo_pb.DomainDeleteRequest, shishamo_v1_shishamo_pb.DomainDeleteResponse>;
  domainPurge: grpc.handleUnaryCall<shishamo_v1_shishamo_pb.DomainPurgeRequest, shishamo_v1_shishamo_pb.DomainPurgeResponse>;
  bookmarkCreate: grpc.handleUnaryCall<shishamo_v1_shishamo_pb.BookmarkCreateRequest, shishamo_v1_shishamo_pb.BookmarkCreateResponse>;
  bookmarkGetAll: grpc.handleUnaryCall<shishamo_v1_shishamo_pb.BookmarkGetAllRequest, shishamo_v1_shishamo_pb.BookmarkGetAllResponse>;
  bookmarkGetDomain: grpc.handleUnaryCall<shishamo_v1_shishamo_pb.BookmarkGetForDomainRequest, shishamo_v1_shishamo_pb.BookmarkGetForDomainResponse>;
  bookmarkGetOne: grpc.handleUnaryCall<shishamo_v1_shishamo_pb.BookmarkGetOneRequest, shishamo_v1_shishamo_pb.BookmarkGetOneResponse>;
  bookmarkDelete: grpc.handleUnaryCall<shishamo_v1_shishamo_pb.BookmarkDeleteRequest, shishamo_v1_shishamo_pb.BookmarkDeleteResponse>;
  bookmarkPurge: grpc.handleUnaryCall<shishamo_v1_shishamo_pb.BookmarkPurgeRequest, shishamo_v1_shishamo_pb.BookmarkPurgeResponse>;
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
  domainDelete(argument: shishamo_v1_shishamo_pb.DomainDeleteRequest, callback: grpc.requestCallback<shishamo_v1_shishamo_pb.DomainDeleteResponse>): grpc.ClientUnaryCall;
  domainDelete(argument: shishamo_v1_shishamo_pb.DomainDeleteRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<shishamo_v1_shishamo_pb.DomainDeleteResponse>): grpc.ClientUnaryCall;
  domainDelete(argument: shishamo_v1_shishamo_pb.DomainDeleteRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<shishamo_v1_shishamo_pb.DomainDeleteResponse>): grpc.ClientUnaryCall;
  domainPurge(argument: shishamo_v1_shishamo_pb.DomainPurgeRequest, callback: grpc.requestCallback<shishamo_v1_shishamo_pb.DomainPurgeResponse>): grpc.ClientUnaryCall;
  domainPurge(argument: shishamo_v1_shishamo_pb.DomainPurgeRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<shishamo_v1_shishamo_pb.DomainPurgeResponse>): grpc.ClientUnaryCall;
  domainPurge(argument: shishamo_v1_shishamo_pb.DomainPurgeRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<shishamo_v1_shishamo_pb.DomainPurgeResponse>): grpc.ClientUnaryCall;
  bookmarkCreate(argument: shishamo_v1_shishamo_pb.BookmarkCreateRequest, callback: grpc.requestCallback<shishamo_v1_shishamo_pb.BookmarkCreateResponse>): grpc.ClientUnaryCall;
  bookmarkCreate(argument: shishamo_v1_shishamo_pb.BookmarkCreateRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<shishamo_v1_shishamo_pb.BookmarkCreateResponse>): grpc.ClientUnaryCall;
  bookmarkCreate(argument: shishamo_v1_shishamo_pb.BookmarkCreateRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<shishamo_v1_shishamo_pb.BookmarkCreateResponse>): grpc.ClientUnaryCall;
  bookmarkGetAll(argument: shishamo_v1_shishamo_pb.BookmarkGetAllRequest, callback: grpc.requestCallback<shishamo_v1_shishamo_pb.BookmarkGetAllResponse>): grpc.ClientUnaryCall;
  bookmarkGetAll(argument: shishamo_v1_shishamo_pb.BookmarkGetAllRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<shishamo_v1_shishamo_pb.BookmarkGetAllResponse>): grpc.ClientUnaryCall;
  bookmarkGetAll(argument: shishamo_v1_shishamo_pb.BookmarkGetAllRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<shishamo_v1_shishamo_pb.BookmarkGetAllResponse>): grpc.ClientUnaryCall;
  bookmarkGetDomain(argument: shishamo_v1_shishamo_pb.BookmarkGetForDomainRequest, callback: grpc.requestCallback<shishamo_v1_shishamo_pb.BookmarkGetForDomainResponse>): grpc.ClientUnaryCall;
  bookmarkGetDomain(argument: shishamo_v1_shishamo_pb.BookmarkGetForDomainRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<shishamo_v1_shishamo_pb.BookmarkGetForDomainResponse>): grpc.ClientUnaryCall;
  bookmarkGetDomain(argument: shishamo_v1_shishamo_pb.BookmarkGetForDomainRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<shishamo_v1_shishamo_pb.BookmarkGetForDomainResponse>): grpc.ClientUnaryCall;
  bookmarkGetOne(argument: shishamo_v1_shishamo_pb.BookmarkGetOneRequest, callback: grpc.requestCallback<shishamo_v1_shishamo_pb.BookmarkGetOneResponse>): grpc.ClientUnaryCall;
  bookmarkGetOne(argument: shishamo_v1_shishamo_pb.BookmarkGetOneRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<shishamo_v1_shishamo_pb.BookmarkGetOneResponse>): grpc.ClientUnaryCall;
  bookmarkGetOne(argument: shishamo_v1_shishamo_pb.BookmarkGetOneRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<shishamo_v1_shishamo_pb.BookmarkGetOneResponse>): grpc.ClientUnaryCall;
  bookmarkDelete(argument: shishamo_v1_shishamo_pb.BookmarkDeleteRequest, callback: grpc.requestCallback<shishamo_v1_shishamo_pb.BookmarkDeleteResponse>): grpc.ClientUnaryCall;
  bookmarkDelete(argument: shishamo_v1_shishamo_pb.BookmarkDeleteRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<shishamo_v1_shishamo_pb.BookmarkDeleteResponse>): grpc.ClientUnaryCall;
  bookmarkDelete(argument: shishamo_v1_shishamo_pb.BookmarkDeleteRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<shishamo_v1_shishamo_pb.BookmarkDeleteResponse>): grpc.ClientUnaryCall;
  bookmarkPurge(argument: shishamo_v1_shishamo_pb.BookmarkPurgeRequest, callback: grpc.requestCallback<shishamo_v1_shishamo_pb.BookmarkPurgeResponse>): grpc.ClientUnaryCall;
  bookmarkPurge(argument: shishamo_v1_shishamo_pb.BookmarkPurgeRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<shishamo_v1_shishamo_pb.BookmarkPurgeResponse>): grpc.ClientUnaryCall;
  bookmarkPurge(argument: shishamo_v1_shishamo_pb.BookmarkPurgeRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<shishamo_v1_shishamo_pb.BookmarkPurgeResponse>): grpc.ClientUnaryCall;
}
