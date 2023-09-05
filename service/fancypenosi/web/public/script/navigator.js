async function main() {
    await fetch(`${fancypenosiUrl}/partial/navigator`, {
        method: "GET",
    })
        .then((x) => x.text())
        .then((x) => {
            document.querySelector("#navigator").innerHTML = x;
        });

    /** @type {HTMLButtonElement} */
    const menuBtn = document.querySelector("#menu-btn");
    /** @type {HTMLElement} */
    const drawer = document.querySelector("#drawer");

    menuBtn.addEventListener("click", function () {
        if (drawer.style.display === "none") {
            drawer.style.display = "block";
        } else {
            drawer.style.display = "none";
        }
    });

    /** @type {HTMLButtonElement} */
    const signOut = document.querySelector("#sign-out");

    signOut.addEventListener("click", async function () {
        const res = await fetch(`${fancypenosiUrl}/sign-out`, {
            method: "POST",
        });
        if (res.ok) {
            // @ts-ignore
            window.fadeTo("/sign-in");
        }
    });
}

main();

export { };
