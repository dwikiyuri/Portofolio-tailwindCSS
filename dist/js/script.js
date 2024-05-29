const hamburger = document.querySelector("#hamburger");
const navMenu = document.querySelector("#nav-menu");
hamburger.addEventListener("click", function () {
  hamburger.classList.toggle("hamburger-active");
  navMenu.classList.toggle("hidden");
});

// navbar fixed

window.onscroll = function () {
  const header = document.querySelector("header");
  const fixedNav = header.offsetTop;
  const toTop = document.querySelector("#totop");
  const toggleDM = document.querySelector("toglles");
  if (window.pageYOffset > fixedNav) {
    header.classList.add("navbar-fixed");
    toTop.classList.remove("hidden");
    toTop.classList.add("flex");
  } else {
    header.classList.remove("navbar-fixed");
    toTop.classList.remove("flex");
    toTop.classList.add("hidden");
  }
};
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetID = this.getAttribute("href").substring(1);
    const target = document.getElementById(targetID);

    if (target) {
      slowScrollTo(target, 1000); // 1000 ms atau 1 detik
    }
  });
});
//auto close hamburger
window.addEventListener("click", function (e) {
  // Check if the clicked target is not the hamburger or a child of the nav menu
  if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
    hamburger.classList.remove("hamburger-active");
    navMenu.classList.add("hidden");
  }
});

function slowScrollTo(target, duration) {
  const startPosition = window.pageYOffset;
  const targetPosition = target.getBoundingClientRect().top;
  const startTime =
    "now" in window.performance ? performance.now() : new Date().getTime();

  function scrollStep(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    window.scrollTo(
      0,
      startPosition + targetPosition * easeInOutCubic(progress)
    );

    if (elapsed < duration) {
      window.requestAnimationFrame(scrollStep);
    }
  }

  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  window.requestAnimationFrame(scrollStep);
}

// JavaScript for Typing Effect
document.addEventListener("DOMContentLoaded", function () {
  const typingContainer = document.getElementById("typing-container");
  const textElements = document.querySelectorAll(
    "#text-container .typing-text"
  );
  const texts = Array.from(textElements).map((el) => el.textContent);

  let currentTextIndex = 0;
  let currentText = "";
  let isDeleting = false;
  let typingSpeed = 100; // Adjust the typing speed (milliseconds per character)

  function type() {
    const text = texts[currentTextIndex];
    if (isDeleting) {
      currentText = text.substring(0, currentText.length - 1);
    } else {
      currentText = text.substring(0, currentText.length + 1);
    }

    typingContainer.innerHTML = currentText;

    let typingDelay = isDeleting ? typingSpeed / 2 : typingSpeed;

    if (!isDeleting && currentText === text) {
      typingDelay = 1000; // Pause after typing
      isDeleting = true;
    } else if (isDeleting && currentText === "") {
      isDeleting = false;
      currentTextIndex++;
      if (currentTextIndex === texts.length) {
        currentTextIndex = 0;
      }
    }

    setTimeout(type, typingDelay);
  }

  type();
});
document.addEventListener("DOMContentLoaded", function () {
  const darkToggle = document.querySelector("#dark-toggle");
  const html = document.querySelector("html");
  const sunIcon = document.querySelector("#sun-icon");
  const moonIcon = document.querySelector("#moon-icon");

  function updateIcons() {
    if (darkToggle.checked) {
      moonIcon.classList.remove("opacity-0");
      sunIcon.classList.add("opacity-0");
    } else {
      moonIcon.classList.add("opacity-0");
      sunIcon.classList.remove("opacity-0");
    }
  }

  // Apply the correct theme on page load
  if (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    html.classList.add("dark");
    darkToggle.checked = true;
  } else {
    html.classList.remove("dark");
    darkToggle.checked = false;
  }

  updateIcons();

  // Toggle the theme on button click
  darkToggle.addEventListener("click", function () {
    if (darkToggle.checked) {
      html.classList.add("dark");
      localStorage.theme = "dark";
    } else {
      html.classList.remove("dark");
      localStorage.theme = "light";
    }
    updateIcons();
  });
});
