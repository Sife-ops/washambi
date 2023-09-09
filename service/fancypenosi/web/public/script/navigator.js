fetch(`${fancypenosiUrl}/partial/navigator`, {
    method: "GET",
    credentials: "include",
})
    .then((x) => x.text())
    .then((x) => {
        document.querySelector("#navigator").innerHTML = x;
    });

// source: https://css-tricks.com/using-css-transitions-auto-dimensions/

/** @param {HTMLElement} element */
function collapseSection(element) {
    const sectionHeight = element.scrollHeight;
    const elementTransition = element.style.transition;
    element.style.transition = "";
    requestAnimationFrame(function () {
        element.style.height = sectionHeight + "px";
        element.style.transition = elementTransition;
        requestAnimationFrame(function () {
            element.style.height = 0 + "px";
        });
    });
    element.setAttribute("data-collapsed", "true");
}

/** @param {HTMLElement} element */
function expandSection(element) {
    const sectionHeight = element.scrollHeight;
    element.style.height = sectionHeight + "px";
    element.addEventListener("transitionend", function t(e) {
        element.removeEventListener("transitionend", t);
    });
    element.setAttribute("data-collapsed", "false");
}

window.toggleNavDrawer = function () {
    /** @type {HTMLElement} */
    const menuBtn = document.querySelector("#menu-btn");
    /** @type {HTMLElement} */
    const drawer = document.querySelector("#drawer");
    const isCollapsed = drawer.getAttribute("data-collapsed") === "true";
    if (isCollapsed) {
        menuBtn.classList.remove("collapsed");
        expandSection(drawer);
        drawer.setAttribute("data-collapsed", "false");
    } else {
        menuBtn.classList.add("collapsed");
        collapseSection(drawer);
    }
}

export { };
