//Setting current year in footer:
const yearEl = document.querySelector(".year");
const currentYear = new Date().getFullYear();

yearEl.textContent = currentYear;
console.log(currentYear);

// Make Mobile Navigation works:
const headerEl = document.querySelector(".header");
const btnMobileNav = document.querySelector(".main-nav-mobile-btn");

btnMobileNav.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
});

//Smooth Scrolling

const allLinks = document.querySelectorAll("a:link");

allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const href = link.getAttribute("href");

    //scroll to the top:
    if (href === "#") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }

    //scrolling other related sections:
    if (href !== "#" && href.startsWith("#")) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: "smooth" });
    }

    //closing mobile navigation:
    if (link.classList.contains("main-nav-link")) {
      headerEl.classList.toggle("nav-open");
    }
  });
});

//Sticky Navigation:
const sectionHeroEl = document.querySelector(".section-hero");

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    console.log(ent);
    if (!ent.isIntersecting) {
      document.body.classList.add("sticky");
    }
    if (ent.isIntersecting) {
      document.body.classList.remove("sticky");
    }
  },
  {
    //in the viewport:
    root: null,
    threshold: 0,
    rootMargin: "-80px",
  }
);

/*
-This means hero-section still intersecting with the viewport.When it disappears,
isIntersecting will be false.That's our condition to showing sticky navbar.

IntersectionObserverEntry {time: 359, rootBounds: DOMRectReadOnly, boundingClientRect: DOMRectReadOnly, intersectionRect: DOMRectReadOnly, isIntersecting: true, …}
    boundingClientRect: DOMRectReadOnly {x: 0, y: -499, width: 1349, height: 708.28125, top: -499, …}
    intersectionRatio: 0.29547762870788574
    intersectionRect: DOMRectReadOnly {x: 0, y: 0, width: 1349, height: 209.28125, top: 0, …}
    isIntersecting: true
    isVisible: false
    rootBounds: DOMRectReadOnly {x: 0, y: 0, width: 1349, height: 446, top: 0, …}
    target: section.section-hero
    time: 359
    [[Prototype]]: IntersectionObserverEntry
*/
obs.observe(sectionHeroEl);
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
checkFlexGap();

// https://unpkg.com/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js
