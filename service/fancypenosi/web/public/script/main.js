// todo: move to cornpop

// source: https://stackoverflow.com/questions/47391462/how-to-do-transition-effects-between-two-html-pages
window.addEventListener("load", function () {
    document.querySelector("body").style.opacity = "1";
});

window.fadeTo = function (url) {
    document.querySelector("body").style.opacity = "0";
    setTimeout(() => {
        location.href = url;
    }, transitionDuration);
};

export { };
