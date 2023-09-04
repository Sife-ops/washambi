// @ts-ignore
fetch(`${fancyPenosiUrl}/partial/navigator`, {
    method: "GET",
})
    .then((x) => x.text())
    .then((x) => {
        document.querySelector("#navigator").innerHTML = x;
    });

export { };
