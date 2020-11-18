// ----------- Pricelist display

$(".pricing-categories>div").on("click", function () {
  if ($(this).hasClass("active")) {
  } else {
    $(".pricing-categories>div").removeClass("active");
    $(".pricing-list-items").removeClass("active");

    activeCategoryClass = this.className;
    console.log(this.className);
    $(this).addClass("active");
    $(".pricing-list-items." + activeCategoryClass).addClass("active");
  }
});

// book-a-visit  button   (Afspraak Maken)

$(".book-a-visit").on("click", function () {
  console.log("klik działa");

  $("body, html").animate(
    {
      scrollTop: $('[data-section="menu-contact"]').offset().top - 85,
    },
    600
  );
});

// Animation, scroll

const $serviceWaxing = $(".services .service.waxing");
const $serviceFace = $(".services .service.face");
const $serviceManicure = $(".services .service.manicure");
const $serviceContactMap = $(".contact-map");

var windowHeight;
var serviceWaxingFromTop;
var serviceWaxingHeight;
var serviceFaceFromTop;
var serviceFaceHeight;
var serviceManicureFromTop;
var serviceManicureHeight;
var serviceContactMapFromTop;
var serviceContactMapHeight;

const onResize = function onDocumentResize() {
  //   console.log("resize");
  windowHeight = $(window).height();
  serviceWaxingFromTop = $serviceWaxing.offset().top;
  serviceWaxingHeight = $serviceWaxing.outerHeight();
  serviceFaceFromTop = $serviceFace.offset().top;
  serviceFaceHeight = $serviceFace.outerHeight();
  serviceManicureFromTop = $serviceManicure.offset().top;
  serviceManicureHeight = $serviceManicure.outerHeight();
  serviceContactMapFromTop = $serviceContactMap.offset().top;
  serviceContactMapHeight = $serviceContactMap.outerHeight();
};

onResize();
$(window).resize(onResize);

$(document).on("scroll", function () {
  //   console.log("scroll");
  const scrollValue = $(this).scrollTop();

  if (
    scrollValue >
    serviceWaxingFromTop + serviceWaxingHeight / 3 - windowHeight
  ) {
    $serviceWaxing.addClass("active");
  }

  if (scrollValue > serviceFaceFromTop + serviceFaceHeight / 3 - windowHeight) {
    $serviceFace.addClass("active");
  }

  if (
    scrollValue >
    serviceManicureFromTop + serviceManicureHeight / 3 - windowHeight
  ) {
    $serviceManicure.addClass("active");
  }

  if (
    scrollValue >
    serviceContactMapFromTop + serviceContactMapHeight / 2 - windowHeight
  ) {
    $serviceContactMap.addClass("active");
  }
});

// ----- ACCORDION  Pricelist

// acc= clickable caterogry line
const acc = document.querySelectorAll(".menu-pricing-accordion-categorie");
const panels = document.querySelectorAll(".accordion-pricing-list-items");

const onTabClick = (event) => {
  const clickedTab = event.currentTarget;

  [].forEach.call(acc, (tab, i) => {
    if (tab != clickedTab) {
      panels[i].style.maxHeight = null;
      panels[i].style.display = "none";
      panels[i].previousElementSibling.classList.remove("active");

      const ArrowToClose = panels[i].previousElementSibling;
      ArrowToClose.lastChild.classList.remove("active");
    }
  });

  clickedTab.classList.toggle("active");

  const arr = clickedTab.lastChild;
  arr.classList.toggle("active");

  const panel = clickedTab.nextElementSibling;
  if (panel.style.display === "flex") {
    panel.style.display = "none";
  } else {
    panel.style.display = "flex";
  }

  if (panel.style.maxHeight) {
    panel.style.maxHeight = null;
  } else {
    panel.style.maxHeight = panel.scrollHeight + "px";
  }

  const headerHeight = document.querySelector("div.header-fixed").clientHeight;
  $("body, html").animate(
    {
      scrollTop: $(clickedTab).offset().top - headerHeight,
    },
    600
  );
};

[].forEach.call(acc, (tab) => {
  tab.addEventListener("click", onTabClick);
});


// Toggle menu
const nav = document.querySelector(".nav-links");
const navLinks = document.querySelectorAll(".nav-links li");
const burger = document.querySelector(".burger");

const toggleNav = () => {
  const isOpen = nav.classList.contains("nav-active");

  if (isOpen) {
    // close nav
    nav.classList.remove("nav-active");
    navLinks.forEach((link) => {
      link.style.animation = "";
    });
    burger.classList.remove("active");
    return;
  }

  // open nav
  nav.classList.add("nav-active");
  navLinks.forEach((link, index) => {
  link.style.animation = `navLinkFade 0.5s ease forwards ${index / 15 + 0.2}s`;
  });
  burger.classList.add("active");
};

burger.addEventListener("click", () => {
    toggleNav();
});

// ----------- Click on NAV --> SCROLL  to section  -- JQ --
var throttleTimeout = 0;
$("nav ul li a").on("click", function (ev) {
  ev.preventDefault();
  clearTimeout(throttleTimeout);
 
  if (burger.classList.contains("active")){
    toggleNav();
  }  

  throttleTimeout = setTimeout(() => 
  {    
    const goToSection = "[data-section=" + $(this).attr("class") + "]";
    const headerHeight = document.querySelector("div.header-fixed").clientHeight -1;
    
    $("body, html").animate(
      {
        scrollTop: $(goToSection).offset().top - headerHeight,
      },
      700
    );
  }, 100);
});



