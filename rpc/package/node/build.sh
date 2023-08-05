#!/bin/bash

# todo: convert to makefile?

IN=../../proto
OUT=./
NPM_BIN="./node_modules/.bin"
PROTOC_BIN="${NPM_BIN}/grpc_tools_node_protoc"
PROTOC_GEN_TS_PATH="${NPM_BIN}/protoc-gen-ts"
PROTOC_GEN_GRPC_PATH="${NPM_BIN}/grpc_tools_node_protoc_plugin"

$PROTOC_BIN \
    --plugin=protoc-gen-grpc=${PROTOC_GEN_GRPC_PATH} \
    --plugin=protoc-gen-ts=${PROTOC_GEN_TS_PATH} \
    --js_out=import_style=commonjs,binary:${OUT} \
    --grpc_out=grpc_js:${OUT} \
    --ts_out=service=grpc-node,mode=grpc-js:${OUT} \
    --proto_path ${IN} \
    ${IN}/shishamo/v1/*.proto \
    ${IN}/foo/v1/*.proto
    # ${IN}/*.proto \

# $PROTOC \
#     -I="./" \
#     --plugin=protoc-gen-ts=$PROTOC_GEN_TS_PATH \
#     --plugin=protoc-gen-grpc=$PROTOC_GEN_GRPC_PATH \
#     --js_out=import_style=commonjs:$OUT_DIR \
#     --grpc_out=grpc_js:$OUT_DIR \
#     --ts_out=service=grpc-node,mode=grpc-js:$TS_OUT_DIR \
#     "$IN_DIR"/*.proto
