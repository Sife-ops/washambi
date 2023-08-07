import { createLogger, transports, format } from "winston";
import deepmerge from "deepmerge";

const winston = createLogger({
    transports: [
        new transports.Console(),
        new transports.File({ filename: "shishamo.log" }),
    ],
    format: format.combine(
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        // format.errors({ stack: true }),
        // format.splat(),
        format.json()
    ),
})

/**
 *
 * @param {ImportMeta} i
 * @param {string} a
 * @param {object} b
 */
export function log(i, a, b) {
    winston.log(a, deepmerge({
        message: {
            file: i.url,
        }
    }, b))
}
