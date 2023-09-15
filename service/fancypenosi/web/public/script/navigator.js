fetch(`${fancypenosiUrl}/partial/navigator`, {
    method: "GET",
    credentials: "include",
})
    .then((x) => x.text())
    .then((x) => {
        /** @type {HTMLElement} */
        const nav = document.querySelector("#navigator");
        nav.innerHTML = x;
        nav.style.opacity = "1";

        document.body.style.paddingTop = `${nav.clientHeight}px`;
    });

export { };
