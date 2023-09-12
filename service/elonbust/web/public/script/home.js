// let view = "kanbans";

/** @type {Record<string, HTMLElement>} */
const views = {
    kanbans: document.querySelector("#kanbans"),
    "new-kanban": document.querySelector("#new-kanban"),
};

window.kanbanFocusView = function (view) {
    for (const v in views) {
        if (v == view) continue;
        views[v].style.display = "none";
    }
    views[view].style.display = "block";
};

window.kanbanCreate = function (event) {
    event.preventDefault();

    /** @type {HTMLInputElement} */
    const name = document.querySelector("#kanban-name");

    fetch(`${elonbustUrl}/kanban-create`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
            name: name.value,
        })
    })
        .then(x => x.text())
        .then(x => {
            /** @type {HTMLElement} */
            const list = document.querySelector("#kanban-list");
            list.innerHTML = list.innerHTML + x;
        });
};

export { };
