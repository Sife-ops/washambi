// package: shishamo.v1
// file: shishamo/v1/shishamo.proto

import * as jspb from "google-protobuf";
import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";

export class User extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getEmail(): string;
  setEmail(value: string): void;

  getPassword(): string;
  setPassword(value: string): void;

  hasCreatedAt(): boolean;
  clearCreatedAt(): void;
  getCreatedAt(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setCreatedAt(value?: google_protobuf_timestamp_pb.Timestamp): void;

  hasDeletedAt(): boolean;
  clearDeletedAt(): void;
  getDeletedAt(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setDeletedAt(value?: google_protobuf_timestamp_pb.Timestamp): void;

  getToken(): string;
  setToken(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): User.AsObject;
  static toObject(includeInstance: boolean, msg: User): User.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: User, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): User;
  static deserializeBinaryFromReader(message: User, reader: jspb.BinaryReader): User;
}

export namespace User {
  export type AsObject = {
    id: string,
    email: string,
    password: string,
    createdAt?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    deletedAt?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    token: string,
  }
}

export class UserCreateRequest extends jspb.Message {
  getEmail(): string;
  setEmail(value: string): void;

  getPassword(): string;
  setPassword(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserCreateRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UserCreateRequest): UserCreateRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UserCreateRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserCreateRequest;
  static deserializeBinaryFromReader(message: UserCreateRequest, reader: jspb.BinaryReader): UserCreateRequest;
}

export namespace UserCreateRequest {
  export type AsObject = {
    email: string,
    password: string,
  }
}

export class UserCreateResponse extends jspb.Message {
  hasUser(): boolean;
  clearUser(): void;
  getUser(): User | undefined;
  setUser(value?: User): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserCreateResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UserCreateResponse): UserCreateResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UserCreateResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserCreateResponse;
  static deserializeBinaryFromReader(message: UserCreateResponse, reader: jspb.BinaryReader): UserCreateResponse;
}

export namespace UserCreateResponse {
  export type AsObject = {
    user?: User.AsObject,
  }
}

export class UserGetOneRequest extends jspb.Message {
  getEmail(): string;
  setEmail(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserGetOneRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UserGetOneRequest): UserGetOneRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UserGetOneRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserGetOneRequest;
  static deserializeBinaryFromReader(message: UserGetOneRequest, reader: jspb.BinaryReader): UserGetOneRequest;
}

export namespace UserGetOneRequest {
  export type AsObject = {
    email: string,
  }
}

export class UserGetOneResponse extends jspb.Message {
  hasUser(): boolean;
  clearUser(): void;
  getUser(): User | undefined;
  setUser(value?: User): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserGetOneResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UserGetOneResponse): UserGetOneResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UserGetOneResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserGetOneResponse;
  static deserializeBinaryFromReader(message: UserGetOneResponse, reader: jspb.BinaryReader): UserGetOneResponse;
}

export namespace UserGetOneResponse {
  export type AsObject = {
    user?: User.AsObject,
  }
}

export class UserChangePasswordRequest extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getPassword(): string;
  setPassword(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserChangePasswordRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UserChangePasswordRequest): UserChangePasswordRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UserChangePasswordRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserChangePasswordRequest;
  static deserializeBinaryFromReader(message: UserChangePasswordRequest, reader: jspb.BinaryReader): UserChangePasswordRequest;
}

export namespace UserChangePasswordRequest {
  export type AsObject = {
    id: string,
    password: string,
  }
}

export class UserChangePasswordResponse extends jspb.Message {
  hasUser(): boolean;
  clearUser(): void;
  getUser(): User | undefined;
  setUser(value?: User): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserChangePasswordResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UserChangePasswordResponse): UserChangePasswordResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UserChangePasswordResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserChangePasswordResponse;
  static deserializeBinaryFromReader(message: UserChangePasswordResponse, reader: jspb.BinaryReader): UserChangePasswordResponse;
}

export namespace UserChangePasswordResponse {
  export type AsObject = {
    user?: User.AsObject,
  }
}

export class UserPurgeRequest extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserPurgeRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UserPurgeRequest): UserPurgeRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UserPurgeRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserPurgeRequest;
  static deserializeBinaryFromReader(message: UserPurgeRequest, reader: jspb.BinaryReader): UserPurgeRequest;
}

export namespace UserPurgeRequest {
  export type AsObject = {
    id: string,
  }
}

export class UserGetTokenRequest extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserGetTokenRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UserGetTokenRequest): UserGetTokenRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UserGetTokenRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserGetTokenRequest;
  static deserializeBinaryFromReader(message: UserGetTokenRequest, reader: jspb.BinaryReader): UserGetTokenRequest;
}

export namespace UserGetTokenRequest {
  export type AsObject = {
    id: string,
  }
}

export class UserGetTokenResponse extends jspb.Message {
  getToken(): string;
  setToken(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserGetTokenResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UserGetTokenResponse): UserGetTokenResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UserGetTokenResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserGetTokenResponse;
  static deserializeBinaryFromReader(message: UserGetTokenResponse, reader: jspb.BinaryReader): UserGetTokenResponse;
}

export namespace UserGetTokenResponse {
  export type AsObject = {
    token: string,
  }
}

export class UserVerifyTokenRequest extends jspb.Message {
  getToken(): string;
  setToken(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserVerifyTokenRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UserVerifyTokenRequest): UserVerifyTokenRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UserVerifyTokenRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserVerifyTokenRequest;
  static deserializeBinaryFromReader(message: UserVerifyTokenRequest, reader: jspb.BinaryReader): UserVerifyTokenRequest;
}

export namespace UserVerifyTokenRequest {
  export type AsObject = {
    token: string,
  }
}

export class UserVerifyTokenResponse extends jspb.Message {
  getVerified(): boolean;
  setVerified(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserVerifyTokenResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UserVerifyTokenResponse): UserVerifyTokenResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UserVerifyTokenResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserVerifyTokenResponse;
  static deserializeBinaryFromReader(message: UserVerifyTokenResponse, reader: jspb.BinaryReader): UserVerifyTokenResponse;
}

export namespace UserVerifyTokenResponse {
  export type AsObject = {
    verified: boolean,
  }
}

export class Domain extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getUserId(): string;
  setUserId(value: string): void;

  getName(): string;
  setName(value: string): void;

  hasCreatedAt(): boolean;
  clearCreatedAt(): void;
  getCreatedAt(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setCreatedAt(value?: google_protobuf_timestamp_pb.Timestamp): void;

  hasDeletedAt(): boolean;
  clearDeletedAt(): void;
  getDeletedAt(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setDeletedAt(value?: google_protobuf_timestamp_pb.Timestamp): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Domain.AsObject;
  static toObject(includeInstance: boolean, msg: Domain): Domain.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Domain, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Domain;
  static deserializeBinaryFromReader(message: Domain, reader: jspb.BinaryReader): Domain;
}

export namespace Domain {
  export type AsObject = {
    id: string,
    userId: string,
    name: string,
    createdAt?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    deletedAt?: google_protobuf_timestamp_pb.Timestamp.AsObject,
  }
}

export class DomainCreateRequest extends jspb.Message {
  getUserId(): string;
  setUserId(value: string): void;

  getName(): string;
  setName(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DomainCreateRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DomainCreateRequest): DomainCreateRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DomainCreateRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DomainCreateRequest;
  static deserializeBinaryFromReader(message: DomainCreateRequest, reader: jspb.BinaryReader): DomainCreateRequest;
}

export namespace DomainCreateRequest {
  export type AsObject = {
    userId: string,
    name: string,
  }
}

export class DomainCreateResponse extends jspb.Message {
  hasDomain(): boolean;
  clearDomain(): void;
  getDomain(): Domain | undefined;
  setDomain(value?: Domain): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DomainCreateResponse.AsObject;
  static toObject(includeInstance: boolean, msg: DomainCreateResponse): DomainCreateResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DomainCreateResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DomainCreateResponse;
  static deserializeBinaryFromReader(message: DomainCreateResponse, reader: jspb.BinaryReader): DomainCreateResponse;
}

export namespace DomainCreateResponse {
  export type AsObject = {
    domain?: Domain.AsObject,
  }
}

export class DomainGetAllRequest extends jspb.Message {
  getUserId(): string;
  setUserId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DomainGetAllRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DomainGetAllRequest): DomainGetAllRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DomainGetAllRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DomainGetAllRequest;
  static deserializeBinaryFromReader(message: DomainGetAllRequest, reader: jspb.BinaryReader): DomainGetAllRequest;
}

export namespace DomainGetAllRequest {
  export type AsObject = {
    userId: string,
  }
}

export class DomainGetAllResponse extends jspb.Message {
  clearDomainsList(): void;
  getDomainsList(): Array<Domain>;
  setDomainsList(value: Array<Domain>): void;
  addDomains(value?: Domain, index?: number): Domain;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DomainGetAllResponse.AsObject;
  static toObject(includeInstance: boolean, msg: DomainGetAllResponse): DomainGetAllResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DomainGetAllResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DomainGetAllResponse;
  static deserializeBinaryFromReader(message: DomainGetAllResponse, reader: jspb.BinaryReader): DomainGetAllResponse;
}

export namespace DomainGetAllResponse {
  export type AsObject = {
    domainsList: Array<Domain.AsObject>,
  }
}

export class DomainGetOneRequest extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DomainGetOneRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DomainGetOneRequest): DomainGetOneRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DomainGetOneRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DomainGetOneRequest;
  static deserializeBinaryFromReader(message: DomainGetOneRequest, reader: jspb.BinaryReader): DomainGetOneRequest;
}

export namespace DomainGetOneRequest {
  export type AsObject = {
    id: string,
  }
}

export class DomainGetOneResponse extends jspb.Message {
  hasDomain(): boolean;
  clearDomain(): void;
  getDomain(): Domain | undefined;
  setDomain(value?: Domain): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DomainGetOneResponse.AsObject;
  static toObject(includeInstance: boolean, msg: DomainGetOneResponse): DomainGetOneResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DomainGetOneResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DomainGetOneResponse;
  static deserializeBinaryFromReader(message: DomainGetOneResponse, reader: jspb.BinaryReader): DomainGetOneResponse;
}

export namespace DomainGetOneResponse {
  export type AsObject = {
    domain?: Domain.AsObject,
  }
}

export class DomainDeleteRequest extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DomainDeleteRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DomainDeleteRequest): DomainDeleteRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DomainDeleteRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DomainDeleteRequest;
  static deserializeBinaryFromReader(message: DomainDeleteRequest, reader: jspb.BinaryReader): DomainDeleteRequest;
}

export namespace DomainDeleteRequest {
  export type AsObject = {
    id: string,
  }
}

export class DomainDeleteResponse extends jspb.Message {
  hasDomain(): boolean;
  clearDomain(): void;
  getDomain(): Domain | undefined;
  setDomain(value?: Domain): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DomainDeleteResponse.AsObject;
  static toObject(includeInstance: boolean, msg: DomainDeleteResponse): DomainDeleteResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DomainDeleteResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DomainDeleteResponse;
  static deserializeBinaryFromReader(message: DomainDeleteResponse, reader: jspb.BinaryReader): DomainDeleteResponse;
}

export namespace DomainDeleteResponse {
  export type AsObject = {
    domain?: Domain.AsObject,
  }
}

export class DomainPurgeRequest extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DomainPurgeRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DomainPurgeRequest): DomainPurgeRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DomainPurgeRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DomainPurgeRequest;
  static deserializeBinaryFromReader(message: DomainPurgeRequest, reader: jspb.BinaryReader): DomainPurgeRequest;
}

export namespace DomainPurgeRequest {
  export type AsObject = {
    id: string,
  }
}

export class DomainPurgeResponse extends jspb.Message {
  hasDomain(): boolean;
  clearDomain(): void;
  getDomain(): Domain | undefined;
  setDomain(value?: Domain): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DomainPurgeResponse.AsObject;
  static toObject(includeInstance: boolean, msg: DomainPurgeResponse): DomainPurgeResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DomainPurgeResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DomainPurgeResponse;
  static deserializeBinaryFromReader(message: DomainPurgeResponse, reader: jspb.BinaryReader): DomainPurgeResponse;
}

export namespace DomainPurgeResponse {
  export type AsObject = {
    domain?: Domain.AsObject,
  }
}

export class Bookmark extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getUserId(): string;
  setUserId(value: string): void;

  getDomainId(): string;
  setDomainId(value: string): void;

  getDescription(): string;
  setDescription(value: string): void;

  getUrl(): string;
  setUrl(value: string): void;

  hasCreatedAt(): boolean;
  clearCreatedAt(): void;
  getCreatedAt(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setCreatedAt(value?: google_protobuf_timestamp_pb.Timestamp): void;

  hasDeletedAt(): boolean;
  clearDeletedAt(): void;
  getDeletedAt(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setDeletedAt(value?: google_protobuf_timestamp_pb.Timestamp): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Bookmark.AsObject;
  static toObject(includeInstance: boolean, msg: Bookmark): Bookmark.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Bookmark, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Bookmark;
  static deserializeBinaryFromReader(message: Bookmark, reader: jspb.BinaryReader): Bookmark;
}

export namespace Bookmark {
  export type AsObject = {
    id: string,
    userId: string,
    domainId: string,
    description: string,
    url: string,
    createdAt?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    deletedAt?: google_protobuf_timestamp_pb.Timestamp.AsObject,
  }
}

export class BookmarkCreateRequest extends jspb.Message {
  getUserId(): string;
  setUserId(value: string): void;

  getDomainId(): string;
  setDomainId(value: string): void;

  getDescription(): string;
  setDescription(value: string): void;

  getUrl(): string;
  setUrl(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BookmarkCreateRequest.AsObject;
  static toObject(includeInstance: boolean, msg: BookmarkCreateRequest): BookmarkCreateRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: BookmarkCreateRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BookmarkCreateRequest;
  static deserializeBinaryFromReader(message: BookmarkCreateRequest, reader: jspb.BinaryReader): BookmarkCreateRequest;
}

export namespace BookmarkCreateRequest {
  export type AsObject = {
    userId: string,
    domainId: string,
    description: string,
    url: string,
  }
}

export class BookmarkCreateResponse extends jspb.Message {
  hasBookmark(): boolean;
  clearBookmark(): void;
  getBookmark(): Bookmark | undefined;
  setBookmark(value?: Bookmark): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BookmarkCreateResponse.AsObject;
  static toObject(includeInstance: boolean, msg: BookmarkCreateResponse): BookmarkCreateResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: BookmarkCreateResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BookmarkCreateResponse;
  static deserializeBinaryFromReader(message: BookmarkCreateResponse, reader: jspb.BinaryReader): BookmarkCreateResponse;
}

export namespace BookmarkCreateResponse {
  export type AsObject = {
    bookmark?: Bookmark.AsObject,
  }
}

export class BookmarkGetAllRequest extends jspb.Message {
  getUserId(): string;
  setUserId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BookmarkGetAllRequest.AsObject;
  static toObject(includeInstance: boolean, msg: BookmarkGetAllRequest): BookmarkGetAllRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: BookmarkGetAllRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BookmarkGetAllRequest;
  static deserializeBinaryFromReader(message: BookmarkGetAllRequest, reader: jspb.BinaryReader): BookmarkGetAllRequest;
}

export namespace BookmarkGetAllRequest {
  export type AsObject = {
    userId: string,
  }
}

export class BookmarkGetAllResponse extends jspb.Message {
  clearBookmarksList(): void;
  getBookmarksList(): Array<Bookmark>;
  setBookmarksList(value: Array<Bookmark>): void;
  addBookmarks(value?: Bookmark, index?: number): Bookmark;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BookmarkGetAllResponse.AsObject;
  static toObject(includeInstance: boolean, msg: BookmarkGetAllResponse): BookmarkGetAllResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: BookmarkGetAllResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BookmarkGetAllResponse;
  static deserializeBinaryFromReader(message: BookmarkGetAllResponse, reader: jspb.BinaryReader): BookmarkGetAllResponse;
}

export namespace BookmarkGetAllResponse {
  export type AsObject = {
    bookmarksList: Array<Bookmark.AsObject>,
  }
}

export class BookmarkGetForDomainRequest extends jspb.Message {
  getUserId(): string;
  setUserId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BookmarkGetForDomainRequest.AsObject;
  static toObject(includeInstance: boolean, msg: BookmarkGetForDomainRequest): BookmarkGetForDomainRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: BookmarkGetForDomainRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BookmarkGetForDomainRequest;
  static deserializeBinaryFromReader(message: BookmarkGetForDomainRequest, reader: jspb.BinaryReader): BookmarkGetForDomainRequest;
}

export namespace BookmarkGetForDomainRequest {
  export type AsObject = {
    userId: string,
  }
}

export class BookmarkGetForDomainResponse extends jspb.Message {
  clearBookmarksList(): void;
  getBookmarksList(): Array<Bookmark>;
  setBookmarksList(value: Array<Bookmark>): void;
  addBookmarks(value?: Bookmark, index?: number): Bookmark;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BookmarkGetForDomainResponse.AsObject;
  static toObject(includeInstance: boolean, msg: BookmarkGetForDomainResponse): BookmarkGetForDomainResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: BookmarkGetForDomainResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BookmarkGetForDomainResponse;
  static deserializeBinaryFromReader(message: BookmarkGetForDomainResponse, reader: jspb.BinaryReader): BookmarkGetForDomainResponse;
}

export namespace BookmarkGetForDomainResponse {
  export type AsObject = {
    bookmarksList: Array<Bookmark.AsObject>,
  }
}

export class BookmarkGetOneRequest extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BookmarkGetOneRequest.AsObject;
  static toObject(includeInstance: boolean, msg: BookmarkGetOneRequest): BookmarkGetOneRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: BookmarkGetOneRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BookmarkGetOneRequest;
  static deserializeBinaryFromReader(message: BookmarkGetOneRequest, reader: jspb.BinaryReader): BookmarkGetOneRequest;
}

export namespace BookmarkGetOneRequest {
  export type AsObject = {
    id: string,
  }
}

export class BookmarkGetOneResponse extends jspb.Message {
  hasBookmark(): boolean;
  clearBookmark(): void;
  getBookmark(): Bookmark | undefined;
  setBookmark(value?: Bookmark): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BookmarkGetOneResponse.AsObject;
  static toObject(includeInstance: boolean, msg: BookmarkGetOneResponse): BookmarkGetOneResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: BookmarkGetOneResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BookmarkGetOneResponse;
  static deserializeBinaryFromReader(message: BookmarkGetOneResponse, reader: jspb.BinaryReader): BookmarkGetOneResponse;
}

export namespace BookmarkGetOneResponse {
  export type AsObject = {
    bookmark?: Bookmark.AsObject,
  }
}

export class BookmarkDeleteRequest extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BookmarkDeleteRequest.AsObject;
  static toObject(includeInstance: boolean, msg: BookmarkDeleteRequest): BookmarkDeleteRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: BookmarkDeleteRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BookmarkDeleteRequest;
  static deserializeBinaryFromReader(message: BookmarkDeleteRequest, reader: jspb.BinaryReader): BookmarkDeleteRequest;
}

export namespace BookmarkDeleteRequest {
  export type AsObject = {
    id: string,
  }
}

export class BookmarkDeleteResponse extends jspb.Message {
  hasBookmark(): boolean;
  clearBookmark(): void;
  getBookmark(): Bookmark | undefined;
  setBookmark(value?: Bookmark): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BookmarkDeleteResponse.AsObject;
  static toObject(includeInstance: boolean, msg: BookmarkDeleteResponse): BookmarkDeleteResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: BookmarkDeleteResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BookmarkDeleteResponse;
  static deserializeBinaryFromReader(message: BookmarkDeleteResponse, reader: jspb.BinaryReader): BookmarkDeleteResponse;
}

export namespace BookmarkDeleteResponse {
  export type AsObject = {
    bookmark?: Bookmark.AsObject,
  }
}

export class BookmarkPurgeRequest extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BookmarkPurgeRequest.AsObject;
  static toObject(includeInstance: boolean, msg: BookmarkPurgeRequest): BookmarkPurgeRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: BookmarkPurgeRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BookmarkPurgeRequest;
  static deserializeBinaryFromReader(message: BookmarkPurgeRequest, reader: jspb.BinaryReader): BookmarkPurgeRequest;
}

export namespace BookmarkPurgeRequest {
  export type AsObject = {
    id: string,
  }
}

export class BookmarkPurgeResponse extends jspb.Message {
  hasBookmark(): boolean;
  clearBookmark(): void;
  getBookmark(): Bookmark | undefined;
  setBookmark(value?: Bookmark): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BookmarkPurgeResponse.AsObject;
  static toObject(includeInstance: boolean, msg: BookmarkPurgeResponse): BookmarkPurgeResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: BookmarkPurgeResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BookmarkPurgeResponse;
  static deserializeBinaryFromReader(message: BookmarkPurgeResponse, reader: jspb.BinaryReader): BookmarkPurgeResponse;
}

export namespace BookmarkPurgeResponse {
  export type AsObject = {
    bookmark?: Bookmark.AsObject,
  }
}

