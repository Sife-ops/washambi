// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var shishamo_v1_shishamo_pb = require('../../shishamo/v1/shishamo_pb.js');
var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js');

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
};

exports.ShishamoClient = grpc.makeGenericClientConstructor(ShishamoService);
