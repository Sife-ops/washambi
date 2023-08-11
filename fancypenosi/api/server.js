import express from "express";
import { router } from "./router.js";

export async function main() {
    const app = express();

    app.use(express.json());
    app.use("/", router);

    app.listen(3000); // todo: hardcodes
}


