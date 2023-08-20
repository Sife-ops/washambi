// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var blazerxd_v1_blazerxd_pb = require('../../blazerxd/v1/blazerxd_pb.js');
var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js');

function serialize_blazerxd_v1_CreateRequest(arg) {
  if (!(arg instanceof blazerxd_v1_blazerxd_pb.CreateRequest)) {
    throw new Error('Expected argument of type blazerxd.v1.CreateRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_blazerxd_v1_CreateRequest(buffer_arg) {
  return blazerxd_v1_blazerxd_pb.CreateRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_blazerxd_v1_CreateResponse(arg) {
  if (!(arg instanceof blazerxd_v1_blazerxd_pb.CreateResponse)) {
    throw new Error('Expected argument of type blazerxd.v1.CreateResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_blazerxd_v1_CreateResponse(buffer_arg) {
  return blazerxd_v1_blazerxd_pb.CreateResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_blazerxd_v1_GetRequest(arg) {
  if (!(arg instanceof blazerxd_v1_blazerxd_pb.GetRequest)) {
    throw new Error('Expected argument of type blazerxd.v1.GetRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_blazerxd_v1_GetRequest(buffer_arg) {
  return blazerxd_v1_blazerxd_pb.GetRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_blazerxd_v1_GetResponse(arg) {
  if (!(arg instanceof blazerxd_v1_blazerxd_pb.GetResponse)) {
    throw new Error('Expected argument of type blazerxd.v1.GetResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_blazerxd_v1_GetResponse(buffer_arg) {
  return blazerxd_v1_blazerxd_pb.GetResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var BlazerxdService = exports.BlazerxdService = {
  create: {
    path: '/blazerxd.v1.Blazerxd/Create',
    requestStream: false,
    responseStream: false,
    requestType: blazerxd_v1_blazerxd_pb.CreateRequest,
    responseType: blazerxd_v1_blazerxd_pb.CreateResponse,
    requestSerialize: serialize_blazerxd_v1_CreateRequest,
    requestDeserialize: deserialize_blazerxd_v1_CreateRequest,
    responseSerialize: serialize_blazerxd_v1_CreateResponse,
    responseDeserialize: deserialize_blazerxd_v1_CreateResponse,
  },
  get: {
    path: '/blazerxd.v1.Blazerxd/Get',
    requestStream: false,
    responseStream: false,
    requestType: blazerxd_v1_blazerxd_pb.GetRequest,
    responseType: blazerxd_v1_blazerxd_pb.GetResponse,
    requestSerialize: serialize_blazerxd_v1_GetRequest,
    requestDeserialize: deserialize_blazerxd_v1_GetRequest,
    responseSerialize: serialize_blazerxd_v1_GetResponse,
    responseDeserialize: deserialize_blazerxd_v1_GetResponse,
  },
};

exports.BlazerxdClient = grpc.makeGenericClientConstructor(BlazerxdService);
