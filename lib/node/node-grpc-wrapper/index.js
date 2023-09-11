import { promisify } from "util";

// references:
// https://github.com/grpc/grpc-node/issues/54 // grpc-node issue
// https://github.com/deeplay-io/nice-grpc // possible replacement
// https://gist.github.com/smnbbrv/f147fceb4c29be5ce877b6275018e294 // wrapper example
// https://docs.servicestack.net/grpc/nodejs#node.js-local-development-grpc-ssl-crud-example // wrapper example

/** @type {import("./index.d.ts").promisifyClient} */
export function promisifyClient(client) {
    // todo: cringerino
    // @ts-ignore
    return Object.getOwnPropertyNames(Object.getPrototypeOf(client)).reduce(
        function(acc, cur) {
            if (typeof client[cur] != "function" || cur === "constructor") return acc;
            acc[cur] = promisify(client[cur].bind(client));
            return acc;
        },
        { ...client }
    );
}

export class ClientWrapper {
    async;
    promise;

    /** @param {import("@grpc/grpc-js").Client} client */
    constructor(client) {
        this.async = client
        this.promise = promisifyClient(client);
    }
}
