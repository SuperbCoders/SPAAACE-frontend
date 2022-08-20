document.addEventListener("DOMContentLoaded", function () {
  // height 100vh fix for IOS
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);

  // resize
  window.addEventListener("resize", () => {
    let vh = window.innerHeight * 0.01;

    document.documentElement.style.setProperty("--vh", `${vh}px`);
  });

  // inputmask
  Inputmask().mask(document.querySelectorAll("input"));

  // textarea
  document.querySelectorAll("textarea").forEach((el) => {
    el.style.height = el.setAttribute(
      "style",
      "height: " + el.scrollHeight + "px",
    );
    el.classList.add("auto");
    el.addEventListener("input", (e) => {
      el.style.height = "auto";
      el.style.height = el.scrollHeight + "px";
    });
  });

  // mobile menu
  const hamburger = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileMenuClose = document.querySelector(".mobile-menu__close");

  if (hamburger && mobileMenu && mobileMenuClose) {
    hamburger.addEventListener("click", (event) => {
      event.preventDefault();

      mobileMenu.classList.add("mobile-menu--active");
      document.body.classList.add("scroll-disabled");
    });

    mobileMenuClose.addEventListener("click", (event) => {
      event.preventDefault();

      mobileMenu.classList.remove("mobile-menu--active");
      document.body.classList.remove("scroll-disabled");
    });
  }

  // on hover view
  const onHoverLink = document.querySelectorAll(".on-hover");

  if (onHoverLink) {
    onHoverLink.forEach((item, i) => {
      item.addEventListener("mouseover", () => {
        document
          .querySelectorAll(".on-hover-view")
          .forEach((child) => child.classList.remove("active"));
        document.querySelectorAll(".on-hover-view")[i].classList.add("active");
      });

      item.addEventListener("mouseout", () => {
        document
          .querySelectorAll(".on-hover-view")
          .forEach((child) => child.classList.remove("active"));
      });
    });
  }

  // header & logo change colors on intersecting black & white sections
  const header = document.getElementById("header");
  const logo = document.getElementById("fixed-logotype");
  const sections = [...document.querySelectorAll("[data-section]")];
  const scrollRoot = document.querySelector("[data-scroller]");

  let prevYPosition = 0;
  let direction = "up";

  const options = {
    root: scrollRoot,
    rootMargin: `${header.offsetHeight * -1}px`,
    threshold: 0,
  };

  const getTargetSection = (entry) => {
    const index = sections.findIndex((section) => section == entry.target);

    if (index >= sections.length - 1) {
      return entry.target;
    } else {
      return sections[index + 1];
    }
  };

  const updateColors = (target) => {
    const theme = target.dataset.section;
    header.setAttribute("data-theme", theme);
    logo.setAttribute("data-theme", theme);
  };

  const shouldUpdate = (entry) => {
    if (direction === "down" && !entry.isIntersecting) {
      return true;
    }

    if (direction === "up" && entry.isIntersecting) {
      return true;
    }

    return false;
  };

  const onIntersect = (entries, observer) => {
    entries.forEach((entry) => {
      if (scrollRoot.scrollTop > prevYPosition) {
        direction = "down";
      } else {
        direction = "up";
      }

      prevYPosition = scrollRoot.scrollTop;

      const target =
        direction === "down" ? getTargetSection(entry) : entry.target;

      if (shouldUpdate(entry)) {
        updateColors(target);
      }
    });
  };

  const observer = new IntersectionObserver(onIntersect, options);

  sections.forEach((section) => {
    observer.observe(section);
  });

  const mobileRes = window.matchMedia("(max-width: 1440px)");
  const mousePointerTouch = window.matchMedia("(pointer: coarse)");

  if (mobileRes.matches && mousePointerTouch.matches) {
    setTimeout(() => {
      const theme = sections[0].dataset.section;
      header.setAttribute("data-theme", theme);
    }, 500);
  }
});
