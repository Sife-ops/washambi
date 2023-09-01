// setTimeout(() => {
document
    .querySelector("#carousel")
    .classList
    .remove("retracted");
// }, 1000);

document
    .querySelector("#focus-second")
    .addEventListener("click", function () {
        document
            .querySelector("#carousel")
            .classList
            .replace("first", "second");
    });

document
    .querySelector("#focus-first")
    .addEventListener("click", function () {
        document
            .querySelector("#carousel")
            .classList
            .replace("second", "first");
    });

////////////////////////////////////////////////////////////////////////////////

/** @type {HTMLInputElement} */
const signUpPassword = document.querySelector("#sign-up-password");
/** @type {HTMLInputElement} */
const confirmPassword = document.querySelector("#confirm-password");

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

        /** @type {HTMLInputElement} */
        const signUpEmail = document.querySelector("#sign-up-email");
        /** @type {HTMLButtonElement} */
        const signUpSubmit = document.querySelector("#sign-up-submit");
        /** @type {HTMLButtonElement} */
        const focusSignIn = document.querySelector("button.focus-sign-in");
        /** @type {HTMLElement} */
        const signUpSuccess = document.querySelector("#sign-up-success");
        /** @type {HTMLElement} */
        const signUpError = document.querySelector("#sign-up-error");
        /** @type {HTMLElement} */
        const signUpErrorText = document.querySelector("#sign-up-error-text");

        signUpEmail.readOnly = true;
        signUpPassword.readOnly = true;
        confirmPassword.readOnly = true;
        signUpSubmit.disabled = true;
        focusSignIn.disabled = true;
        signUpError.style.display = "none";
        signUpSuccess.style.display = "none";
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

            signUpError.style.display = "block";
            switch (res.statusText) {
                case "Conflict":
                    signUpErrorText.innerText = "An account with that e-mail already exists!";
                    break;
                default:
                    signUpErrorText.innerText = "An unkown error occurred. Please try again later.";
                    break;
            }
        }, 1000)
    });

////////////////////////////////////////////////////////////////////////////////
// todo: sign-in
