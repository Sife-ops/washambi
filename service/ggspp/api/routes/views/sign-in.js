/** @type {import("express").RequestHandler} */
export function signIn(_, res) {
    res.render("_page", {
        pageName: "sign-in",
        options: {},
    });
};
