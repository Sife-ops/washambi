/** @type {Record<string, HTMLElement>} */
const contentBlocks = {
    "home-content": document.querySelector("#home-content"),
    "about-content": document.querySelector("#about-content"),
}

/** @type {Record<string, HTMLButtonElement>} */
const contentButtons = {
    "home-btn": document.querySelector("#home-btn"),
    "about-btn": document.querySelector("#about-btn"),
}

for (const contentButton in contentButtons) {
    contentButtons[contentButton].addEventListener("click", function (event) {
        const target = /** @type {HTMLElement} */ (event.target);
        const targetBlock = target.id.split("-")[0] + "-content";

        contentBlocks[targetBlock].style.display = "block";
        for (const contentBlock in contentBlocks) {
            if (contentBlock === targetBlock) continue;
            contentBlocks[contentBlock].style.display = "none";
        }
    })
}
