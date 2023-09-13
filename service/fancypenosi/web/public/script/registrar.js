////////////////////////////////////////////////////////////////////////////////
// animate in

/** @type {HTMLElement} */
const fader = document.querySelector("#fader");
/** @type {HTMLElement} */
const carousel = document.querySelector("#carousel");

function slideIn() {
    fader.classList.remove("fader-below");
    fader.classList.remove("fader-above");

    if (carousel.classList.contains("carousel-sign-in-below")) {
        carousel.classList.replace("carousel-sign-in-below", "carousel-sign-in");
    }
    if (carousel.classList.contains("carousel-sign-up-below")) {
        carousel.classList.replace("carousel-sign-up-below", "carousel-sign-up");
    }
    if (carousel.classList.contains("carousel-sign-in-above")) {
        carousel.classList.replace("carousel-sign-in-above", "carousel-sign-in");
    }
    if (carousel.classList.contains("carousel-sign-up-above")) {
        carousel.classList.replace("carousel-sign-up-above", "carousel-sign-up");
    }
}

window.addEventListener("load", slideIn);
window.addEventListener("pageshow", slideIn);

////////////////////////////////////////////////////////////////////////////////
// validation

// username

window.validateUsername = function (event) {
    const t = /** @type {HTMLInputElement} */ (event.target)
    const l = t.value.length;
    if (l < 8 || l > 32) {
        t.setCustomValidity("Must be 8-32 characters.")
    } else {
        t.setCustomValidity("")
    }
};

// password

/**
 * @param {string} id1
 * @param {string} id2
 */
function validate(id1, id2) {
    const passwordRegex = new RegExp(
        "^(?=.*[0-9])(?=.*[_!@#$%^&*])[a-zA-Z0-9_!@#$%^&*]{8,32}$"
    );

    return function () {
        /** @type {HTMLInputElement} */
        const password1 = document.querySelector(id1);
        /** @type {HTMLInputElement} */
        const password2 = document.querySelector(id2);

        if (!passwordRegex.test(password1.value)) {
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

// todo: autofill causes error
window.validateSignUpPassword = validate("#sign-up-password", "#confirm-password");
window.validateResetPassword = validate("#recovery-password", "#recovery-confirm-password");

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
    const username = document.querySelector("#sign-in-username");
    /** @type {HTMLInputElement} */
    const password = document.querySelector("#sign-in-password");
    /** @type {HTMLButtonElement} */
    const submit = document.querySelector("#sign-in-submit");
    /** @type {HTMLElement} */
    const submitText = document.querySelector("#sign-in-text");
    /** @type {HTMLElement} */
    const submitLoader = document.querySelector("#sign-in-loader");
    /** @type {HTMLElement} */
    const submitSuccess = document.querySelector("#sign-in-success");
    /** @type {HTMLElement} */
    const error = document.querySelector("#sign-in-error");
    /** @type {HTMLElement} */
    const errorText = document.querySelector("#sign-in-error-text");

    submit.disabled = true;
    submitText.style.display = "none";
    submitLoader.style.display = "block";
    error.style.display = "none";

    const res = await fetch("/sign-in", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: username.value,
            password: password.value,
        }),
    });

    setTimeout(() => {
        submitLoader.style.display = "none";

        if (res.ok) {
            submitSuccess.style.display = "block";

            setTimeout(() => {
                fader.classList.add("fader-above");

                carousel.classList.replace(
                    "carousel-sign-in",
                    "carousel-sign-in-above"
                );

                if (referer) {
                    window.fadeTo(referer);
                    return;
                }
                window.fadeTo("/");
            }, 500);

            return;
        }

        submitText.style.display = "block";
        submit.disabled = false;

        switch (res.statusText) {
            case "Not Found":
                errorText.innerText =
                    "An account with that e-mail doesn't exist.";
                break;

            case "Unauthorized":
                errorText.innerText = "Incorrect password.";
                break;

            default:
                errorText.innerText =
                    "An unkown error occurred. Please try again later.";
                break;
        }
        error.style.display = "block";
    }, 500);
};

// sign up

window.signUp = async function (event) {
    event.preventDefault();

    /** @type {HTMLInputElement} */
    const username = document.querySelector("#sign-up-username");
    /** @type {HTMLInputElement} */
    const password = document.querySelector("#sign-up-password");
    /** @type {HTMLSelectElement} */
    const prompt1 = document.querySelector("#security-prompt-1");
    /** @type {HTMLSelectElement} */
    const prompt2 = document.querySelector("#security-prompt-2");
    /** @type {HTMLSelectElement} */
    const prompt3 = document.querySelector("#security-prompt-3");
    /** @type {HTMLInputElement} */
    const answer1 = document.querySelector("#security-answer-1");
    /** @type {HTMLInputElement} */
    const answer2 = document.querySelector("#security-answer-2");
    /** @type {HTMLInputElement} */
    const answer3 = document.querySelector("#security-answer-3");
    /** @type {HTMLButtonElement} */
    const submit = document.querySelector("#sign-up-submit");
    /** @type {HTMLElement} */
    const submitText = document.querySelector("#sign-up-text");
    /** @type {HTMLElement} */
    const submitLoader = document.querySelector("#sign-up-loader");
    /** @type {HTMLElement} */
    const submitSuccess = document.querySelector("#sign-up-success");
    /** @type {HTMLElement} */
    const error = document.querySelector("#sign-up-error");
    /** @type {HTMLElement} */
    const errorText = document.querySelector("#sign-up-error-text");

    submit.disabled = true;
    submitText.style.display = "none";
    submitLoader.style.display = "block";
    error.style.display = "none";

    const res = await fetch("/sign-up", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: username.value,
            password: password.value,
            recoveryPrompt1: prompt1.value,
            recoveryPrompt2: prompt2.value,
            recoveryPrompt3: prompt3.value,
            recoveryAnswer1: answer1.value,
            recoveryAnswer2: answer2.value,
            recoveryAnswer3: answer3.value,
        }),
    });

    setTimeout(function () {
        submitLoader.style.display = "none";

        if (res.ok) {
            submitSuccess.style.display = "block";

            setTimeout(function () {
                window.switchAction("sign-in");
            }, 500);

            return;
        }

        submitText.style.display = "block";
        submit.disabled = false;

        switch (res.statusText) {
            case "Conflict":
                errorText.innerText =
                    "An account with that e-mail already exists!";
                break;

            default:
                errorText.innerText =
                    "An unkown error occurred. Please try again later.";
                break;
        }
        error.style.display = "block";
    }, 500);
};

window.selectPrompt = function (event) {
    /** @type {Record<string, HTMLSelectElement>} */
    const prompts = {
        "security-prompt-1": document.querySelector("#security-prompt-1"),
        "security-prompt-2": document.querySelector("#security-prompt-2"),
        "security-prompt-3": document.querySelector("#security-prompt-3"),
    };
    for (const p in prompts) {
        // @ts-ignore
        if (p === event.target.id) continue;
        // @ts-ignore
        if (prompts[p].value === event.target.value) {
            prompts[p].value = ""
        }
    }
}

// recovery

// todo: transitions
window.recovery1 = async function (event) {
    event.preventDefault();

    /** @type {HTMLElement} */
    const error = document.querySelector("#recovery-error-1");
    error.style.display = "none";

    /** @type {HTMLInputElement} */
    const username = document.querySelector("#recovery-username");
    const req = fetch("/fetch-user", {
        method: "POST",
        body: JSON.stringify({
            username: username.value,
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
    // recoveryUsername = user.username;

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
    const username = document.querySelector("#recovery-username");
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
            username: username.value,
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
}

lgFn(lg);
lg.addEventListener("change", lgFn);

export { };
