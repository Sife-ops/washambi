const boxBtn2 = document.querySelector("#box-btn2");
boxBtn2.addEventListener("click", function () {
    const b = document.querySelector("#test-box");
    b.classList.replace("first", "second")
});

{
    /** @type {Record<string, HTMLElement>} */
    const contentBlocks = {
        "home-content": document.querySelector("#home-content"),
        "about-content": document.querySelector("#about-content"),
        "contact-content": document.querySelector("#contact-content"),
    };

    /** @type {Record<string, HTMLButtonElement>} */
    const contentBtns = {
        "home-btn": document.querySelector("#home-btn"),
        "about-btn": document.querySelector("#about-btn"),
        "contact-btn": document.querySelector("#contact-btn"),
    };

    /** @type {Record<string, HTMLButtonElement>} */
    const selectedContentBtns = {
        "home-btn-selected": document.querySelector("#home-btn-selected"),
        "about-btn-selected": document.querySelector("#about-btn-selected"),
        "contact-btn-selected": document.querySelector("#contact-btn-selected"),
    };

    for (const contentButton in contentBtns) {
        contentBtns[contentButton].addEventListener("click", function (event) {
            const target = /** @type {HTMLButtonElement} */ (event.target);
            const targetBlock = target.id.split("-")[0] + "-content";

            contentBlocks[targetBlock].style.display = "block";
            for (const contentBlock in contentBlocks) {
                if (contentBlock === targetBlock) continue;
                contentBlocks[contentBlock].style.display = "none";
            }

            for (const contentBtn in contentBtns) {
                if (contentBtn === target.id) {
                    selectedContentBtns[contentBtn + "-selected"].style.display = "block";
                    contentBtns[contentBtn].style.display = "none";
                } else {
                    selectedContentBtns[contentBtn + "-selected"].style.display = "none";
                    contentBtns[contentBtn].style.display = "block";
                }
            }
        });
    }
}
