////////////////////////////////////////////////////////////////////////////////
// animate in

/** @type {HTMLElement} */
const fader = document.querySelector("#fader");

/** @type {HTMLElement} */
const carousel = document.querySelector("#carousel");

window.addEventListener("load", function () {
    setTimeout(() => {
        fader.classList.remove("fader-below");

        if (carousel.classList.contains("carousel-sign-in-below")) {
            carousel.classList.replace("carousel-sign-in-below", "carousel-sign-in");
        }
        if (carousel.classList.contains("carousel-sign-up-below")) {
            carousel.classList.replace("carousel-sign-up-below", "carousel-sign-up");
        }
    }, 500);
});

////////////////////////////////////////////////////////////////////////////////
// forms

function initForms() {
    // switch action

    /** @type {HTMLButtonElement} */
    const focusSignUp = document.querySelector("#focus-carousel-sign-up");

    focusSignUp.addEventListener("click", function () {
        /** @type {HTMLElement} */
        const a = document.querySelector("#sign-in-page");
        /** @type {HTMLElement} */
        const b = document.querySelector("#sign-up-page");

        a.style.opacity = "0";
        setTimeout(() => {
            a.style.display = "none";
            b.style.display = "flex";
            setTimeout(() => {
                b.style.opacity = "1";
            }, 10);
        }, 500);

        document
            .querySelector("#carousel")
            .classList.replace("carousel-sign-in", "carousel-sign-up");
    });

    /** @type {HTMLButtonElement} */
    const focusSignIn = document.querySelector("#focus-carousel-sign-in");

    document
        .querySelector("#focus-carousel-sign-in")
        .addEventListener("click", function () {
            /** @type {HTMLElement} */
            const a = document.querySelector("#sign-in-page");
            /** @type {HTMLElement} */
            const b = document.querySelector("#sign-up-page");

            b.style.opacity = "0";
            setTimeout(() => {
                b.style.display = "none";
                a.style.display = "flex";
                setTimeout(() => {
                    a.style.opacity = "1";
                }, 10);
            }, 500);

            document
                .querySelector("#carousel")
                .classList.replace("carousel-sign-up", "carousel-sign-in");
        });

    // sign-in form

    /** @type {HTMLInputElement} */
    const signInEmail = document.querySelector("#sign-in-email");
    /** @type {HTMLInputElement} */
    const signInPassword = document.querySelector("#sign-in-password");
    /** @type {HTMLButtonElement} */
    const signInSubmit = document.querySelector("#sign-in-submit");
    /** @type {HTMLElement} */
    const signInText = document.querySelector("#sign-in-text");
    /** @type {HTMLElement} */
    const signInLoader = document.querySelector("#sign-in-loader");
    /** @type {HTMLElement} */
    const signInSuccess = document.querySelector("#sign-in-success");
    /** @type {HTMLElement} */
    const signInError = document.querySelector("#sign-in-error");
    /** @type {HTMLElement} */
    const signInErrorText = document.querySelector("#sign-in-error-text");

    document
        .querySelector("#sign-in-form")
        .addEventListener("submit", async function (event) {
            event.preventDefault();

            signInEmail.readOnly = true;
            signInPassword.readOnly = true;
            signInSubmit.disabled = true;
            signInText.style.display = "none";
            signInLoader.style.display = "block";
            signInError.style.display = "none";

            const res = await fetch("/sign-in", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: signInEmail.value,
                    password: signInPassword.value,
                })
            })

            // const res = {
            //     ok: true,
            // };

            setTimeout(() => {
                signInLoader.style.display = "none";

                if (res.ok) {
                    signInSuccess.style.display = "block";

                    setTimeout(() => {
                        fader.classList.add("fader-above");

                        carousel.classList.replace(
                            "carousel-sign-in",
                            "carousel-sign-in-above"
                        );
                        document.querySelector("body").style.opacity = "0";

                        setTimeout(() => {
                            location.href = "/account"
                        }, 2000);
                    }, 500);

                    return;
                }

                signInText.style.display = "block";
                signInEmail.readOnly = false;
                signInPassword.readOnly = false;
                signInSubmit.disabled = false;

                switch (res.statusText) {
                    case "Not Found":
                        signInErrorText.innerText = "An account with that e-mail doesn't exist."
                        break;

                    case "Unauthorized":
                        signInErrorText.innerText = "Incorrect password."
                        break;

                    default:
                        signUpErrorText.innerText =
                            "An unkown error occurred. Please try again later.";
                        break;
                }
                signInError.style.display = "block";
            }, 500);
        });

    // sign-up form

    /** @type {HTMLInputElement} */
    const signUpEmail = document.querySelector("#sign-up-email");
    /** @type {HTMLInputElement} */
    const signUpPassword = document.querySelector("#sign-up-password");
    /** @type {HTMLInputElement} */
    const confirmPassword = document.querySelector("#confirm-password");
    /** @type {HTMLButtonElement} */
    const signUpSubmit = document.querySelector("#sign-up-submit");
    /** @type {HTMLElement} */
    const signUpText = document.querySelector("#sign-up-text");
    /** @type {HTMLElement} */
    const signUpLoader = document.querySelector("#sign-up-loader");
    /** @type {HTMLElement} */
    const signUpSuccess = document.querySelector("#sign-up-success");
    /** @type {HTMLElement} */
    const signUpError = document.querySelector("#sign-up-error");
    /** @type {HTMLElement} */
    const signUpErrorText = document.querySelector("#sign-up-error-text");

    const passwordRegex = new RegExp(
        "^(?=.*[0-9])(?=.*[_!@#$%^&*])[a-zA-Z0-9_!@#$%^&*]{8,32}$"
    );

    function validate() {
        if (!passwordRegex.test(signUpPassword.value)) {
            signUpPassword.setCustomValidity(
                "Must contain number(s) and special character(s)."
            );
        } else {
            signUpPassword.setCustomValidity("");
        }
        if (signUpPassword.value != confirmPassword.value) {
            confirmPassword.setCustomValidity("Passwords do not match.");
        } else if (!passwordRegex.test(confirmPassword.value)) {
            confirmPassword.setCustomValidity(
                "Must contain number(s) and special character(s)."
            );
        } else {
            confirmPassword.setCustomValidity("");
        }
    }

    signUpPassword.onchange = validate;
    confirmPassword.onchange = validate;

    document
        .querySelector("#sign-up-form")
        .addEventListener("submit", async function (event) {
            event.preventDefault();

            signUpEmail.readOnly = true;
            signUpPassword.readOnly = true;
            confirmPassword.readOnly = true;
            signUpSubmit.disabled = true;
            signUpText.style.display = "none";
            signUpLoader.style.display = "block";
            signUpError.style.display = "none";

            const res = await fetch("/sign-up", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: signUpEmail.value,
                    password: signUpPassword.value,
                })
            })

            // const res = {
            //     ok: true,
            // };

            setTimeout(function () {
                signUpLoader.style.display = "none";

                if (res.ok) {
                    signUpSuccess.style.display = "block"

                    setTimeout(function () {
                        focusSignIn.click();
                    }, 500);

                    return;
                }

                signUpText.style.display = "block";
                signUpEmail.readOnly = false;
                signUpPassword.readOnly = false;
                confirmPassword.readOnly = false;
                signUpSubmit.disabled = false;

                switch (res.statusText) {
                    case "Conflict":
                        signUpErrorText.innerText =
                            "An account with that e-mail already exists!";
                        break;

                    default:
                        signUpErrorText.innerText =
                            "An unkown error occurred. Please try again later.";
                        break;
                }
                signUpError.style.display = "block";
            }, 500);
        });
}

////////////////////////////////////////////////////////////////////////////////
// responsive

const lg = window.matchMedia("(min-width: 1024px)");

/** @param {MediaQueryListEvent | MediaQueryList} event */
function lgFn(event) {
    // todo: keep input state

    /** @type {HTMLElement} */
    const signInForm = document.querySelector("#sign-in-form");

    const t = signInForm.outerHTML;
    signInForm.outerHTML = "";

    /** @type {HTMLElement} */
    const signUpForm = document.querySelector("#sign-up-form");

    const tt = signUpForm.outerHTML;
    signUpForm.outerHTML = "";

    if (event.matches) {
        carousel.style.display = "flex";
        fader.style.display = "none";

        document.querySelector("#sign-in-window-lg").innerHTML = t;
        document.querySelector("#sign-up-window-lg").innerHTML = tt;
    } else {
        carousel.style.display = "none";
        fader.style.display = "block";

        document.querySelector("#sign-in-window").innerHTML = t;
        document.querySelector("#sign-up-window").innerHTML = tt;
    }

    initForms();
}

lgFn(lg);
lg.addEventListener("change", lgFn);

export { };
