/** @type {import("express").RequestHandler} */
export function signUp(_, res) {
    res.render("_page", {
        pageName: "sign-up",
        options: {},
    });
};
