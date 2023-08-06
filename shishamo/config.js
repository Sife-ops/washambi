/** @returns {"local" | "production"} */
export function shishamoStage() {
    const x = process.env.SHISHAMO_STAGE;
    switch (x) {
        case "local": return x;
        case "production": return x;
        // case "integration": return x;
        default: throw new Error("invalid stage: " + x);
    }
}

/** @returns {"postgres-local" | "postgres"} */
export function shishamoDb() {
    const x = process.env.SHISHAMO_DB;
    switch (x) {
        case "postgres": return x;
        case "postgres-local": return x;
        default: {
            switch (shishamoStage()) {
                case "local": return "postgres-local";
                case "production": return "postgres";
                // case "integration": return "sqlite3-memory";
            }
        }
    }
}

// todo: dead code
// /** @returns {boolean} */
// export function jslintMigrate() {
//     const x = process.env.JSLINT_MIGRATE;
//     switch (x) {
//         case "true": return true;
//         case "false": return false;
//         default: {
//             switch (jslintDb()) {
//                 case "sqlite3":
//                 case "postgres": return false;
//                 case "sqlite3-memory": return true;
//             }
//         }
//     }
// }

// /** @returns {boolean} */
// export function jslintSeed() {
//     const x = process.env.JSLINT_SEED;
//     switch (x) {
//         case "true": return true;
//         case "false": return false;
//         default: {
//             switch (jslintDb()) {
//                 case "sqlite3":
//                 case "postgres": return false;
//                 case "sqlite3-memory": return true;
//             }
//         }
//     }
// }

// /** @returns {number} */
// export function shishamoPort() {
//     const x = parseInt(process.env.SHISHAMO_PORT);
//     if (isNaN(x)) {
//         switch (shishamoStage()) {
//             case "local":
//             // case "integration": 
//                 return 3000;
//             case "production": return 80;
//         }
//     } else {
//         return x;
//     }
// }
