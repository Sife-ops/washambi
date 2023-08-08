import joi from "joi";
import pg from "pg";
import { ShishamoError } from "./shishamo.js"

export class RpcError extends ShishamoError {
    name = this.name + "Rpc::"
    // message;

    /** @type {string} */
    details;
    /** @type {import("@grpc/grpc-js/build/src/constants.d.ts").Status} */
    code;
}

/**
 * todo: lossy error description?
 * @param {import("joi").ValidationError} e
 * @returns {RpcError}
 */
function validationToRpcError(e) {
    const rpc = new RpcError();
    rpc.name = rpc.name + e.name;
    rpc.message = e.message;
    rpc.details = e.message;
    rpc.code = 3;
    return rpc;
}

/**
 * todo: lossy error description?
 * @param {import("pg").DatabaseError} e
 * @returns {RpcError}
 */
function databaseToRpcError(e) {
    const rpcError = new RpcError();
    rpcError.name = rpcError.name + "Database";
    rpcError.message = e.message;
    rpcError.details = e.detail;

    switch (e.code) {
        case "23505":
            rpcError.code = 6;
            break;
        case "22P02":
            rpcError.code = 5;
            break;
        default:
            rpcError.code = 2;
            break;
    }

    return rpcError;
}

/**
 * @param {RpcError | import("pg").DatabaseError | import("joi").ValidationError} e
 * @returns {import("@grpc/grpc-js").ServerErrorResponse}
 */
export function handleRpcError(e) {
    if (e instanceof RpcError) {
        return e;
    }

    if (e instanceof pg.DatabaseError) {
        return databaseToRpcError(e);
    }

    if (e instanceof joi.ValidationError) {
        return validationToRpcError(e);
    }

    return {
        name: "Unknown",
        code: 2,
        message: "unknown error",
        details: "unknown error"
    }
}

