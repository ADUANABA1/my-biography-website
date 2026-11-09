
/* =========================================
   PERSONAL BIOGRAPHY WEBSITE
   JavaScript Functionality
========================================= */

/* Website Loader */
const pageLoader = document.getElementById("page-loader");

if (pageLoader) {
    function hidePageLoader() {
        if (pageLoader.classList.contains("loader-hidden")) {
            return;
        }

        pageLoader.classList.add("loader-hidden");

        setTimeout(() => {
            pageLoader.remove();
        }, 600);
    }

    window.addEventListener("load", hidePageLoader, { once: true });

    if (document.readyState === "complete") {
        hidePageLoader();
    }
}

document.addEventListener("DOMContentLoaded", function () {

    // =====================================
    // MOBILE NAVIGATION
    // =====================================

    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", function () {

            navLinks.classList.toggle("active");

            const isOpen = navLinks.classList.contains("active");

            menuToggle.setAttribute("aria-expanded", isOpen);

            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation menu" : "Open navigation menu"
            );

            menuToggle.textContent = isOpen ? "✕" : "☰";

        });

        // Close menu after clicking a navigation link

        navLinks.querySelectorAll("a").forEach(function (link) {

            link.addEventListener("click", function () {

                navLinks.classList.remove("active");

                menuToggle.setAttribute("aria-expanded", "false");

                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );

                menuToggle.textContent = "☰";

            });

        });

    }


    // =====================================
    // DARK MODE
    // =====================================

    const themeToggle = document.getElementById("theme-toggle");

    // Restore saved theme

    const savedTheme = localStorage.getItem("website-theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
    }

    function updateThemeButton() {

        const darkMode = document.body.classList.contains("dark-mode");

        if (themeToggle) {

            themeToggle.textContent = darkMode
                ? "☀️ Light Mode"
                : "🌙 Dark Mode";

            themeToggle.setAttribute(
                "aria-label",
                darkMode ? "Switch to light mode" : "Switch to dark mode"
            );

            themeToggle.setAttribute("aria-pressed", darkMode);

        }

    }

    updateThemeButton();

    if (themeToggle) {

        themeToggle.addEventListener("click", function () {

            document.body.classList.toggle("dark-mode");

            const darkMode = document.body.classList.contains("dark-mode");

            localStorage.setItem(
                "website-theme",
                darkMode ? "dark" : "light"
            );

            updateThemeButton();

        });

    }


    // =====================================
    // BACK TO TOP BUTTON
    // =====================================

    const backToTop = document.getElementById("back-to-top");

    if (backToTop) {

        // Hide button initially

        backToTop.style.display = "none";

        window.addEventListener("scroll", function () {

            if (window.scrollY > 300) {
                backToTop.style.display = "block";
            } else {
                backToTop.style.display = "none";
            }

        });

        backToTop.addEventListener("click", function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    // =====================================
    // SECTION REVEAL ANIMATION
    // =====================================

    const sections = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        }, {
            threshold: 0.15
        });

        sections.forEach(function (section) {

            section.classList.add("reveal-ready");

            observer.observe(section);

        });

    }

});

    // =====================================
    // TYPING ANIMATION
    // =====================================

    const typingElement = document.getElementById("typing-text");

    if (typingElement) {

        const roles = [
            "IT Student",
            "Web Developer",
            "Programmer",
            "Technology Enthusiast"
        ];

        let roleIndex = 0;
        let characterIndex = 0;
        let deleting = false;

        function typeEffect() {

            const currentRole = roles[roleIndex];

            if (deleting) {

                characterIndex--;

            } else {

                characterIndex++;

            }

            typingElement.textContent =
                currentRole.substring(0, characterIndex);

            let speed = deleting ? 50 : 100;

            if (!deleting && characterIndex === currentRole.length) {

                deleting = true;
                speed = 1500;

            } else if (deleting && characterIndex === 0) {

                deleting = false;

                roleIndex = (roleIndex + 1) % roles.length;

                speed = 400;

            }

            setTimeout(typeEffect, speed);

        }

        typeEffect();

    }

const yearElement = document.getElementById("current-year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

/* Contact Form Submission */
const contactForm = document.querySelector(".contact-form");
const formStatus = document.getElementById("form-status");

if (contactForm && formStatus) {
    contactForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const submitButton = contactForm.querySelector(
            'button[type="submit"]'
        );

        formStatus.textContent = "Sending your message...";
        formStatus.className = "form-status";

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = "Sending...";
        }

        try {
            const response = await fetch(contactForm.action, {
                method: "POST",
                body: new FormData(contactForm),
                headers: {
                    Accept: "application/json"
                }
            });

            if (response.ok) {
                formStatus.textContent =
                    "Message sent successfully! Thank you for contacting me.";

                formStatus.classList.add("success");
                contactForm.reset();
            } else {
                throw new Error("Message could not be sent.");
            }

        } catch (error) {
            formStatus.textContent =
                "Sorry, something went wrong. Please try again.";

            formStatus.classList.add("error");

        } finally {
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = "Send Message";
            }
        }
    });
}

/* Animated Skills Progress Bars */
const skillBars = document.querySelectorAll(".skill-progress");

if (skillBars.length > 0) {
    const skillObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const percentage = bar.dataset.progress;

                    bar.style.setProperty(
                        "--skill-width",
                        percentage + "%"
                    );

                    bar.classList.add("animate");
                    observer.unobserve(bar);
                }
            });
        },
        {
            threshold: 0.3
        }
    );

    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
}

/* Certificate Lightbox */
const certificateImages = document.querySelectorAll(
    ".certificate-card img, .achievement-card img"
);

const lightbox = document.getElementById(
    "certificate-lightbox"
);

const lightboxImage = document.getElementById(
    "lightbox-image"
);

const lightboxCaption = document.getElementById(
    "lightbox-caption"
);

const lightboxClose = document.querySelector(
    ".lightbox-close"
);

const achievementPdfViewer = document.getElementById(
    "achievement-pdf-viewer"
);
const achievementPdfClose = document.getElementById(
    "achievement-pdf-close"
);
const achievementPdfReopen = document.getElementById(
    "achievement-pdf-reopen"
);

if (achievementPdfViewer && achievementPdfClose && achievementPdfReopen) {
    achievementPdfClose.addEventListener("click", () => {
        achievementPdfViewer.hidden = true;
        achievementPdfReopen.hidden = false;
    });

    achievementPdfReopen.addEventListener("click", () => {
        achievementPdfViewer.hidden = false;
        achievementPdfReopen.hidden = true;
    });
}

function closeLightbox() {
    lightbox.classList.remove("active");
    lightboxImage.src = "";
}

certificateImages.forEach(image => {
    image.style.cursor = "pointer";

    image.addEventListener("click", () => {
        lightboxImage.src = image.src;
        lightboxCaption.textContent = image.alt;

        lightbox.classList.add("active");
    });
});

if (lightboxClose) {
    lightboxClose.addEventListener("click", closeLightbox);
}

if (lightbox) {
    lightbox.addEventListener("click", event => {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });
}

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeLightbox();
    }
});

/* Active Navigation Indicator */
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a[href^='#']");

function updateActiveNavigation() {
    let currentSection = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {
            currentSection = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + currentSection) {
            link.classList.add("active");
        }
    });
}

window.addEventListener("scroll", updateActiveNavigation);

updateActiveNavigation();

/* Back to Top Button */
const backToTop = document.getElementById("back-to-top");

if (backToTop) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            backToTop.classList.add("visible");
        } else {
            backToTop.classList.remove("visible");
        }
    });

    backToTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}
function updateClock() {
  const clock = document.querySelector("#clock");

  if (!clock) return;

  const now = new Date();

  clock.textContent = now.toLocaleTimeString();
}

updateClock();

setInterval(updateClock, 1000);
const copyEmailButton = document.querySelector("#copy-email");
const copyMessage = document.querySelector("#copy-message");

if (copyEmailButton) {
  copyEmailButton.addEventListener("click", async () => {
    const email = "your-email@example.com";

    try {
      await navigator.clipboard.writeText(email);
      copyMessage.textContent = "Email address copied!";
    } catch {
      copyMessage.textContent =
        "Copying failed. Please copy the email manually.";
    }
  });
}
const readingBar = document.querySelector("#reading-progress-bar");
const readingText = document.querySelector("#reading-progress-text");

function updateReadingProgress() {
  if (!readingBar || !readingText) return;

  const totalHeight =
    document.documentElement.scrollHeight - window.innerHeight;

  const progress = totalHeight > 0
    ? Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100))
    : 100;

  readingBar.style.width = `${progress}%`;
  readingText.textContent = `${Math.round(progress)}%`;
}

window.addEventListener("scroll", updateReadingProgress);
window.addEventListener("resize", updateReadingProgress);

updateReadingProgress();
const shareButton = document.querySelector("#share-website");
const shareMessage = document.querySelector("#share-message");

if (shareButton) {
  shareButton.addEventListener("click", async () => {
    const websiteUrl = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "My Personal Biography",
          text: "Visit my personal biography website!",
          url: websiteUrl
        });
      } catch (error) {
        if (error.name !== "AbortError") {
          shareMessage.textContent = "Sharing was unsuccessful.";
        }
      }
    } else {
      try {
        await navigator.clipboard.writeText(websiteUrl);
        shareMessage.textContent = "Website link copied!";
      } catch {
        shareMessage.textContent =
          "Please copy your website link from the address bar.";
      }
    }
  });
}