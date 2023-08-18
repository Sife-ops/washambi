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

function serialize_shishamo_v1_BookmarkCreateRequest(arg) {
  if (!(arg instanceof shishamo_v1_shishamo_pb.BookmarkCreateRequest)) {
    throw new Error('Expected argument of type shishamo.v1.BookmarkCreateRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_shishamo_v1_BookmarkCreateRequest(buffer_arg) {
  return shishamo_v1_shishamo_pb.BookmarkCreateRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_shishamo_v1_BookmarkCreateResponse(arg) {
  if (!(arg instanceof shishamo_v1_shishamo_pb.BookmarkCreateResponse)) {
    throw new Error('Expected argument of type shishamo.v1.BookmarkCreateResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_shishamo_v1_BookmarkCreateResponse(buffer_arg) {
  return shishamo_v1_shishamo_pb.BookmarkCreateResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_shishamo_v1_BookmarkDeleteRequest(arg) {
  if (!(arg instanceof shishamo_v1_shishamo_pb.BookmarkDeleteRequest)) {
    throw new Error('Expected argument of type shishamo.v1.BookmarkDeleteRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_shishamo_v1_BookmarkDeleteRequest(buffer_arg) {
  return shishamo_v1_shishamo_pb.BookmarkDeleteRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_shishamo_v1_BookmarkDeleteResponse(arg) {
  if (!(arg instanceof shishamo_v1_shishamo_pb.BookmarkDeleteResponse)) {
    throw new Error('Expected argument of type shishamo.v1.BookmarkDeleteResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_shishamo_v1_BookmarkDeleteResponse(buffer_arg) {
  return shishamo_v1_shishamo_pb.BookmarkDeleteResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_shishamo_v1_BookmarkGetAllRequest(arg) {
  if (!(arg instanceof shishamo_v1_shishamo_pb.BookmarkGetAllRequest)) {
    throw new Error('Expected argument of type shishamo.v1.BookmarkGetAllRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_shishamo_v1_BookmarkGetAllRequest(buffer_arg) {
  return shishamo_v1_shishamo_pb.BookmarkGetAllRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_shishamo_v1_BookmarkGetAllResponse(arg) {
  if (!(arg instanceof shishamo_v1_shishamo_pb.BookmarkGetAllResponse)) {
    throw new Error('Expected argument of type shishamo.v1.BookmarkGetAllResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_shishamo_v1_BookmarkGetAllResponse(buffer_arg) {
  return shishamo_v1_shishamo_pb.BookmarkGetAllResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_shishamo_v1_BookmarkGetForDomainRequest(arg) {
  if (!(arg instanceof shishamo_v1_shishamo_pb.BookmarkGetForDomainRequest)) {
    throw new Error('Expected argument of type shishamo.v1.BookmarkGetForDomainRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_shishamo_v1_BookmarkGetForDomainRequest(buffer_arg) {
  return shishamo_v1_shishamo_pb.BookmarkGetForDomainRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_shishamo_v1_BookmarkGetForDomainResponse(arg) {
  if (!(arg instanceof shishamo_v1_shishamo_pb.BookmarkGetForDomainResponse)) {
    throw new Error('Expected argument of type shishamo.v1.BookmarkGetForDomainResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_shishamo_v1_BookmarkGetForDomainResponse(buffer_arg) {
  return shishamo_v1_shishamo_pb.BookmarkGetForDomainResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_shishamo_v1_BookmarkGetOneRequest(arg) {
  if (!(arg instanceof shishamo_v1_shishamo_pb.BookmarkGetOneRequest)) {
    throw new Error('Expected argument of type shishamo.v1.BookmarkGetOneRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_shishamo_v1_BookmarkGetOneRequest(buffer_arg) {
  return shishamo_v1_shishamo_pb.BookmarkGetOneRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_shishamo_v1_BookmarkGetOneResponse(arg) {
  if (!(arg instanceof shishamo_v1_shishamo_pb.BookmarkGetOneResponse)) {
    throw new Error('Expected argument of type shishamo.v1.BookmarkGetOneResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_shishamo_v1_BookmarkGetOneResponse(buffer_arg) {
  return shishamo_v1_shishamo_pb.BookmarkGetOneResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_shishamo_v1_BookmarkPurgeRequest(arg) {
  if (!(arg instanceof shishamo_v1_shishamo_pb.BookmarkPurgeRequest)) {
    throw new Error('Expected argument of type shishamo.v1.BookmarkPurgeRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_shishamo_v1_BookmarkPurgeRequest(buffer_arg) {
  return shishamo_v1_shishamo_pb.BookmarkPurgeRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_shishamo_v1_BookmarkPurgeResponse(arg) {
  if (!(arg instanceof shishamo_v1_shishamo_pb.BookmarkPurgeResponse)) {
    throw new Error('Expected argument of type shishamo.v1.BookmarkPurgeResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_shishamo_v1_BookmarkPurgeResponse(buffer_arg) {
  return shishamo_v1_shishamo_pb.BookmarkPurgeResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_shishamo_v1_DomainCreateRequest(arg) {
  if (!(arg instanceof shishamo_v1_shishamo_pb.DomainCreateRequest)) {
    throw new Error('Expected argument of type shishamo.v1.DomainCreateRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_shishamo_v1_DomainCreateRequest(buffer_arg) {
  return shishamo_v1_shishamo_pb.DomainCreateRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_shishamo_v1_DomainCreateResponse(arg) {
  if (!(arg instanceof shishamo_v1_shishamo_pb.DomainCreateResponse)) {
    throw new Error('Expected argument of type shishamo.v1.DomainCreateResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_shishamo_v1_DomainCreateResponse(buffer_arg) {
  return shishamo_v1_shishamo_pb.DomainCreateResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_shishamo_v1_DomainDeleteRequest(arg) {
  if (!(arg instanceof shishamo_v1_shishamo_pb.DomainDeleteRequest)) {
    throw new Error('Expected argument of type shishamo.v1.DomainDeleteRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_shishamo_v1_DomainDeleteRequest(buffer_arg) {
  return shishamo_v1_shishamo_pb.DomainDeleteRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_shishamo_v1_DomainDeleteResponse(arg) {
  if (!(arg instanceof shishamo_v1_shishamo_pb.DomainDeleteResponse)) {
    throw new Error('Expected argument of type shishamo.v1.DomainDeleteResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_shishamo_v1_DomainDeleteResponse(buffer_arg) {
  return shishamo_v1_shishamo_pb.DomainDeleteResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_shishamo_v1_DomainGetAllRequest(arg) {
  if (!(arg instanceof shishamo_v1_shishamo_pb.DomainGetAllRequest)) {
    throw new Error('Expected argument of type shishamo.v1.DomainGetAllRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_shishamo_v1_DomainGetAllRequest(buffer_arg) {
  return shishamo_v1_shishamo_pb.DomainGetAllRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_shishamo_v1_DomainGetAllResponse(arg) {
  if (!(arg instanceof shishamo_v1_shishamo_pb.DomainGetAllResponse)) {
    throw new Error('Expected argument of type shishamo.v1.DomainGetAllResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_shishamo_v1_DomainGetAllResponse(buffer_arg) {
  return shishamo_v1_shishamo_pb.DomainGetAllResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_shishamo_v1_DomainGetOneRequest(arg) {
  if (!(arg instanceof shishamo_v1_shishamo_pb.DomainGetOneRequest)) {
    throw new Error('Expected argument of type shishamo.v1.DomainGetOneRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_shishamo_v1_DomainGetOneRequest(buffer_arg) {
  return shishamo_v1_shishamo_pb.DomainGetOneRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_shishamo_v1_DomainGetOneResponse(arg) {
  if (!(arg instanceof shishamo_v1_shishamo_pb.DomainGetOneResponse)) {
    throw new Error('Expected argument of type shishamo.v1.DomainGetOneResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_shishamo_v1_DomainGetOneResponse(buffer_arg) {
  return shishamo_v1_shishamo_pb.DomainGetOneResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_shishamo_v1_DomainPurgeRequest(arg) {
  if (!(arg instanceof shishamo_v1_shishamo_pb.DomainPurgeRequest)) {
    throw new Error('Expected argument of type shishamo.v1.DomainPurgeRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_shishamo_v1_DomainPurgeRequest(buffer_arg) {
  return shishamo_v1_shishamo_pb.DomainPurgeRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_shishamo_v1_DomainPurgeResponse(arg) {
  if (!(arg instanceof shishamo_v1_shishamo_pb.DomainPurgeResponse)) {
    throw new Error('Expected argument of type shishamo.v1.DomainPurgeResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_shishamo_v1_DomainPurgeResponse(buffer_arg) {
  return shishamo_v1_shishamo_pb.DomainPurgeResponse.deserializeBinary(new Uint8Array(buffer_arg));
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

function serialize_shishamo_v1_UserGetTokenRequest(arg) {
  if (!(arg instanceof shishamo_v1_shishamo_pb.UserGetTokenRequest)) {
    throw new Error('Expected argument of type shishamo.v1.UserGetTokenRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_shishamo_v1_UserGetTokenRequest(buffer_arg) {
  return shishamo_v1_shishamo_pb.UserGetTokenRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_shishamo_v1_UserGetTokenResponse(arg) {
  if (!(arg instanceof shishamo_v1_shishamo_pb.UserGetTokenResponse)) {
    throw new Error('Expected argument of type shishamo.v1.UserGetTokenResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_shishamo_v1_UserGetTokenResponse(buffer_arg) {
  return shishamo_v1_shishamo_pb.UserGetTokenResponse.deserializeBinary(new Uint8Array(buffer_arg));
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

function serialize_shishamo_v1_UserVerifyTokenRequest(arg) {
  if (!(arg instanceof shishamo_v1_shishamo_pb.UserVerifyTokenRequest)) {
    throw new Error('Expected argument of type shishamo.v1.UserVerifyTokenRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_shishamo_v1_UserVerifyTokenRequest(buffer_arg) {
  return shishamo_v1_shishamo_pb.UserVerifyTokenRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_shishamo_v1_UserVerifyTokenResponse(arg) {
  if (!(arg instanceof shishamo_v1_shishamo_pb.UserVerifyTokenResponse)) {
    throw new Error('Expected argument of type shishamo.v1.UserVerifyTokenResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_shishamo_v1_UserVerifyTokenResponse(buffer_arg) {
  return shishamo_v1_shishamo_pb.UserVerifyTokenResponse.deserializeBinary(new Uint8Array(buffer_arg));
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
userGetToken: {
    path: '/shishamo.v1.Shishamo/UserGetToken',
    requestStream: false,
    responseStream: false,
    requestType: shishamo_v1_shishamo_pb.UserGetTokenRequest,
    responseType: shishamo_v1_shishamo_pb.UserGetTokenResponse,
    requestSerialize: serialize_shishamo_v1_UserGetTokenRequest,
    requestDeserialize: deserialize_shishamo_v1_UserGetTokenRequest,
    responseSerialize: serialize_shishamo_v1_UserGetTokenResponse,
    responseDeserialize: deserialize_shishamo_v1_UserGetTokenResponse,
  },
  userVerifyToken: {
    path: '/shishamo.v1.Shishamo/UserVerifyToken',
    requestStream: false,
    responseStream: false,
    requestType: shishamo_v1_shishamo_pb.UserVerifyTokenRequest,
    responseType: shishamo_v1_shishamo_pb.UserVerifyTokenResponse,
    requestSerialize: serialize_shishamo_v1_UserVerifyTokenRequest,
    requestDeserialize: deserialize_shishamo_v1_UserVerifyTokenRequest,
    responseSerialize: serialize_shishamo_v1_UserVerifyTokenResponse,
    responseDeserialize: deserialize_shishamo_v1_UserVerifyTokenResponse,
  },
  domainCreate: {
    path: '/shishamo.v1.Shishamo/DomainCreate',
    requestStream: false,
    responseStream: false,
    requestType: shishamo_v1_shishamo_pb.DomainCreateRequest,
    responseType: shishamo_v1_shishamo_pb.DomainCreateResponse,
    requestSerialize: serialize_shishamo_v1_DomainCreateRequest,
    requestDeserialize: deserialize_shishamo_v1_DomainCreateRequest,
    responseSerialize: serialize_shishamo_v1_DomainCreateResponse,
    responseDeserialize: deserialize_shishamo_v1_DomainCreateResponse,
  },
  domainGetAll: {
    path: '/shishamo.v1.Shishamo/DomainGetAll',
    requestStream: false,
    responseStream: false,
    requestType: shishamo_v1_shishamo_pb.DomainGetAllRequest,
    responseType: shishamo_v1_shishamo_pb.DomainGetAllResponse,
    requestSerialize: serialize_shishamo_v1_DomainGetAllRequest,
    requestDeserialize: deserialize_shishamo_v1_DomainGetAllRequest,
    responseSerialize: serialize_shishamo_v1_DomainGetAllResponse,
    responseDeserialize: deserialize_shishamo_v1_DomainGetAllResponse,
  },
  domainGetOne: {
    path: '/shishamo.v1.Shishamo/DomainGetOne',
    requestStream: false,
    responseStream: false,
    requestType: shishamo_v1_shishamo_pb.DomainGetOneRequest,
    responseType: shishamo_v1_shishamo_pb.DomainGetOneResponse,
    requestSerialize: serialize_shishamo_v1_DomainGetOneRequest,
    requestDeserialize: deserialize_shishamo_v1_DomainGetOneRequest,
    responseSerialize: serialize_shishamo_v1_DomainGetOneResponse,
    responseDeserialize: deserialize_shishamo_v1_DomainGetOneResponse,
  },
  domainDelete: {
    path: '/shishamo.v1.Shishamo/DomainDelete',
    requestStream: false,
    responseStream: false,
    requestType: shishamo_v1_shishamo_pb.DomainDeleteRequest,
    responseType: shishamo_v1_shishamo_pb.DomainDeleteResponse,
    requestSerialize: serialize_shishamo_v1_DomainDeleteRequest,
    requestDeserialize: deserialize_shishamo_v1_DomainDeleteRequest,
    responseSerialize: serialize_shishamo_v1_DomainDeleteResponse,
    responseDeserialize: deserialize_shishamo_v1_DomainDeleteResponse,
  },
  domainPurge: {
    path: '/shishamo.v1.Shishamo/DomainPurge',
    requestStream: false,
    responseStream: false,
    requestType: shishamo_v1_shishamo_pb.DomainPurgeRequest,
    responseType: shishamo_v1_shishamo_pb.DomainPurgeResponse,
    requestSerialize: serialize_shishamo_v1_DomainPurgeRequest,
    requestDeserialize: deserialize_shishamo_v1_DomainPurgeRequest,
    responseSerialize: serialize_shishamo_v1_DomainPurgeResponse,
    responseDeserialize: deserialize_shishamo_v1_DomainPurgeResponse,
  },
  bookmarkCreate: {
    path: '/shishamo.v1.Shishamo/BookmarkCreate',
    requestStream: false,
    responseStream: false,
    requestType: shishamo_v1_shishamo_pb.BookmarkCreateRequest,
    responseType: shishamo_v1_shishamo_pb.BookmarkCreateResponse,
    requestSerialize: serialize_shishamo_v1_BookmarkCreateRequest,
    requestDeserialize: deserialize_shishamo_v1_BookmarkCreateRequest,
    responseSerialize: serialize_shishamo_v1_BookmarkCreateResponse,
    responseDeserialize: deserialize_shishamo_v1_BookmarkCreateResponse,
  },
  bookmarkGetAll: {
    path: '/shishamo.v1.Shishamo/BookmarkGetAll',
    requestStream: false,
    responseStream: false,
    requestType: shishamo_v1_shishamo_pb.BookmarkGetAllRequest,
    responseType: shishamo_v1_shishamo_pb.BookmarkGetAllResponse,
    requestSerialize: serialize_shishamo_v1_BookmarkGetAllRequest,
    requestDeserialize: deserialize_shishamo_v1_BookmarkGetAllRequest,
    responseSerialize: serialize_shishamo_v1_BookmarkGetAllResponse,
    responseDeserialize: deserialize_shishamo_v1_BookmarkGetAllResponse,
  },
  bookmarkGetDomain: {
    path: '/shishamo.v1.Shishamo/BookmarkGetDomain',
    requestStream: false,
    responseStream: false,
    requestType: shishamo_v1_shishamo_pb.BookmarkGetForDomainRequest,
    responseType: shishamo_v1_shishamo_pb.BookmarkGetForDomainResponse,
    requestSerialize: serialize_shishamo_v1_BookmarkGetForDomainRequest,
    requestDeserialize: deserialize_shishamo_v1_BookmarkGetForDomainRequest,
    responseSerialize: serialize_shishamo_v1_BookmarkGetForDomainResponse,
    responseDeserialize: deserialize_shishamo_v1_BookmarkGetForDomainResponse,
  },
  bookmarkGetOne: {
    path: '/shishamo.v1.Shishamo/BookmarkGetOne',
    requestStream: false,
    responseStream: false,
    requestType: shishamo_v1_shishamo_pb.BookmarkGetOneRequest,
    responseType: shishamo_v1_shishamo_pb.BookmarkGetOneResponse,
    requestSerialize: serialize_shishamo_v1_BookmarkGetOneRequest,
    requestDeserialize: deserialize_shishamo_v1_BookmarkGetOneRequest,
    responseSerialize: serialize_shishamo_v1_BookmarkGetOneResponse,
    responseDeserialize: deserialize_shishamo_v1_BookmarkGetOneResponse,
  },
  bookmarkDelete: {
    path: '/shishamo.v1.Shishamo/BookmarkDelete',
    requestStream: false,
    responseStream: false,
    requestType: shishamo_v1_shishamo_pb.BookmarkDeleteRequest,
    responseType: shishamo_v1_shishamo_pb.BookmarkDeleteResponse,
    requestSerialize: serialize_shishamo_v1_BookmarkDeleteRequest,
    requestDeserialize: deserialize_shishamo_v1_BookmarkDeleteRequest,
    responseSerialize: serialize_shishamo_v1_BookmarkDeleteResponse,
    responseDeserialize: deserialize_shishamo_v1_BookmarkDeleteResponse,
  },
  bookmarkPurge: {
    path: '/shishamo.v1.Shishamo/BookmarkPurge',
    requestStream: false,
    responseStream: false,
    requestType: shishamo_v1_shishamo_pb.BookmarkPurgeRequest,
    responseType: shishamo_v1_shishamo_pb.BookmarkPurgeResponse,
    requestSerialize: serialize_shishamo_v1_BookmarkPurgeRequest,
    requestDeserialize: deserialize_shishamo_v1_BookmarkPurgeRequest,
    responseSerialize: serialize_shishamo_v1_BookmarkPurgeResponse,
    responseDeserialize: deserialize_shishamo_v1_BookmarkPurgeResponse,
  },
};

exports.ShishamoClient = grpc.makeGenericClientConstructor(ShishamoService);
