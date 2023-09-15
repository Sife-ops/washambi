.DEFAULT_GOAL := default

default:
	protoc \
		--go_out=./ \
		--go_opt=paths=source_relative \
		--go-grpc_out=./ \
		--go-grpc_opt=paths=source_relative \
		--proto_path=../../../proto/ \
		../../../proto/shishamo/v1/*.proto \
		../../../proto/blazerxd/v1/*.proto \
		../../../proto/laboof/v1/*.proto \
		../../../proto/aufheben/v1/*.proto
