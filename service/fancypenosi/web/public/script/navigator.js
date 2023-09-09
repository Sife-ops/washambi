fetch(`${fancypenosiUrl}/partial/navigator`, {
    method: "GET",
    credentials: "include",
})
    .then((x) => x.text())
    .then((x) => {
        document.querySelector("#navigator").innerHTML = x;
    });

export { };
