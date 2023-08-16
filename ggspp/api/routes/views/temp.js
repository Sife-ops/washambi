/** @type {import("express").RequestHandler} */
export function temp(_, res) {
    res.render("_page", {
        pageName: "temp",
        options: {},
    });
};


