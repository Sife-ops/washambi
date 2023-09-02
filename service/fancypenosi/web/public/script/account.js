/** @type {HTMLElement} */
const carousel = document
    .querySelector("#carousel");

if (carousel.classList.contains("carousel-sign-in-below")) {
    carousel
        .classList
        .replace("carousel-sign-in-below", "carousel-sign-in");
}
if (carousel.classList.contains("carousel-sign-up-below")) {
    carousel
        .classList
        .replace("carousel-sign-up-below", "carousel-sign-up");
}

/** @type {HTMLButtonElement} */
const focusSignUp = document.querySelector("#focus-carousel-sign-up");

focusSignUp
    .addEventListener("click", function () {
        document
            .querySelector("#carousel")
            .classList
            .replace("carousel-sign-in", "carousel-sign-up");
    });

/** @type {HTMLButtonElement} */
const focusSignIn = document.querySelector("#focus-carousel-sign-in");

focusSignIn
    .addEventListener("click", function () {
        document
            .querySelector("#carousel")
            .classList
            .replace("carousel-sign-up", "carousel-sign-in");
    });

////////////////////////////////////////////////////////////////////////////////

/** @type {HTMLInputElement} */
const signUpEmail = document.querySelector("#sign-up-email");
/** @type {HTMLInputElement} */
const signUpPassword = document.querySelector("#sign-up-password");
/** @type {HTMLInputElement} */
const confirmPassword = document.querySelector("#confirm-password");
/** @type {HTMLButtonElement} */
const signUpSubmit = document.querySelector("#sign-up-submit");
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
        focusSignIn.disabled = true;
        signUpSuccess.style.display = "none";
        signUpError.style.display = "none";
        // todo: spinner

        // const res = await fetch("/sign-up", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify({
        //         email: email.value,
        //         password: password.value,
        //     })
        // })
        const res = {
            ok: true
        };

        setTimeout(function () {
            signUpEmail.readOnly = false;
            signUpPassword.readOnly = false;
            confirmPassword.readOnly = false;
            signUpSubmit.disabled = false;
            focusSignIn.disabled = false;

            if (res.ok) {
                signUpSuccess.style.display = "block";
                setTimeout(function () {
                    focusSignIn.click();
                }, 1000);
                return;
            }

            switch (res.statusText) {
                case "Conflict":
                    signUpErrorText.innerText = "An account with that e-mail already exists!";
                    break;
                default:
                    signUpErrorText.innerText = "An unkown error occurred. Please try again later.";
                    break;
            }
            signUpError.style.display = "block";
        }, 1000)
    });

////////////////////////////////////////////////////////////////////////////////

/** @type {HTMLInputElement} */
const signInEmail = document.querySelector("#sign-in-email");
/** @type {HTMLInputElement} */
const signInPassword = document.querySelector("#sign-in-password");
/** @type {HTMLButtonElement} */
const signInSubmit = document.querySelector("#sign-in-submit");
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
        focusSignUp.disabled = true;
        signInSuccess.style.display = "none";
        signInError.style.display = "none";

        // todo: fetch
        const res = {
            ok: true
        }

        setTimeout(() => {
            signInEmail.readOnly = false;
            signInPassword.readOnly = false;
            signInSubmit.disabled = false;
            focusSignUp.disabled = false;

            if (res.ok) {
                signInSuccess.style.display = "block";
                setTimeout(() => {
                    carousel
                        .classList
                        .replace("carousel-sign-in", "carousel-sign-in-above");
                }, 1000);
                return
            }

            switch (res.statusText) {
                case "todo":
                    break;

                default:
                    break;
            }
            signInError.style.display = "block";
        }, 1000);
    })
