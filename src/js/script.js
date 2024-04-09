run();

function run() {
    updateCopyrightYear();
    setUpMobileNav();
    setUpSmoothScrolling();
    setUpStickyNavBar();
    // This is no longer needed:
    // checkFlexGap();
}

function updateCopyrightYear() {
    const currentYear = new Date().getFullYear();
    const yearElement = document.querySelector(".year");
    yearElement.textContent = currentYear;
}

function setUpMobileNav() {
    const header = document.querySelector(".header");
    const mobileNavBtn = document.querySelector(".btn-mobile-nav");
    mobileNavBtn.addEventListener("click", () =>
        header.classList.toggle("nav-open")
    );
}

function setUpSmoothScrolling() {
    const allLinks = document.querySelectorAll("a:link");
    allLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            const href = link.getAttribute("href");

            // Scroll back to top
            if (href === "#") {
                window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                });
            }

            // Scroll to other links
            if (href !== "#" && href.startsWith("#")) {
                const sectionEl = document.querySelector(href);
                sectionEl.scrollIntoView({ behavior: "smooth" });
            }

            // Close mobile navigation if it is open
            if (link.classList.contains("main-nav-link")) {
                const header = document.querySelector(".header");
                header.classList.toggle("nav-open");
            }
        });
    });
}

function setUpStickyNavBar() {
    const heroSectionEl = document.querySelector(".section-hero");

    const observer = new IntersectionObserver(
        (entries) => {
            const entry = entries[0];
            console.log(entry);
            if (!entry.isIntersecting) {
                document.body.classList.add("sticky");
            }
            if (entry.isIntersecting) {
                document.body.classList.remove("sticky");
            }
        },
        {
            // null here means viewport
            root: null,

            // Fire the event 80 pixels before the threshold
            // (we set the height of the navbar to 8rem) which corresponds
            // to 80px on normal font-size, we cannot use rem here
            rootMargin: "-80px",

            // Defines when the event fires, the threshold will fire when the element
            // occupies the specified percentage of the root, in this case the
            // viewport, so our event will fire when the hero section occupies
            // 0% of the viewport, i.e. once the hero section has moved out
            // of the viewport
            threshold: 0,
        }
    );
    observer.observe(heroSectionEl);
}

///////////////////////////////////////////////////////////
// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
    var flex = document.createElement("div");
    flex.style.display = "flex";
    flex.style.flexDirection = "column";
    flex.style.rowGap = "1px";

    flex.appendChild(document.createElement("div"));
    flex.appendChild(document.createElement("div"));

    document.body.appendChild(flex);
    var isSupported = flex.scrollHeight === 1;
    flex.parentNode.removeChild(flex);
    console.log(isSupported);

    if (!isSupported) document.body.classList.add("no-flexbox-gap");
}

// https://unpkg.com/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js

/*
.no-flexbox-gap .main-nav-list li:not(:last-child) {
  margin-right: 4.8rem;
}

.no-flexbox-gap .list-item:not(:last-child) {
  margin-bottom: 1.6rem;
}

.no-flexbox-gap .list-icon:not(:last-child) {
  margin-right: 1.6rem;
}

.no-flexbox-gap .delivered-faces {
  margin-right: 1.6rem;
}

.no-flexbox-gap .meal-attribute:not(:last-child) {
  margin-bottom: 2rem;
}

.no-flexbox-gap .meal-icon {
  margin-right: 1.6rem;
}

.no-flexbox-gap .footer-row div:not(:last-child) {
  margin-right: 6.4rem;
}

.no-flexbox-gap .social-links li:not(:last-child) {
  margin-right: 2.4rem;
}

.no-flexbox-gap .footer-nav li:not(:last-child) {
  margin-bottom: 2.4rem;
}

@media (max-width: 75em) {
  .no-flexbox-gap .main-nav-list li:not(:last-child) {
    margin-right: 3.2rem;
  }
}

@media (max-width: 59em) {
  .no-flexbox-gap .main-nav-list li:not(:last-child) {
    margin-right: 0;
    margin-bottom: 4.8rem;
  }
}
*/
