import ejs from "ejs";

/** @type {import("express").RequestHandler} */
export async function signIn(req, res) {
  const fakeEmail = "email1";
  const fakePass = "pass1";

  if (req.body.email !== fakeEmail || req.body.password !== fakePass) {
    res.send(await ejs.renderFile("./web/partial/sign-in-problem.ejs"));
    return;
  }

  res
    .cookie("tk", "todo", {
      httpOnly: true,
      signed: true,
      maxAge: 15000,
    //   ex
    })
    .send("");

  // res
  //     .setHeader(
  //         "HX-Trigger",
  //         '{"save-token": {"token": "todo", "other": "something"}}'
  //     )
  //     .setHeader("HX-Redirect", "/about")
  //     .send("");
}
