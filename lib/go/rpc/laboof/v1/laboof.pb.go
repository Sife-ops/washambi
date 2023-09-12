// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.31.0
// 	protoc        v4.24.2
// source: laboof/v1/laboof.proto

package laboof

import (
	protoreflect "google.golang.org/protobuf/reflect/protoreflect"
	protoimpl "google.golang.org/protobuf/runtime/protoimpl"
	timestamppb "google.golang.org/protobuf/types/known/timestamppb"
	reflect "reflect"
	sync "sync"
)

const (
	// Verify that this generated code is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(20 - protoimpl.MinVersion)
	// Verify that runtime/protoimpl is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(protoimpl.MaxVersion - 20)
)

type UsersKanbans struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Id        string                 `protobuf:"bytes,1,opt,name=id,proto3" json:"id,omitempty"`
	UserId    string                 `protobuf:"bytes,2,opt,name=user_id,json=userId,proto3" json:"user_id,omitempty"`
	KanbanId  string                 `protobuf:"bytes,3,opt,name=kanban_id,json=kanbanId,proto3" json:"kanban_id,omitempty"`
	Role      string                 `protobuf:"bytes,4,opt,name=role,proto3" json:"role,omitempty"`
	CreatedAt *timestamppb.Timestamp `protobuf:"bytes,5,opt,name=created_at,json=createdAt,proto3" json:"created_at,omitempty"`
	UpdatedAt *timestamppb.Timestamp `protobuf:"bytes,6,opt,name=updated_at,json=updatedAt,proto3" json:"updated_at,omitempty"`
	DeletedAt *timestamppb.Timestamp `protobuf:"bytes,7,opt,name=deleted_at,json=deletedAt,proto3" json:"deleted_at,omitempty"`
}

func (x *UsersKanbans) Reset() {
	*x = UsersKanbans{}
	if protoimpl.UnsafeEnabled {
		mi := &file_laboof_v1_laboof_proto_msgTypes[0]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *UsersKanbans) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*UsersKanbans) ProtoMessage() {}

func (x *UsersKanbans) ProtoReflect() protoreflect.Message {
	mi := &file_laboof_v1_laboof_proto_msgTypes[0]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use UsersKanbans.ProtoReflect.Descriptor instead.
func (*UsersKanbans) Descriptor() ([]byte, []int) {
	return file_laboof_v1_laboof_proto_rawDescGZIP(), []int{0}
}

func (x *UsersKanbans) GetId() string {
	if x != nil {
		return x.Id
	}
	return ""
}

func (x *UsersKanbans) GetUserId() string {
	if x != nil {
		return x.UserId
	}
	return ""
}

func (x *UsersKanbans) GetKanbanId() string {
	if x != nil {
		return x.KanbanId
	}
	return ""
}

func (x *UsersKanbans) GetRole() string {
	if x != nil {
		return x.Role
	}
	return ""
}

func (x *UsersKanbans) GetCreatedAt() *timestamppb.Timestamp {
	if x != nil {
		return x.CreatedAt
	}
	return nil
}

func (x *UsersKanbans) GetUpdatedAt() *timestamppb.Timestamp {
	if x != nil {
		return x.UpdatedAt
	}
	return nil
}

func (x *UsersKanbans) GetDeletedAt() *timestamppb.Timestamp {
	if x != nil {
		return x.DeletedAt
	}
	return nil
}

type Kanban struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Id           string                 `protobuf:"bytes,1,opt,name=id,proto3" json:"id,omitempty"`
	Name         string                 `protobuf:"bytes,2,opt,name=name,proto3" json:"name,omitempty"`
	UsersKanbans *UsersKanbans          `protobuf:"bytes,3,opt,name=usersKanbans,proto3" json:"usersKanbans,omitempty"`
	CreatedAt    *timestamppb.Timestamp `protobuf:"bytes,4,opt,name=created_at,json=createdAt,proto3" json:"created_at,omitempty"`
	UpdatedAt    *timestamppb.Timestamp `protobuf:"bytes,5,opt,name=updated_at,json=updatedAt,proto3" json:"updated_at,omitempty"`
	DeletedAt    *timestamppb.Timestamp `protobuf:"bytes,6,opt,name=deleted_at,json=deletedAt,proto3" json:"deleted_at,omitempty"`
}

func (x *Kanban) Reset() {
	*x = Kanban{}
	if protoimpl.UnsafeEnabled {
		mi := &file_laboof_v1_laboof_proto_msgTypes[1]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *Kanban) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Kanban) ProtoMessage() {}

func (x *Kanban) ProtoReflect() protoreflect.Message {
	mi := &file_laboof_v1_laboof_proto_msgTypes[1]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use Kanban.ProtoReflect.Descriptor instead.
func (*Kanban) Descriptor() ([]byte, []int) {
	return file_laboof_v1_laboof_proto_rawDescGZIP(), []int{1}
}

func (x *Kanban) GetId() string {
	if x != nil {
		return x.Id
	}
	return ""
}

func (x *Kanban) GetName() string {
	if x != nil {
		return x.Name
	}
	return ""
}

func (x *Kanban) GetUsersKanbans() *UsersKanbans {
	if x != nil {
		return x.UsersKanbans
	}
	return nil
}

func (x *Kanban) GetCreatedAt() *timestamppb.Timestamp {
	if x != nil {
		return x.CreatedAt
	}
	return nil
}

func (x *Kanban) GetUpdatedAt() *timestamppb.Timestamp {
	if x != nil {
		return x.UpdatedAt
	}
	return nil
}

func (x *Kanban) GetDeletedAt() *timestamppb.Timestamp {
	if x != nil {
		return x.DeletedAt
	}
	return nil
}

type KanbanCreateRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Name   string `protobuf:"bytes,1,opt,name=name,proto3" json:"name,omitempty"`
	UserId string `protobuf:"bytes,2,opt,name=user_id,json=userId,proto3" json:"user_id,omitempty"`
}

func (x *KanbanCreateRequest) Reset() {
	*x = KanbanCreateRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_laboof_v1_laboof_proto_msgTypes[2]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *KanbanCreateRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*KanbanCreateRequest) ProtoMessage() {}

func (x *KanbanCreateRequest) ProtoReflect() protoreflect.Message {
	mi := &file_laboof_v1_laboof_proto_msgTypes[2]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use KanbanCreateRequest.ProtoReflect.Descriptor instead.
func (*KanbanCreateRequest) Descriptor() ([]byte, []int) {
	return file_laboof_v1_laboof_proto_rawDescGZIP(), []int{2}
}

func (x *KanbanCreateRequest) GetName() string {
	if x != nil {
		return x.Name
	}
	return ""
}

func (x *KanbanCreateRequest) GetUserId() string {
	if x != nil {
		return x.UserId
	}
	return ""
}

type KanbanCreateResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Kanban *Kanban `protobuf:"bytes,1,opt,name=kanban,proto3" json:"kanban,omitempty"`
}

func (x *KanbanCreateResponse) Reset() {
	*x = KanbanCreateResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_laboof_v1_laboof_proto_msgTypes[3]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *KanbanCreateResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*KanbanCreateResponse) ProtoMessage() {}

func (x *KanbanCreateResponse) ProtoReflect() protoreflect.Message {
	mi := &file_laboof_v1_laboof_proto_msgTypes[3]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use KanbanCreateResponse.ProtoReflect.Descriptor instead.
func (*KanbanCreateResponse) Descriptor() ([]byte, []int) {
	return file_laboof_v1_laboof_proto_rawDescGZIP(), []int{3}
}

func (x *KanbanCreateResponse) GetKanban() *Kanban {
	if x != nil {
		return x.Kanban
	}
	return nil
}

type KanbanListRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	UserId string `protobuf:"bytes,1,opt,name=user_id,json=userId,proto3" json:"user_id,omitempty"`
}

func (x *KanbanListRequest) Reset() {
	*x = KanbanListRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_laboof_v1_laboof_proto_msgTypes[4]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *KanbanListRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*KanbanListRequest) ProtoMessage() {}

func (x *KanbanListRequest) ProtoReflect() protoreflect.Message {
	mi := &file_laboof_v1_laboof_proto_msgTypes[4]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use KanbanListRequest.ProtoReflect.Descriptor instead.
func (*KanbanListRequest) Descriptor() ([]byte, []int) {
	return file_laboof_v1_laboof_proto_rawDescGZIP(), []int{4}
}

func (x *KanbanListRequest) GetUserId() string {
	if x != nil {
		return x.UserId
	}
	return ""
}

type KanbanListResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Kanbans []*Kanban `protobuf:"bytes,1,rep,name=kanbans,proto3" json:"kanbans,omitempty"`
}

func (x *KanbanListResponse) Reset() {
	*x = KanbanListResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_laboof_v1_laboof_proto_msgTypes[5]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *KanbanListResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*KanbanListResponse) ProtoMessage() {}

func (x *KanbanListResponse) ProtoReflect() protoreflect.Message {
	mi := &file_laboof_v1_laboof_proto_msgTypes[5]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use KanbanListResponse.ProtoReflect.Descriptor instead.
func (*KanbanListResponse) Descriptor() ([]byte, []int) {
	return file_laboof_v1_laboof_proto_rawDescGZIP(), []int{5}
}

func (x *KanbanListResponse) GetKanbans() []*Kanban {
	if x != nil {
		return x.Kanbans
	}
	return nil
}

var File_laboof_v1_laboof_proto protoreflect.FileDescriptor

var file_laboof_v1_laboof_proto_rawDesc = []byte{
	0x0a, 0x16, 0x6c, 0x61, 0x62, 0x6f, 0x6f, 0x66, 0x2f, 0x76, 0x31, 0x2f, 0x6c, 0x61, 0x62, 0x6f,
	0x6f, 0x66, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x12, 0x09, 0x6c, 0x61, 0x62, 0x6f, 0x6f, 0x66,
	0x2e, 0x76, 0x31, 0x1a, 0x1f, 0x67, 0x6f, 0x6f, 0x67, 0x6c, 0x65, 0x2f, 0x70, 0x72, 0x6f, 0x74,
	0x6f, 0x62, 0x75, 0x66, 0x2f, 0x74, 0x69, 0x6d, 0x65, 0x73, 0x74, 0x61, 0x6d, 0x70, 0x2e, 0x70,
	0x72, 0x6f, 0x74, 0x6f, 0x22, 0x99, 0x02, 0x0a, 0x0c, 0x55, 0x73, 0x65, 0x72, 0x73, 0x4b, 0x61,
	0x6e, 0x62, 0x61, 0x6e, 0x73, 0x12, 0x0e, 0x0a, 0x02, 0x69, 0x64, 0x18, 0x01, 0x20, 0x01, 0x28,
	0x09, 0x52, 0x02, 0x69, 0x64, 0x12, 0x17, 0x0a, 0x07, 0x75, 0x73, 0x65, 0x72, 0x5f, 0x69, 0x64,
	0x18, 0x02, 0x20, 0x01, 0x28, 0x09, 0x52, 0x06, 0x75, 0x73, 0x65, 0x72, 0x49, 0x64, 0x12, 0x1b,
	0x0a, 0x09, 0x6b, 0x61, 0x6e, 0x62, 0x61, 0x6e, 0x5f, 0x69, 0x64, 0x18, 0x03, 0x20, 0x01, 0x28,
	0x09, 0x52, 0x08, 0x6b, 0x61, 0x6e, 0x62, 0x61, 0x6e, 0x49, 0x64, 0x12, 0x12, 0x0a, 0x04, 0x72,
	0x6f, 0x6c, 0x65, 0x18, 0x04, 0x20, 0x01, 0x28, 0x09, 0x52, 0x04, 0x72, 0x6f, 0x6c, 0x65, 0x12,
	0x39, 0x0a, 0x0a, 0x63, 0x72, 0x65, 0x61, 0x74, 0x65, 0x64, 0x5f, 0x61, 0x74, 0x18, 0x05, 0x20,
	0x01, 0x28, 0x0b, 0x32, 0x1a, 0x2e, 0x67, 0x6f, 0x6f, 0x67, 0x6c, 0x65, 0x2e, 0x70, 0x72, 0x6f,
	0x74, 0x6f, 0x62, 0x75, 0x66, 0x2e, 0x54, 0x69, 0x6d, 0x65, 0x73, 0x74, 0x61, 0x6d, 0x70, 0x52,
	0x09, 0x63, 0x72, 0x65, 0x61, 0x74, 0x65, 0x64, 0x41, 0x74, 0x12, 0x39, 0x0a, 0x0a, 0x75, 0x70,
	0x64, 0x61, 0x74, 0x65, 0x64, 0x5f, 0x61, 0x74, 0x18, 0x06, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x1a,
	0x2e, 0x67, 0x6f, 0x6f, 0x67, 0x6c, 0x65, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x62, 0x75, 0x66,
	0x2e, 0x54, 0x69, 0x6d, 0x65, 0x73, 0x74, 0x61, 0x6d, 0x70, 0x52, 0x09, 0x75, 0x70, 0x64, 0x61,
	0x74, 0x65, 0x64, 0x41, 0x74, 0x12, 0x39, 0x0a, 0x0a, 0x64, 0x65, 0x6c, 0x65, 0x74, 0x65, 0x64,
	0x5f, 0x61, 0x74, 0x18, 0x07, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x1a, 0x2e, 0x67, 0x6f, 0x6f, 0x67,
	0x6c, 0x65, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x62, 0x75, 0x66, 0x2e, 0x54, 0x69, 0x6d, 0x65,
	0x73, 0x74, 0x61, 0x6d, 0x70, 0x52, 0x09, 0x64, 0x65, 0x6c, 0x65, 0x74, 0x65, 0x64, 0x41, 0x74,
	0x22, 0x9a, 0x02, 0x0a, 0x06, 0x4b, 0x61, 0x6e, 0x62, 0x61, 0x6e, 0x12, 0x0e, 0x0a, 0x02, 0x69,
	0x64, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x02, 0x69, 0x64, 0x12, 0x12, 0x0a, 0x04, 0x6e,
	0x61, 0x6d, 0x65, 0x18, 0x02, 0x20, 0x01, 0x28, 0x09, 0x52, 0x04, 0x6e, 0x61, 0x6d, 0x65, 0x12,
	0x3b, 0x0a, 0x0c, 0x75, 0x73, 0x65, 0x72, 0x73, 0x4b, 0x61, 0x6e, 0x62, 0x61, 0x6e, 0x73, 0x18,
	0x03, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x17, 0x2e, 0x6c, 0x61, 0x62, 0x6f, 0x6f, 0x66, 0x2e, 0x76,
	0x31, 0x2e, 0x55, 0x73, 0x65, 0x72, 0x73, 0x4b, 0x61, 0x6e, 0x62, 0x61, 0x6e, 0x73, 0x52, 0x0c,
	0x75, 0x73, 0x65, 0x72, 0x73, 0x4b, 0x61, 0x6e, 0x62, 0x61, 0x6e, 0x73, 0x12, 0x39, 0x0a, 0x0a,
	0x63, 0x72, 0x65, 0x61, 0x74, 0x65, 0x64, 0x5f, 0x61, 0x74, 0x18, 0x04, 0x20, 0x01, 0x28, 0x0b,
	0x32, 0x1a, 0x2e, 0x67, 0x6f, 0x6f, 0x67, 0x6c, 0x65, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x62,
	0x75, 0x66, 0x2e, 0x54, 0x69, 0x6d, 0x65, 0x73, 0x74, 0x61, 0x6d, 0x70, 0x52, 0x09, 0x63, 0x72,
	0x65, 0x61, 0x74, 0x65, 0x64, 0x41, 0x74, 0x12, 0x39, 0x0a, 0x0a, 0x75, 0x70, 0x64, 0x61, 0x74,
	0x65, 0x64, 0x5f, 0x61, 0x74, 0x18, 0x05, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x1a, 0x2e, 0x67, 0x6f,
	0x6f, 0x67, 0x6c, 0x65, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x62, 0x75, 0x66, 0x2e, 0x54, 0x69,
	0x6d, 0x65, 0x73, 0x74, 0x61, 0x6d, 0x70, 0x52, 0x09, 0x75, 0x70, 0x64, 0x61, 0x74, 0x65, 0x64,
	0x41, 0x74, 0x12, 0x39, 0x0a, 0x0a, 0x64, 0x65, 0x6c, 0x65, 0x74, 0x65, 0x64, 0x5f, 0x61, 0x74,
	0x18, 0x06, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x1a, 0x2e, 0x67, 0x6f, 0x6f, 0x67, 0x6c, 0x65, 0x2e,
	0x70, 0x72, 0x6f, 0x74, 0x6f, 0x62, 0x75, 0x66, 0x2e, 0x54, 0x69, 0x6d, 0x65, 0x73, 0x74, 0x61,
	0x6d, 0x70, 0x52, 0x09, 0x64, 0x65, 0x6c, 0x65, 0x74, 0x65, 0x64, 0x41, 0x74, 0x22, 0x42, 0x0a,
	0x13, 0x4b, 0x61, 0x6e, 0x62, 0x61, 0x6e, 0x43, 0x72, 0x65, 0x61, 0x74, 0x65, 0x52, 0x65, 0x71,
	0x75, 0x65, 0x73, 0x74, 0x12, 0x12, 0x0a, 0x04, 0x6e, 0x61, 0x6d, 0x65, 0x18, 0x01, 0x20, 0x01,
	0x28, 0x09, 0x52, 0x04, 0x6e, 0x61, 0x6d, 0x65, 0x12, 0x17, 0x0a, 0x07, 0x75, 0x73, 0x65, 0x72,
	0x5f, 0x69, 0x64, 0x18, 0x02, 0x20, 0x01, 0x28, 0x09, 0x52, 0x06, 0x75, 0x73, 0x65, 0x72, 0x49,
	0x64, 0x22, 0x41, 0x0a, 0x14, 0x4b, 0x61, 0x6e, 0x62, 0x61, 0x6e, 0x43, 0x72, 0x65, 0x61, 0x74,
	0x65, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x12, 0x29, 0x0a, 0x06, 0x6b, 0x61, 0x6e,
	0x62, 0x61, 0x6e, 0x18, 0x01, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x11, 0x2e, 0x6c, 0x61, 0x62, 0x6f,
	0x6f, 0x66, 0x2e, 0x76, 0x31, 0x2e, 0x4b, 0x61, 0x6e, 0x62, 0x61, 0x6e, 0x52, 0x06, 0x6b, 0x61,
	0x6e, 0x62, 0x61, 0x6e, 0x22, 0x2c, 0x0a, 0x11, 0x4b, 0x61, 0x6e, 0x62, 0x61, 0x6e, 0x4c, 0x69,
	0x73, 0x74, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x12, 0x17, 0x0a, 0x07, 0x75, 0x73, 0x65,
	0x72, 0x5f, 0x69, 0x64, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x06, 0x75, 0x73, 0x65, 0x72,
	0x49, 0x64, 0x22, 0x41, 0x0a, 0x12, 0x4b, 0x61, 0x6e, 0x62, 0x61, 0x6e, 0x4c, 0x69, 0x73, 0x74,
	0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x12, 0x2b, 0x0a, 0x07, 0x6b, 0x61, 0x6e, 0x62,
	0x61, 0x6e, 0x73, 0x18, 0x01, 0x20, 0x03, 0x28, 0x0b, 0x32, 0x11, 0x2e, 0x6c, 0x61, 0x62, 0x6f,
	0x6f, 0x66, 0x2e, 0x76, 0x31, 0x2e, 0x4b, 0x61, 0x6e, 0x62, 0x61, 0x6e, 0x52, 0x07, 0x6b, 0x61,
	0x6e, 0x62, 0x61, 0x6e, 0x73, 0x32, 0xa4, 0x01, 0x0a, 0x06, 0x4c, 0x61, 0x62, 0x6f, 0x6f, 0x66,
	0x12, 0x4f, 0x0a, 0x0c, 0x4b, 0x61, 0x6e, 0x62, 0x61, 0x6e, 0x43, 0x72, 0x65, 0x61, 0x74, 0x65,
	0x12, 0x1e, 0x2e, 0x6c, 0x61, 0x62, 0x6f, 0x6f, 0x66, 0x2e, 0x76, 0x31, 0x2e, 0x4b, 0x61, 0x6e,
	0x62, 0x61, 0x6e, 0x43, 0x72, 0x65, 0x61, 0x74, 0x65, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74,
	0x1a, 0x1f, 0x2e, 0x6c, 0x61, 0x62, 0x6f, 0x6f, 0x66, 0x2e, 0x76, 0x31, 0x2e, 0x4b, 0x61, 0x6e,
	0x62, 0x61, 0x6e, 0x43, 0x72, 0x65, 0x61, 0x74, 0x65, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73,
	0x65, 0x12, 0x49, 0x0a, 0x0a, 0x4b, 0x61, 0x6e, 0x62, 0x61, 0x6e, 0x4c, 0x69, 0x73, 0x74, 0x12,
	0x1c, 0x2e, 0x6c, 0x61, 0x62, 0x6f, 0x6f, 0x66, 0x2e, 0x76, 0x31, 0x2e, 0x4b, 0x61, 0x6e, 0x62,
	0x61, 0x6e, 0x4c, 0x69, 0x73, 0x74, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x1a, 0x1d, 0x2e,
	0x6c, 0x61, 0x62, 0x6f, 0x6f, 0x66, 0x2e, 0x76, 0x31, 0x2e, 0x4b, 0x61, 0x6e, 0x62, 0x61, 0x6e,
	0x4c, 0x69, 0x73, 0x74, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x42, 0x15, 0x5a, 0x13,
	0x77, 0x61, 0x73, 0x68, 0x61, 0x6d, 0x62, 0x69, 0x2d, 0x72, 0x70, 0x63, 0x2f, 0x6c, 0x61, 0x62,
	0x6f, 0x6f, 0x66, 0x62, 0x06, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x33,
}

var (
	file_laboof_v1_laboof_proto_rawDescOnce sync.Once
	file_laboof_v1_laboof_proto_rawDescData = file_laboof_v1_laboof_proto_rawDesc
)

func file_laboof_v1_laboof_proto_rawDescGZIP() []byte {
	file_laboof_v1_laboof_proto_rawDescOnce.Do(func() {
		file_laboof_v1_laboof_proto_rawDescData = protoimpl.X.CompressGZIP(file_laboof_v1_laboof_proto_rawDescData)
	})
	return file_laboof_v1_laboof_proto_rawDescData
}

var file_laboof_v1_laboof_proto_msgTypes = make([]protoimpl.MessageInfo, 6)
var file_laboof_v1_laboof_proto_goTypes = []interface{}{
	(*UsersKanbans)(nil),          // 0: laboof.v1.UsersKanbans
	(*Kanban)(nil),                // 1: laboof.v1.Kanban
	(*KanbanCreateRequest)(nil),   // 2: laboof.v1.KanbanCreateRequest
	(*KanbanCreateResponse)(nil),  // 3: laboof.v1.KanbanCreateResponse
	(*KanbanListRequest)(nil),     // 4: laboof.v1.KanbanListRequest
	(*KanbanListResponse)(nil),    // 5: laboof.v1.KanbanListResponse
	(*timestamppb.Timestamp)(nil), // 6: google.protobuf.Timestamp
}
var file_laboof_v1_laboof_proto_depIdxs = []int32{
	6,  // 0: laboof.v1.UsersKanbans.created_at:type_name -> google.protobuf.Timestamp
	6,  // 1: laboof.v1.UsersKanbans.updated_at:type_name -> google.protobuf.Timestamp
	6,  // 2: laboof.v1.UsersKanbans.deleted_at:type_name -> google.protobuf.Timestamp
	0,  // 3: laboof.v1.Kanban.usersKanbans:type_name -> laboof.v1.UsersKanbans
	6,  // 4: laboof.v1.Kanban.created_at:type_name -> google.protobuf.Timestamp
	6,  // 5: laboof.v1.Kanban.updated_at:type_name -> google.protobuf.Timestamp
	6,  // 6: laboof.v1.Kanban.deleted_at:type_name -> google.protobuf.Timestamp
	1,  // 7: laboof.v1.KanbanCreateResponse.kanban:type_name -> laboof.v1.Kanban
	1,  // 8: laboof.v1.KanbanListResponse.kanbans:type_name -> laboof.v1.Kanban
	2,  // 9: laboof.v1.Laboof.KanbanCreate:input_type -> laboof.v1.KanbanCreateRequest
	4,  // 10: laboof.v1.Laboof.KanbanList:input_type -> laboof.v1.KanbanListRequest
	3,  // 11: laboof.v1.Laboof.KanbanCreate:output_type -> laboof.v1.KanbanCreateResponse
	5,  // 12: laboof.v1.Laboof.KanbanList:output_type -> laboof.v1.KanbanListResponse
	11, // [11:13] is the sub-list for method output_type
	9,  // [9:11] is the sub-list for method input_type
	9,  // [9:9] is the sub-list for extension type_name
	9,  // [9:9] is the sub-list for extension extendee
	0,  // [0:9] is the sub-list for field type_name
}

func init() { file_laboof_v1_laboof_proto_init() }
func file_laboof_v1_laboof_proto_init() {
	if File_laboof_v1_laboof_proto != nil {
		return
	}
	if !protoimpl.UnsafeEnabled {
		file_laboof_v1_laboof_proto_msgTypes[0].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*UsersKanbans); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_laboof_v1_laboof_proto_msgTypes[1].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*Kanban); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_laboof_v1_laboof_proto_msgTypes[2].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*KanbanCreateRequest); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_laboof_v1_laboof_proto_msgTypes[3].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*KanbanCreateResponse); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_laboof_v1_laboof_proto_msgTypes[4].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*KanbanListRequest); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_laboof_v1_laboof_proto_msgTypes[5].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*KanbanListResponse); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
	}
	type x struct{}
	out := protoimpl.TypeBuilder{
		File: protoimpl.DescBuilder{
			GoPackagePath: reflect.TypeOf(x{}).PkgPath(),
			RawDescriptor: file_laboof_v1_laboof_proto_rawDesc,
			NumEnums:      0,
			NumMessages:   6,
			NumExtensions: 0,
			NumServices:   1,
		},
		GoTypes:           file_laboof_v1_laboof_proto_goTypes,
		DependencyIndexes: file_laboof_v1_laboof_proto_depIdxs,
		MessageInfos:      file_laboof_v1_laboof_proto_msgTypes,
	}.Build()
	File_laboof_v1_laboof_proto = out.File
	file_laboof_v1_laboof_proto_rawDesc = nil
	file_laboof_v1_laboof_proto_goTypes = nil
	file_laboof_v1_laboof_proto_depIdxs = nil
}
