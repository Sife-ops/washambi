// source: https://stackoverflow.com/questions/47391462/how-to-do-transition-effects-between-two-html-pages

function fadeIn() {
    document.querySelector("body").style.opacity = "1";
}

window.addEventListener("load", fadeIn);
window.addEventListener("pageshow", fadeIn);

window.fadeTo = function(url) {
    document.querySelector("body").style.opacity = "0";
    setTimeout(() => {
        location.href = url;
    }, transitionDuration);
};

window.signOut = function() {
    fetch("/sign-out", {
        method: "POST",
        credentials: "include",
    }).then(res => {
        if (res.ok) {
            window.fadeTo(`${fancypenosiUrl}/sign-in`);
        }
    })
}

document.body.addEventListener("hx-sign-out", function() {
    window.fadeTo(`${fancypenosiUrl}/sign-in`);
});

export { };
