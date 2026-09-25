$(function () {
  document.addEventListener("contextmenu", function (event) {
    if (event.target.tagName === "IMG") {
      event.preventDefault();
    }
  });
  document.addEventListener("dragstart", function (event) {
    if (event.target.tagName === "IMG") {
      event.preventDefault();
    }
  });

  const bg = document.querySelector(".fv-bg");
  let scrollY = 0;
  let ticking = false;

  window.addEventListener("scroll", () => {
    scrollY = window.scrollY;

    if (!ticking) {
      requestAnimationFrame(() => {
        const parallax = scrollY * 0.3;
        const zoom = 1.1 + scrollY * 0.0007;

        bg.style.transform = `
        translateY(${parallax}px)
        scale(${zoom})
      `;

        ticking = false;
      });

      ticking = true;
    }
  });

  // loading
  const loading = document.querySelector(".loading");
  function showLoading() {
    loading.classList.remove("loaded");
    setTimeout(() => {
      loading.classList.add("loaded");
    }, 500);
  }
  window.addEventListener("load", () => {
    showLoading();
  });

  const logo = document.querySelector(".logo-link");

  logo.addEventListener("click", (e) => {
    e.preventDefault();

    loading.classList.remove("loaded");

    setTimeout(() => {
      window.scrollTo(0, 0);
      loading.classList.add("loaded");
    }, 800);
  });

  // headerMenu
  $(window).on("scroll", function () {
    mvHeight = $(".fv").height();
    if ($(window).scrollTop() > mvHeight) {
      $(".navi").addClass("transform");
    } else {
      $(".navi").removeClass("transform");
    }
  });

  // Click_Scroll
  $(document).ready(function () {
    $('a[href^="#"]').on("click", function (event) {
      var target = $(this.getAttribute("href"));
      if (target.length) {
        event.preventDefault();
        $("html, body").stop().animate(
          {
            scrollTop: target.offset().top,
          },
          1500,
        );
      }
    });
  });

  // レスポンシブ
  const hamburger = document.querySelector(".hamburger");
  const menu = document.querySelector(".menu");
  const menuLinks = document.querySelectorAll(".menu a");
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    menu.classList.toggle("active");
  });

  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      menu.classList.remove("active");
    });
  });

  //lenis
  const lenis = new Lenis({
    duration: 1.5,
    autoRaf: true,
    smoothTouch: false,
  });

  lenis.on("scroll", (e) => {
    console.log(e);
  });

  // gsap
  gsap.registerPlugin(ScrollTrigger);

  gsap.to(".fvText", {
    opacity: 0,
    y: -50,
    scrollTrigger: {
      trigger: ".fvText",
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });

  gsap.utils.toArray(".section").forEach((el) => {
    gsap.from(el, {
      opacity: 0,
      y: 100,
      duration: 1,
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });
  });

  gsap.utils.toArray(".un-fade").forEach((el) => {
    gsap.from(el, {
      opacity: 0,
      y: 40,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
      },
    });
  });
});
