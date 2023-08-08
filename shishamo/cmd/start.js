import "./cli.js";
import {serve} from "../rpc/server.js";

function main() {
    // todo: cool logo
    console.log("starting shishamo");
    serve();
}

main();
