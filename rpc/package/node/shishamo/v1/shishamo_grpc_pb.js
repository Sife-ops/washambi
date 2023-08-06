// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var shishamo_v1_shishamo_pb = require('../../shishamo/v1/shishamo_pb.js');
var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js');

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
};

exports.ShishamoClient = grpc.makeGenericClientConstructor(ShishamoService);
