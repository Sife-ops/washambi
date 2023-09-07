////////////////////////////////////////////////////////////////////////////////
// animate in

/** @type {HTMLElement} */
const fader = document.querySelector("#fader");

/** @type {HTMLElement} */
const carousel = document.querySelector("#carousel");

window.addEventListener("load", function () {
    // setTimeout(() => {
    fader.classList.remove("fader-below");
    if (carousel.classList.contains("carousel-sign-in-below")) {
        carousel.classList.replace("carousel-sign-in-below", "carousel-sign-in");
    }
    if (carousel.classList.contains("carousel-sign-up-below")) {
        carousel.classList.replace("carousel-sign-up-below", "carousel-sign-up");
    }
    // }, 500);
});

////////////////////////////////////////////////////////////////////////////////
// forms

// switch action

window.switchAction = function (action) {
    /** @type {Record<string,HTMLElement>} */
    const pages = {
        "sign-in": document.querySelector("#sign-in-page"),
        "sign-up": document.querySelector("#sign-up-page"),
        recovery: document.querySelector("#recovery-page"),
    };

    pages[registrarAction].style.opacity = "0";

    setTimeout(() => {
        for (const p in pages) {
            if (p === action) continue;
            pages[p].style.display = "none";
        }
        pages[action].style.display = "flex";
        setTimeout(() => {
            pages[action].style.opacity = "1";
        }, 10);
    }, 500);

    document
        .querySelector("#carousel")
        .classList.replace(`carousel-${registrarAction}`, `carousel-${action}`);

    registrarAction = action;
};

// sign in

window.signIn = async function (event) {
    event.preventDefault();

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

    signInEmail.readOnly = true;
    signInPassword.readOnly = true;
    signInSubmit.disabled = true;
    signInText.style.display = "none";
    signInLoader.style.display = "block";
    signInError.style.display = "none";

    const res = await fetch("/sign-in", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: signInEmail.value,
            password: signInPassword.value,
        }),
    });

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
                    let redirect = "/";

                    // todo: remove cookie
                    document.cookie.split(";").map((x) => {
                        const y = x.split("=");
                        if (y[0] === "redirect") {
                            redirect = y[1];
                        }
                    });

                    location.href = redirect;
                }, transitionDuration);
            }, 500);

            return;
        }

        signInText.style.display = "block";
        signInEmail.readOnly = false;
        signInPassword.readOnly = false;
        signInSubmit.disabled = false;

        switch (res.statusText) {
            case "Not Found":
                signInErrorText.innerText =
                    "An account with that e-mail doesn't exist.";
                break;

            case "Unauthorized":
                signInErrorText.innerText = "Incorrect password.";
                break;

            default:
                signInErrorText.innerText =
                    "An unkown error occurred. Please try again later.";
                break;
        }
        signInError.style.display = "block";
    }, 500);
};

// sign up

window.signUp = async function (event) {
    event.preventDefault();

    /** @type {HTMLInputElement} */
    const signUpEmail = document.querySelector("#sign-up-email");
    /** @type {HTMLInputElement} */
    const signUpPassword = document.querySelector("#sign-up-password");
    /** @type {HTMLInputElement} */
    const confirmPassword = document.querySelector("#confirm-password");
    /** @type {HTMLInputElement} */
    const recoveryAnswer1 = document.querySelector("#sign-up-answer-1");
    /** @type {HTMLInputElement} */
    const recoveryAnswer2 = document.querySelector("#sign-up-answer-2");
    /** @type {HTMLInputElement} */
    const recoveryAnswer3 = document.querySelector("#sign-up-answer-3");
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

    signUpEmail.readOnly = true;
    signUpPassword.readOnly = true;
    confirmPassword.readOnly = true;
    recoveryAnswer1.readOnly = true;
    recoveryAnswer2.readOnly = true;
    recoveryAnswer3.readOnly = true;
    signUpSubmit.disabled = true;
    signUpText.style.display = "none";
    signUpLoader.style.display = "block";
    signUpError.style.display = "none";

    const res = await fetch("/sign-up", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: signUpEmail.value,
            password: signUpPassword.value,
            recoveryPrompt1: "favorite book",
            recoveryPrompt2: "favorite movie",
            recoveryPrompt3: "favorite food",
            recoveryAnswer1: recoveryAnswer1.value,
            recoveryAnswer2: recoveryAnswer2.value,
            recoveryAnswer3: recoveryAnswer3.value,
        }),
    });

    setTimeout(function () {
        signUpLoader.style.display = "none";

        if (res.ok) {
            signUpSuccess.style.display = "block";

            setTimeout(function () {
                window.switchAction("sign-in");
            }, 500);

            return;
        }

        signUpText.style.display = "block";
        signUpEmail.readOnly = false;
        signUpPassword.readOnly = false;
        confirmPassword.readOnly = false;
        recoveryAnswer1.readOnly = false;
        recoveryAnswer2.readOnly = false;
        recoveryAnswer3.readOnly = false;
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
};

// recovery

// let recoveryEmail = ""

// todo: transitions
window.recovery1 = async function (event) {
    event.preventDefault();

    /** @type {HTMLElement} */
    const error = document.querySelector("#recovery-error-1");
    error.style.display = "none";

    /** @type {HTMLInputElement} */
    const email = document.querySelector("#recovery-email");
    const req = fetch("/fetch-user", {
        method: "POST",
        body: JSON.stringify({
            email: email.value,
        }),
    });

    /** @type {HTMLElement} */
    const text = document.querySelector("#recovery-submit-1-text");
    text.style.display = "none";
    /** @type {HTMLElement} */
    const loader = document.querySelector("#recovery-submit-1-loader");
    loader.style.display = "block";

    const res = await req;
    loader.style.display = "none";
    text.style.display = "block";

    if (!res.ok) {
        /** @type {HTMLElement} */
        const errorText = document.querySelector("#recovery-error-1-text");
        switch (res.statusText) {
            case "Not Found":
                errorText.innerText = "An account with that e-mail doesn't exist.";
                break;
            default:
                errorText.innerText =
                    "An unkown error occurred. Please try again later.";
                break;
        }
        error.style.display = "block";
        return;
    }

    const user = await res.json();
    // recoveryEmail = user.email;

    /** @type {HTMLElement} */
    const prompt1 = document.querySelector("#recovery-prompt-1");
    prompt1.innerText = user.recoveryPrompt1 + ":";
    /** @type {HTMLElement} */
    const prompt2 = document.querySelector("#recovery-prompt-2");
    prompt2.innerText = user.recoveryPrompt2 + ":";
    /** @type {HTMLElement} */
    const prompt3 = document.querySelector("#recovery-prompt-3");
    prompt3.innerText = user.recoveryPrompt3 + ":";

    /** @type {HTMLElement} */
    const form1 = document.querySelector("#recovery-form-1");
    form1.style.display = "none";
    /** @type {HTMLElement} */
    const form2 = document.querySelector("#recovery-form-2");
    form2.style.display = "flex";
};

window.recovery2 = async function (event) {
    event.preventDefault();

    /** @type {HTMLElement} */
    const error = document.querySelector("#recovery-error-2");
    error.style.display = "none";

    /** @type {HTMLInputElement} */
    const email = document.querySelector("#recovery-email");
    /** @type {HTMLInputElement} */
    const answer1 = document.querySelector("#recovery-answer-1");
    /** @type {HTMLInputElement} */
    const answer2 = document.querySelector("#recovery-answer-2");
    /** @type {HTMLInputElement} */
    const answer3 = document.querySelector("#recovery-answer-3");
    /** @type {HTMLInputElement} */
    const password = document.querySelector("#recovery-password");

    const req = fetch("/reset-password", {
        method: "POST",
        body: JSON.stringify({
            email: email.value,
            recoveryAnswer1: answer1.value,
            recoveryAnswer2: answer2.value,
            recoveryAnswer3: answer3.value,
            password: password.value,
        }),
    });

    /** @type {HTMLElement} */
    const text = document.querySelector("#recovery-submit-2-text");
    text.style.display = "none";
    /** @type {HTMLElement} */
    const loader = document.querySelector("#recovery-submit-2-loader");
    loader.style.display = "block";

    const res = await req;
    loader.style.display = "none";

    if (!res.ok) {
        text.style.display = "block";

        /** @type {HTMLElement} */
        const errorText = document.querySelector("#recovery-error-2-text");
        const errorRes = await res.text();
        switch (errorRes.trim()) {
            case "incorrect answer".trim():
                errorText.innerText =
                    "Incorrect answer to one or more security question(s).";
                break;
            default:
                errorText.innerText =
                    "An unkown error occurred. Please try again later.";
                break;
        }

        error.style.display = "block";
        return;
    }

    /** @type {HTMLElement} */
    const success = document.querySelector("#recovery-submit-2-success");
    success.style.display = "block";

    setTimeout(function () {
        window.switchAction("sign-in");
    }, 2000);
};

////////////////////////////////////////////////////////////////////////////////
// responsive

/**
 * @param {HTMLInputElement} password1
 * @param {HTMLInputElement} password2
 */
function validate(password1, password2) {
    const passwordRegex = new RegExp(
        "^(?=.*[0-9])(?=.*[_!@#$%^&*])[a-zA-Z0-9_!@#$%^&*]{8,32}$"
    );

    return function () {
        if (!passwordRegex.test(password1.value)) {
            console.log("yeah");
            password1.setCustomValidity(
                "Must contain number(s) and special character(s)."
            );
        } else {
            password1.setCustomValidity("");
        }
        if (password1.value != password2.value) {
            password2.setCustomValidity("Passwords do not match.");
        } else if (!passwordRegex.test(password2.value)) {
            password2.setCustomValidity(
                "Must contain number(s) and special character(s)."
            );
        } else {
            password2.setCustomValidity("");
        }
    };
}

/**
 * @param {HTMLElement} src
 * @param {HTMLElement} dest
 */
function moveInnerHtml(src, dest) {
    if (src.innerHTML.trim().length > 0) {
        dest.innerHTML = src.innerHTML;
        src.innerHTML = "";
    }
}

const lg = window.matchMedia("(min-width: 1024px)");

/** @param {MediaQueryListEvent | MediaQueryList} event */
function lgFn(event) {
    // todo: keep input state

    /** @type {HTMLElement} */
    const signInWindowLg = document.querySelector("#sign-in-window-lg");
    /** @type {HTMLElement} */
    const signInWindow = document.querySelector("#sign-in-window");

    /** @type {HTMLElement} */
    const signUpWindowLg = document.querySelector("#sign-up-window-lg");
    /** @type {HTMLElement} */
    const signUpWindow = document.querySelector("#sign-up-window");

    /** @type {HTMLElement} */
    const recoveryWindowLg = document.querySelector("#recovery-window-lg");
    /** @type {HTMLElement} */
    const recoveryWindow = document.querySelector("#recovery-window");

    if (event.matches) {
        carousel.style.display = "flex";
        fader.style.display = "none";

        moveInnerHtml(signInWindow, signInWindowLg);
        moveInnerHtml(signUpWindow, signUpWindowLg);
        moveInnerHtml(recoveryWindow, recoveryWindowLg);
    } else {
        carousel.style.display = "none";
        fader.style.display = "block";

        moveInnerHtml(signInWindowLg, signInWindow);
        moveInnerHtml(signUpWindowLg, signUpWindow);
        moveInnerHtml(recoveryWindowLg, recoveryWindow);
    }

    /** @type {HTMLInputElement} */
    const signUpPassword = document.querySelector("#sign-up-password");
    /** @type {HTMLInputElement} */
    const confirmPassword = document.querySelector("#confirm-password");

    signUpPassword.onchange = validate(signUpPassword, confirmPassword);
    confirmPassword.onchange = validate(signUpPassword, confirmPassword);

    /** @type {HTMLInputElement} */
    const recoveryPassword = document.querySelector("#recovery-password");
    /** @type {HTMLInputElement} */
    const recoveryConfirmPassword = document.querySelector(
        "#recovery-confirm-password"
    );

    recoveryPassword.onchange = validate(
        recoveryPassword,
        recoveryConfirmPassword
    );
    recoveryConfirmPassword.onchange = validate(
        recoveryPassword,
        recoveryConfirmPassword
    );
}

lgFn(lg);
lg.addEventListener("change", lgFn);

export { };
