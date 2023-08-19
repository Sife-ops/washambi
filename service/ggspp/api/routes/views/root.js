/** @type {import("express").RequestHandler} */
export function root(_, res) {
    res.render("_page", {
        pageName: "root",
        options: {},
    });
};

