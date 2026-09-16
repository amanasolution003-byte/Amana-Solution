/* Amana-Solution — interactions : nav mobile, FAQ, reveal, formulaire */

(function () {
  "use strict";

  var reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* ---------- navigation mobile ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      toggle.setAttribute("aria-label", open ? "Ouvrir le menu" : "Fermer le menu");
      nav.classList.toggle("is-open", !open);
    });

    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        closeMenu();
      }
    });

    function closeMenu() {
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Ouvrir le menu");
      nav.classList.remove("is-open");
    }
  }

  /* ---------- FAQ accordéon ---------- */
  var faqQs = document.querySelectorAll(".faq-q");

  faqQs.forEach(function (btn) {
    var answer = btn.parentElement.querySelector(".faq-a");

    btn.addEventListener("click", function () {
      var expanded = btn.getAttribute("aria-expanded") === "true";

      faqQs.forEach(function (other) {
        other.setAttribute("aria-expanded", "false");
        other.parentElement.querySelector(".faq-a").style.maxHeight = null;
      });

      if (!expanded) {
        btn.setAttribute("aria-expanded", "true");
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });

  /* ---------- apparition au scroll ---------- */
  var revealables = document.querySelectorAll(
    ".section-head, .card, .step, .faq-item, .info-line, .contact-form, .mock-window, .cta-box"
  );

  if ("IntersectionObserver" in window && !reduceMotion) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealables.forEach(function (el) {
      el.classList.add("reveal");
      observer.observe(el);
    });
  }

  /* ---------- header : ombre au scroll ---------- */
  var header = document.querySelector(".site-header");

  if (header) {
    window.addEventListener("scroll", function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    }, { passive: true });
  }

  /* ---------- formulaire de contact (mailto sans backend) ---------- */
  var form = document.getElementById("contact-form");

  if (form) {
    var emailCible = "contact@amana-solution.com";

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var name = (document.getElementById("f-name").value || "").trim();
      var email = (document.getElementById("f-email").value || "").trim();
      var service = (document.getElementById("f-service").value || "").trim();
      var message = (document.getElementById("f-message").value || "").trim();

      if (!name || !email || !service || !message) {
        form.classList.add("has-error");
        return;
      }
      form.classList.remove("has-error");

      var subject = encodeURIComponent("Demande de devis — " + service);
      var body = encodeURIComponent(
        "Nom : " + name + "\nEmail : " + email + "\nBesoin : " + service +
        "\n\nMessage :\n" + message
      );

      window.location.href = "mailto:" + emailCible + "?subject=" + subject + "&body=" + body;
    });
  }
})();