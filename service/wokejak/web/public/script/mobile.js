{
    /** @type {HTMLElement} */
    const header = document.querySelector("#header");

    /** @type {HTMLElement} */
    const content = document.querySelector("#content");
    /** @type {HTMLElement} */
    const home = document.querySelector("#home");
    /** @type {HTMLElement} */
    const about = document.querySelector("#about");
    /** @type {HTMLElement} */
    const contact = document.querySelector("#contact");

    content.style.paddingTop = `${header.clientHeight}px`;
    home.style.height = `calc(100vh - ${header.clientHeight}px)`;
    about.style.height = `calc(100vh - ${header.clientHeight}px)`;
    contact.style.height = `calc(100vh - ${header.clientHeight}px)`;
}
