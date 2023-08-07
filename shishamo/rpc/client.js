import shishamo_grpc_pb from "washambi-rpc/shishamo/v1/shishamo_grpc_pb.js";
import { credentials } from "@grpc/grpc-js";
import { promisify } from "util";

// references:
// https://github.com/grpc/grpc-node/issues/54 // grpc-node issue
// https://github.com/deeplay-io/nice-grpc // possible replacement
// https://gist.github.com/smnbbrv/f147fceb4c29be5ce877b6275018e294 // wrapper example
// https://docs.servicestack.net/grpc/nodejs#node.js-local-development-grpc-ssl-crud-example // wrapper example

/** @type {import("./client.d.ts").promisifyClient} */
function promisifyClient(client) {
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

// todo: move to package
class ClientWrapper {
    async;
    promise;

    /** @param {import("@grpc/grpc-js").Client} client */
    constructor(client) {
        this.async = client
        this.promise = promisifyClient(client);
    }
}

class TestingClient {
    /** @type {import("./client.d.ts").ClientWrapper} */
    client;

    /** @returns {import("./client.d.ts").ClientWrapper} */
    get() {
        if (!this.client) {
            this.client = new ClientWrapper(
                new shishamo_grpc_pb.ShishamoClient(
                    "localhost:50051", // todo: hardcoded
                    credentials.createInsecure(),
                )
            )
        }
        return this.client
    }
}

export const testingClient = new TestingClient();

if (import.meta.vitest) {
    const { test } = import.meta.vitest;

    const client = new shishamo_grpc_pb.ShishamoClient(
        "localhost:50051",
        credentials.createInsecure(),
    );

    test("unit :: rpc client :: promisify client", function() {
        let c = promisifyClient(client);
        console.log(c);
    });
}

