import express from "express";
import shishamo_pb from "washambi-rpc/shishamo/v1/shishamo_pb.js";
import { client as rpc } from "../rpc/client.js";

const router = express.Router();

router.post("/signup", async function(req, res) {
    try {
        console.log(req.body);
        const rpcReq = new shishamo_pb.UserCreateRequest();
        rpcReq.setEmail(req.body.email);
        rpcReq.setPassword(req.body.password);

        const rpcRes = await rpc.promise.userCreate(rpcReq);
        const user = rpcRes.getUser().toObject()
        delete user.password;

        res.json(user);
    } catch (e) {
        // console.log(e)
        res.json({
            bad: "bad",
        })
    }
});

if (import.meta.vitest) {
    const { test, expect, describe, beforeEach } = import.meta.vitest;

    test("signup", async function() {
        const res = await fetch("http://localhost:3000/signup", {
            method: "POST",
            body: JSON.stringify({
                email: "fancy@penosi.com",
                password: "fancy_penosi123!",
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(x => x.json());
        console.log(res)
    })
}

router.get("/foo", function(_, res) {
    res.json({
        foo: "foo",
    });
});

if (import.meta.vitest) {
    const { test, expect } = import.meta.vitest;

    test("foo", async function() {
        const res = await fetch("http://localhost:3000/foo", {
            method: "GET",
        })
            .then(x => x.json());

        console.log(res);
        expect(res.foo).toBe("foo");
    })
}

export async function main() {
    const app = express();

    app.use(express.json());
    app.use("/", router);

    app.listen(3000); // todo: hardcodes
}


