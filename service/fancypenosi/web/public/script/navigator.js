async function main() {
    await fetch(`${fancypenosiUrl}/partial/navigator`, {
        method: "GET",
        credentials: "include",
    })
        .then((x) => x.text())
        .then((x) => {
            document.querySelector("#navigator").innerHTML = x;
        });

    /** @type {HTMLButtonElement} */
    const menuBtn = document.querySelector("#menu-btn");
    /** @type {HTMLElement} */
    const drawer = document.querySelector("#drawer");

    menuBtn.addEventListener("click", function() {
        let d = drawer.style.display;
        if (d != "flex") {
            drawer.style.display = "flex";
        } else {
            drawer.style.display = "none";
        }
    });

    /** @type {HTMLButtonElement} */
    const signOut = document.querySelector("#sign-out");

    signOut.addEventListener("click", async function() {
        const res = await fetch(`${fancypenosiUrl}/sign-out`, {
            method: "POST",
        });
        if (res.ok) {
            window.fadeTo(`${fancypenosiUrl}/sign-in`);
        }
    });
}

main();

export { };
