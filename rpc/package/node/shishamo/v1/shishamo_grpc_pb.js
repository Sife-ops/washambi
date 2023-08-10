// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var shishamo_v1_shishamo_pb = require('../../shishamo/v1/shishamo_pb.js');
var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js');
var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js');

function serialize_google_protobuf_Empty(arg) {
  if (!(arg instanceof google_protobuf_empty_pb.Empty)) {
    throw new Error('Expected argument of type google.protobuf.Empty');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_google_protobuf_Empty(buffer_arg) {
  return google_protobuf_empty_pb.Empty.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_shishamo_v1_UserChangePasswordRequest(arg) {
  if (!(arg instanceof shishamo_v1_shishamo_pb.UserChangePasswordRequest)) {
    throw new Error('Expected argument of type shishamo.v1.UserChangePasswordRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_shishamo_v1_UserChangePasswordRequest(buffer_arg) {
  return shishamo_v1_shishamo_pb.UserChangePasswordRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_shishamo_v1_UserChangePasswordResponse(arg) {
  if (!(arg instanceof shishamo_v1_shishamo_pb.UserChangePasswordResponse)) {
    throw new Error('Expected argument of type shishamo.v1.UserChangePasswordResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_shishamo_v1_UserChangePasswordResponse(buffer_arg) {
  return shishamo_v1_shishamo_pb.UserChangePasswordResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_shishamo_v1_UserCreateRequest(arg) {
  if (!(arg instanceof shishamo_v1_shishamo_pb.UserCreateRequest)) {
    throw new Error('Expected argument of type shishamo.v1.UserCreateRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_shishamo_v1_UserCreateRequest(buffer_arg) {
  return shishamo_v1_shishamo_pb.UserCreateRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_shishamo_v1_UserCreateResponse(arg) {
  if (!(arg instanceof shishamo_v1_shishamo_pb.UserCreateResponse)) {
    throw new Error('Expected argument of type shishamo.v1.UserCreateResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_shishamo_v1_UserCreateResponse(buffer_arg) {
  return shishamo_v1_shishamo_pb.UserCreateResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_shishamo_v1_UserGetOneRequest(arg) {
  if (!(arg instanceof shishamo_v1_shishamo_pb.UserGetOneRequest)) {
    throw new Error('Expected argument of type shishamo.v1.UserGetOneRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_shishamo_v1_UserGetOneRequest(buffer_arg) {
  return shishamo_v1_shishamo_pb.UserGetOneRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_shishamo_v1_UserGetOneResponse(arg) {
  if (!(arg instanceof shishamo_v1_shishamo_pb.UserGetOneResponse)) {
    throw new Error('Expected argument of type shishamo.v1.UserGetOneResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_shishamo_v1_UserGetOneResponse(buffer_arg) {
  return shishamo_v1_shishamo_pb.UserGetOneResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_shishamo_v1_UserPurgeRequest(arg) {
  if (!(arg instanceof shishamo_v1_shishamo_pb.UserPurgeRequest)) {
    throw new Error('Expected argument of type shishamo.v1.UserPurgeRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_shishamo_v1_UserPurgeRequest(buffer_arg) {
  return shishamo_v1_shishamo_pb.UserPurgeRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_shishamo_v1_UserTokenRequest(arg) {
  if (!(arg instanceof shishamo_v1_shishamo_pb.UserTokenRequest)) {
    throw new Error('Expected argument of type shishamo.v1.UserTokenRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_shishamo_v1_UserTokenRequest(buffer_arg) {
  return shishamo_v1_shishamo_pb.UserTokenRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_shishamo_v1_UserTokenResponse(arg) {
  if (!(arg instanceof shishamo_v1_shishamo_pb.UserTokenResponse)) {
    throw new Error('Expected argument of type shishamo.v1.UserTokenResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_shishamo_v1_UserTokenResponse(buffer_arg) {
  return shishamo_v1_shishamo_pb.UserTokenResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var ShishamoService = exports.ShishamoService = {
  userCreate: {
    path: '/shishamo.v1.Shishamo/UserCreate',
    requestStream: false,
    responseStream: false,
    requestType: shishamo_v1_shishamo_pb.UserCreateRequest,
    responseType: shishamo_v1_shishamo_pb.UserCreateResponse,
    requestSerialize: serialize_shishamo_v1_UserCreateRequest,
    requestDeserialize: deserialize_shishamo_v1_UserCreateRequest,
    responseSerialize: serialize_shishamo_v1_UserCreateResponse,
    responseDeserialize: deserialize_shishamo_v1_UserCreateResponse,
  },
  userGetOne: {
    path: '/shishamo.v1.Shishamo/UserGetOne',
    requestStream: false,
    responseStream: false,
    requestType: shishamo_v1_shishamo_pb.UserGetOneRequest,
    responseType: shishamo_v1_shishamo_pb.UserGetOneResponse,
    requestSerialize: serialize_shishamo_v1_UserGetOneRequest,
    requestDeserialize: deserialize_shishamo_v1_UserGetOneRequest,
    responseSerialize: serialize_shishamo_v1_UserGetOneResponse,
    responseDeserialize: deserialize_shishamo_v1_UserGetOneResponse,
  },
  userChangePassword: {
    path: '/shishamo.v1.Shishamo/UserChangePassword',
    requestStream: false,
    responseStream: false,
    requestType: shishamo_v1_shishamo_pb.UserChangePasswordRequest,
    responseType: shishamo_v1_shishamo_pb.UserChangePasswordResponse,
    requestSerialize: serialize_shishamo_v1_UserChangePasswordRequest,
    requestDeserialize: deserialize_shishamo_v1_UserChangePasswordRequest,
    responseSerialize: serialize_shishamo_v1_UserChangePasswordResponse,
    responseDeserialize: deserialize_shishamo_v1_UserChangePasswordResponse,
  },
  userPurge: {
    path: '/shishamo.v1.Shishamo/UserPurge',
    requestStream: false,
    responseStream: false,
    requestType: shishamo_v1_shishamo_pb.UserPurgeRequest,
    responseType: google_protobuf_empty_pb.Empty,
    requestSerialize: serialize_shishamo_v1_UserPurgeRequest,
    requestDeserialize: deserialize_shishamo_v1_UserPurgeRequest,
    responseSerialize: serialize_google_protobuf_Empty,
    responseDeserialize: deserialize_google_protobuf_Empty,
  },
  // todo: UserDisable
userToken: {
    path: '/shishamo.v1.Shishamo/UserToken',
    requestStream: false,
    responseStream: false,
    requestType: shishamo_v1_shishamo_pb.UserTokenRequest,
    responseType: shishamo_v1_shishamo_pb.UserTokenResponse,
    requestSerialize: serialize_shishamo_v1_UserTokenRequest,
    requestDeserialize: deserialize_shishamo_v1_UserTokenRequest,
    responseSerialize: serialize_shishamo_v1_UserTokenResponse,
    responseDeserialize: deserialize_shishamo_v1_UserTokenResponse,
  },
};

exports.ShishamoClient = grpc.makeGenericClientConstructor(ShishamoService);
