/** @type {HTMLInputElement} */
let password;
// @ts-ignore
password = document.getElementById("password");

/** @type {HTMLInputElement} */
let confirmPassword;
// @ts-ignore
confirmPassword = document.getElementById("confirm-password");

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
    } else {
        confirmPassword.setCustomValidity("");
    }
}

password.onchange = validate;
confirmPassword.onchange = validate;

// todo: disable button during fetch
document
    .getElementById("sign-up-form")
    .addEventListener("submit", function (event) {
        event.preventDefault();
        console.log(event.target["0"]);
    });
