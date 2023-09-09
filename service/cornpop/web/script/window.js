////////////////////////////////////////////////////////////////////////////////
// page transition

// source: https://stackoverflow.com/questions/47391462/how-to-do-transition-effects-between-two-html-pages

function fadeIn() {
    document.querySelector("body").style.opacity = "1";
}

window.addEventListener("load", fadeIn);
window.addEventListener("pageshow", fadeIn);

window.fadeTo = function (url) {
    document.querySelector("body").style.opacity = "0";
    setTimeout(() => {
        location.href = url;
    }, transitionDuration);
};

////////////////////////////////////////////////////////////////////////////////
// nav

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
    const drawer = document.querySelector("#drawer");
    const isCollapsed = drawer.getAttribute("data-collapsed") === "true";
    if (isCollapsed) {
        expandSection(drawer);
        drawer.setAttribute("data-collapsed", "false");
    } else {
        collapseSection(drawer);
    }
}

window.signOut = function () {
    fetch(`${fancypenosiUrl}/sign-out`, {
        method: "POST",
    }).then(res => {
        if (res.ok) {
            window.fadeTo(`${fancypenosiUrl}/sign-in`);
        }
    })
}

export { };
