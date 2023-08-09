import joi from "joi";
import pg from "pg";
import { NoResultError } from "kysely"
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
 * @param {RpcError | pg.DatabaseError | joi.ValidationError | NoResultError | Error} e
 * @returns {import("@grpc/grpc-js").ServerErrorResponse}
 */
export function toRpcError(e) {
    if (e instanceof RpcError) {
        return e;
    }

    if (e instanceof pg.DatabaseError) {
        const error = new RpcError();
        error.name = error.name + "Database";
        error.message = e.message;
        error.details = e.detail;

        switch (e.code) {
            case "23505":
                error.code = 6;
                break;
            case "22P02":
                error.code = 3;
                break;
            default:
                error.code = 2;
                break;
        }

        return error;
    }

    if (e instanceof joi.ValidationError) {
        const error = new RpcError();
        error.name = error.name + e.name;
        error.message = e.message;
        error.details = e.message;
        error.code = 3;
        return error;
    }

    if (e instanceof NoResultError) {
        const error = new RpcError();
        error.name = error.name + e.name;
        error.message = e.message;
        error.details = e.message;
        error.code = 5;
        return error;
    }

    const error = new RpcError();
    error.name = error.name + e.name;
    error.message = e.message;
    error.details = e.message;
    error.code = 2;
    return error;
}

