import cookieParser from "cookie-parser";
import express from "express";
import { fileURLToPath } from "url";
import { router } from "./router.js"

export function main() {
    const app = express();
    app.set("view engine", "ejs");
    app.set("views", fileURLToPath(new URL("../web/views", import.meta.url)));

    //   app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser("todo: secret"));

    // console.log(
    //     fileURLToPath(new URL("./node_modules/htmx.org/dist", import.meta.url))
    // )

    app.use(
        express.static(
            fileURLToPath(new URL("../node_modules/htmx.org/dist", import.meta.url))
        )
    );
    app.use(express.static(fileURLToPath(new URL("../web/public", import.meta.url))));

    app.use("/", router);
    app.listen(3001); // todo: hardcoded
}
