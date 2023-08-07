import pg from "pg"; const { DatabaseError } = pg;
import { ShishamoError } from "./shishamo.js"

export class RpcError extends ShishamoError {
    name = this.name + "Rpc::"

    /** @type {string} */
    details;
    /** @type {import("@grpc/grpc-js/build/src/constants.d.ts").Status} */
    code;
}

export class PasswordChangedToEmptyError extends RpcError {
    name = this.name + "PasswordChangedToEmpty";
    message = "cannot change password to empty";

    details = this.message;
    code = 3
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
 * @param {RpcError | import("pg").DatabaseError} e
 * @returns {import("@grpc/grpc-js").ServerErrorResponse}
 */
export function handleRpcError(e) {
    if (e instanceof RpcError) {
        return e;
    }

    if (e instanceof DatabaseError) {
        return databaseToRpcError(e);
    }

    return {
        name: "Unknown",
        code: 2,
        message: "unknown error",
        details: "unknown error"
    }
}

