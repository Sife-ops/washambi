{
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

    /** @type {HTMLElement} */
    const header = document.querySelector("#header");
    /** @type {HTMLElement} */
    const footer = document.querySelector("#footer");

    /** @type {HTMLElement} */
    const carouselWrapper = document.querySelector("#carousel-wrapper");
    /** @type {HTMLElement} */
    const carousel = document.querySelector("#carousel");

    carouselWrapper.style.height = `calc(100vh - ${header.clientHeight + footer.clientHeight
        }px)`;
    carousel.style.height = `calc(100vh - ${header.clientHeight + footer.clientHeight
        }px)`;
    let carouselState = "first";

    /**
     * @param {HTMLButtonElement} btn
     * @returns {EventListener}
     */
    function goToCarouselItem(btn) {
        return function () {
            for (const contentBtn in contentBtns) {
                if (contentBtn === btn.id) {
                    selectedContentBtns[contentBtn + "-selected"].style.display = "flex";
                    contentBtns[contentBtn].style.display = "none";
                } else {
                    selectedContentBtns[contentBtn + "-selected"].style.display = "none";
                    contentBtns[contentBtn].style.display = "flex";
                }
            }

            switch (btn.id) {
                case "home-btn":
                    carousel.classList.replace(carouselState, "first");
                    carouselState = "first";
                    break;
                case "about-btn":
                    carousel.classList.replace(carouselState, "second");
                    carouselState = "second";
                    break;
                case "contact-btn":
                    carousel.classList.replace(carouselState, "third");
                    carouselState = "third";
                    break;

                default:
                    break;
            }
        };
    }

    for (const contentBtn in contentBtns) {
        contentBtns[contentBtn].addEventListener(
            "click",
            goToCarouselItem(contentBtns[contentBtn])
        );
    }

    /** @type {HTMLButtonElement} */
    const contactNowBtn = document.querySelector("#contact-now");

    contactNowBtn.addEventListener(
        "click",
        goToCarouselItem(contentBtns["contact-btn"])
    );
}
