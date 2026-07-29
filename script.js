// ---------- Reveal-on-scroll ----------
const revealEls = document.querySelectorAll(".reveal");
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 },
);
revealEls.forEach((el) => io.observe(el));

// ---------- Mobile nav toggle ----------
const navToggle = document.getElementById("navToggle");
const navMobile = document.getElementById("navMobile");

function closeMobileNav() {
  if (!navToggle || !navMobile) return;
  navToggle.setAttribute("aria-expanded", "false");
  navMobile.classList.remove("open");
}

if (navToggle && navMobile) {
  navToggle.addEventListener("click", () => {
    const isOpen = navMobile.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  // Close after tapping a link
  navMobile.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMobileNav);
  });

  // Close on outside tap
  document.addEventListener("click", (e) => {
    if (!navMobile.contains(e.target) && !navToggle.contains(e.target)) {
      closeMobileNav();
    }
  });

  // Close on resize back to desktop
  window.addEventListener("resize", () => {
    if (window.innerWidth > 820) closeMobileNav();
  });
}

// ---------- Depth scroll (parallax on the fixed background) ----------
// The background layer is position:fixed, so it naturally stays put while
// content scrolls over it. We add a slow counter-drift + subtle scale so it
// reads as sitting further back in space rather than just static.
const bgFixed = document.querySelector(".bg-fixed");
const orbitWrap = document.querySelector(".orbit-wrap");
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

let ticking = false;

function updateParallax() {
  const y = window.scrollY;

  if (bgFixed) {
    bgFixed.style.transform = `translateY(${y * 0.06}px) scale(1.04)`;
  }
  if (orbitWrap && y < window.innerHeight) {
    orbitWrap.style.transform = `translateY(${y * 0.18}px)`;
  }

  ticking = false;
}

function onScroll() {
  if (!ticking) {
    window.requestAnimationFrame(updateParallax);
    ticking = true;
  }
}

if (!prefersReducedMotion) {
  window.addEventListener("scroll", onScroll, { passive: true });
  updateParallax();
}
