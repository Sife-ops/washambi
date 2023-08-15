import argon2 from "argon2";
import joi from "joi";
import shishamo_pb from "washambi-rpc/shishamo/v1/shishamo_pb.js";
import { client as rpc } from "../../rpc/client.js";

class IncorrectPasswordError extends Error { };

/**
 * @param {Error & {code: number} | joi.ValidationError} e
 * @param {import("express").Response} res
 */
function toHttpError(e, res) {
    if (e instanceof joi.ValidationError) {
        res.status(400).json(e);
        return;
    }

    if (e instanceof IncorrectPasswordError) {
        res.status(401).json(e);
        return;
    }

    // todo: find actual class
    if (e.code) {
        switch (e.code) {
            // already exists
            case 6: {
                res.status(409).json(e);
                return;
            }

            // no result
            case 5: {
                res.status(401).json(e);
                return;
            }
        }
    }

    res.status(500).json(e)
}


/** @type {import("express").RequestHandler<{}, shishamo_pb.User.AsObject, {email: string, password: string}>} */
export async function signUp(req, res) {
    try {
        await joi.string().email().validateAsync(req.body.email);
        const passwordRegex = new RegExp("^(?=.*[0-9])(?=.*[_!@#$%^&*])[a-zA-Z0-9_!@#$%^&*]{8,32}$");
        await joi.string().regex(passwordRegex).validateAsync(req.body.password);

        // console.log(req.body);
        const rpcReq = new shishamo_pb.UserCreateRequest();
        rpcReq.setEmail(req.body.email);
        // todo: perform hash on shishamo
        const hashed = await argon2.hash(req.body.password);
        // console.log(hashed);
        rpcReq.setPassword(hashed);

        const rpcRes = await rpc.promise.userCreate(rpcReq);
        const user = rpcRes.getUser().toObject()
        delete user.password;

        res.json(user);
    } catch (e) {
        // console.log(e);
        toHttpError(e, res);
    }
};

const testUserTemplate = {
    email: "fancy@penosi.com",
    password: "fancy_penosi123!",
}

/** @return {Promise<shishamo_pb.UserCreateResponse>} */
async function createTestUser() {
    const req = new shishamo_pb.UserCreateRequest();
    req.setEmail(testUserTemplate.email);
    req.setPassword(await argon2.hash(testUserTemplate.password));
    return await rpc.promise.userCreate(req);
}

async function purgeTestUser() {
    try {
        const req = new shishamo_pb.UserGetOneRequest();
        req.setEmail(testUserTemplate.email);
        const res = await rpc.promise.userGetOne(req);
        {
            const req = new shishamo_pb.UserPurgeRequest();
            req.setId(res.getUser().getId())
            await rpc.promise.userPurge(req);
        }
    } catch { }
}

if (import.meta.vitest) {
    const { test, expect, describe, beforeEach } = import.meta.vitest;

    /** @param {object} body */
    function signupReq(body) {
        return fetch("http://localhost:3000/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
    }

    describe("int :: signup", function() {
        beforeEach(async function() {
            await purgeTestUser();
            return purgeTestUser;
        });

        test("success", async function() {
            const res = await signupReq(testUserTemplate).then(x => x.json());
            expect(res.email).toBe(testUserTemplate.email);
        });

        test("invalid email", async function() {
            const res = await signupReq({
                ...testUserTemplate,
                email: "lol",
            })
            expect(res.status).toBe(400);
        });

        test("invalid password", async function() {
            const res = await signupReq({
                ...testUserTemplate,
                password: "lol",
            })
            expect(res.status).toBe(400);
        });

        test("duplicate user error", async function() {
            await createTestUser();
            const res = await signupReq(testUserTemplate);
            expect(res.status).toBe(409);
        });
    });
}

/** @type {import("express").RequestHandler<{}, {t: string}, {email: string, password: string}>} */
export async function signIn(req, res) {
    try {
        const rpcReq = new shishamo_pb.UserGetOneRequest()
        rpcReq.setEmail(req.body.email);

        const rpcRes = await rpc.promise.userGetOne(rpcReq);

        // console.log(rpcRes.getUser().toObject())
        const ver = await argon2.verify(rpcRes.getUser().getPassword(), req.body.password);
        if (!ver) throw new IncorrectPasswordError("incorrect password");

        res.json({ t: rpcRes.getUser().getToken() })
    } catch (e) {
        // console.log(e)
        toHttpError(e, res);
    }
};

if (import.meta.vitest) {
    const { test, expect, describe, beforeAll } = import.meta.vitest;

    /** @param {object} body */
    function signinReq(body) {
        return fetch("http://localhost:3000/signin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });
    }

    describe("int :: signin", function() {
        beforeAll(async function() {
            await purgeTestUser();
            await createTestUser();
            return purgeTestUser;
        });

        test("success", async function() {
            const res = await signinReq(testUserTemplate);
            // console.log(res.status)
            // console.log(await res.json())
            expect(res.status).toBe(200);
        });

        test("incorrect password", async function() {
            const res = await signinReq({
                ...testUserTemplate,
                password: "lol"
            });
            // console.log(a.status)
            expect(res.status).toBe(401);
        });

        test("incorrect email", async function() {
            const res = await signinReq({
                ...testUserTemplate,
                email: "some@guy.com"
            });
            // console.log(res.status)
            // console.log(await res.json())
            expect(res.status).toBe(401);
        });
    });
}

