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
const password = document.querySelector("#password");
/** @type {HTMLInputElement} */
const confirmPassword = document.querySelector("#confirm-password");

const passwordRegex = new RegExp(
    "^(?=.*[0-9])(?=.*[_!@#$%^&*])[a-zA-Z0-9_!@#$%^&*]{8,32}$"
);

function validate() {
    if (!passwordRegex.test(password.value)) {
        password.setCustomValidity(
            "Must contain number(s) and special character(s)."
        );
    } else {
        password.setCustomValidity("");
    }
    if (password.value != confirmPassword.value) {
        confirmPassword.setCustomValidity("Passwords do not match.");
    } else if (!passwordRegex.test(confirmPassword.value)) {
        confirmPassword.setCustomValidity(
            "Must contain number(s) and special character(s)."
        );
    } else {
        confirmPassword.setCustomValidity("");
    }
}

password.onchange = validate;
confirmPassword.onchange = validate;

document
    .querySelector("#sign-up-form")
    .addEventListener("submit", async function (event) {
        event.preventDefault();

        /** @type {HTMLInputElement} */
        const email = document.querySelector("#email");
        /** @type {HTMLInputElement} */
        const password = document.querySelector("#password");
        /** @type {HTMLInputElement} */
        const confirmPassword = document.querySelector("#confirm-password");
        /** @type {HTMLButtonElement} */
        const submit = document.querySelector("#submit");
        /** @type {HTMLButtonElement} */
        const signIn = document.querySelector("#sign-in");
        /** @type {HTMLElement} */
        const success = document.querySelector("#success");
        /** @type {HTMLElement} */
        const error = document.querySelector("#error");
        /** @type {HTMLElement} */
        const errorText = document.querySelector("#error-text");

        email.readOnly = true;
        password.readOnly = true;
        confirmPassword.readOnly = true;
        submit.disabled = true;
        signIn.disabled = true;
        error.style.display = "none";
        success.style.display = "none";
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
            email.readOnly = false;
            password.readOnly = false;
            confirmPassword.readOnly = false;
            submit.disabled = false;
            signIn.disabled = false;

            if (res.ok) {
                success.style.display = "block";
                setTimeout(function () {
                    document
                        .querySelector("#carousel")
                        .classList
                        .replace("sign-up", "sign-in");
                }, 1000);
                return;
            }

            error.style.display = "block";
            switch (res.statusText) {
                case "Conflict":
                    errorText.innerText = "An account with that e-mail already exists!";
                    break;
                default:
                    errorText.innerText = "An unkown error occurred. Please try again later.";
                    break;
            }
        }, 1000)
    });
