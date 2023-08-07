import "./cli.js";
import {serve} from "../rpc/server.js";

function main() {
    console.log("starting shishamo");
    serve();
}

main();
