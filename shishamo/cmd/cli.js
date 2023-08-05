import { Command } from "commander";

const cli = new Command();

const opts = cli
    .option("--stage <char>")
    .option("--db <char>")
    .option("--port <number>")
    .parse()
    .opts();

if (opts.stage) {
    process.env.SHISHAMO_STAGE = opts.stage;
}

switch (process.env.SHISHAMO_STAGE) {
    case "local":
    case "production": break;
    // case "integration": return x;
    default: throw new Error("invalid stage: " + process.env.SHISHAMO_STAGE);
}

if (opts.db) {
    process.env.WASHAMBI_DB = opts.db;
} else {
    switch (process.env.SHISHAMO_STAGE) {
        case "local": {
            process.env.WASHAMBI_DB = "postgres-local";
            break;
        }
        case "production": {
            process.env.WASHAMBI_DB = "postgres";
            break;
        }
    }
}

switch (process.env.WASHAMBI_DB) {
    case "postgres":
    case "postgres-local": break;
    default: throw new Error("invalid db: " + process.env.WASHAMBI_DB);
}

// if (opts.port) {
//     process.env.SHISHAMO_PORT = opts.port;
// } else {
//     switch (process.env.SHISHAMO_STAGE) {
//         // case "integration": 
//         case "local":
//             return 3000;
//         case "production": return 80;
//     }
// }
