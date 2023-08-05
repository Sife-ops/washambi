// GENERATED CODE -- DO NOT EDIT!

// package: helloworld
// file: foo/v1/foo.proto

import * as foo_v1_foo_pb from "../../foo/v1/foo_pb";
import * as grpc from "@grpc/grpc-js";

interface IGreeterService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  sayHello: grpc.MethodDefinition<foo_v1_foo_pb.HelloRequest, foo_v1_foo_pb.HelloReply>;
  sayHelloStreamReply: grpc.MethodDefinition<foo_v1_foo_pb.HelloRequest, foo_v1_foo_pb.HelloReply>;
}

export const GreeterService: IGreeterService;

export interface IGreeterServer extends grpc.UntypedServiceImplementation {
  sayHello: grpc.handleUnaryCall<foo_v1_foo_pb.HelloRequest, foo_v1_foo_pb.HelloReply>;
  sayHelloStreamReply: grpc.handleServerStreamingCall<foo_v1_foo_pb.HelloRequest, foo_v1_foo_pb.HelloReply>;
}

export class GreeterClient extends grpc.Client {
  constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
  sayHello(argument: foo_v1_foo_pb.HelloRequest, callback: grpc.requestCallback<foo_v1_foo_pb.HelloReply>): grpc.ClientUnaryCall;
  sayHello(argument: foo_v1_foo_pb.HelloRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<foo_v1_foo_pb.HelloReply>): grpc.ClientUnaryCall;
  sayHello(argument: foo_v1_foo_pb.HelloRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<foo_v1_foo_pb.HelloReply>): grpc.ClientUnaryCall;
  sayHelloStreamReply(argument: foo_v1_foo_pb.HelloRequest, metadataOrOptions?: grpc.Metadata | grpc.CallOptions | null): grpc.ClientReadableStream<foo_v1_foo_pb.HelloReply>;
  sayHelloStreamReply(argument: foo_v1_foo_pb.HelloRequest, metadata?: grpc.Metadata | null, options?: grpc.CallOptions | null): grpc.ClientReadableStream<foo_v1_foo_pb.HelloReply>;
}
