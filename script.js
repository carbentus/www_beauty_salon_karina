const $ = window.jQuery;

// ----------- Pricelist (desktop) display
$('.pricing-categories>div').on('click', function () {
  if ($(this).hasClass('active')) {
    return;
  }
  $('.pricing-categories>div').removeClass('active');
  $('.pricing-list-items').removeClass('active');

  const activeCategoryClass = this.className;
  console.log(this.className);
  $(this).addClass('active');
  $(`.pricing-list-items.${activeCategoryClass}`).addClass('active');
});
// book-a-visit  button   (Afspraak Maken)

$('.book-a-visit').on('click', () => {
  $('body, html').animate(
    {
      scrollTop: $('[data-section="menu-contact"]').offset().top - 70,
    },
    600
  );
});

// Animation on scroll

const $serviceWaxing = $('.services .service.waxing');
const $serviceFace = $('.services .service.face');
const $serviceManicure = $('.services .service.manicure');
const $serviceContactMap = $('.contact-map');

let windowHeight;
let serviceWaxingFromTop;
let serviceWaxingHeight;
let serviceFaceFromTop;
let serviceFaceHeight;
let serviceManicureFromTop;
let serviceManicureHeight;

const onResize = function onDocumentResize() {
  //   console.log("resize");
  windowHeight = $(window).height();
  serviceWaxingFromTop = $serviceWaxing.offset().top;
  serviceWaxingHeight = $serviceWaxing.outerHeight();
  serviceFaceFromTop = $serviceFace.offset().top;
  serviceFaceHeight = $serviceFace.outerHeight();
  serviceManicureFromTop = $serviceManicure.offset().top;
  serviceManicureHeight = $serviceManicure.outerHeight();
};

onResize();
$(window).resize(onResize);

$(document).on('scroll', function () {
  const scrollValue = $(this).scrollTop();


  if (scrollValue > serviceWaxingFromTop + serviceWaxingHeight / 3 - windowHeight) {
    $serviceWaxing.addClass('active');

    console.log("Waxing from top" + (serviceWaxingFromTop));
    console.log("scroll value for Waxing  " + (serviceWaxingFromTop + serviceWaxingHeight / 3 - windowHeight));
  }

  if (scrollValue > serviceFaceFromTop + serviceFaceHeight / 3 - windowHeight) {
    $serviceFace.addClass('active');
  }

  if (scrollValue > serviceManicureFromTop + serviceManicureHeight / 3 - windowHeight) {
    $serviceManicure.addClass('active');
  }
});

// ----- ACCORDION  Pricelist (mobile)
// acc= clickable caterogry line
const acc = document.querySelectorAll('.menu-pricing-accordion-categorie');
const panels = document.querySelectorAll('.accordion-pricing-list-items');

const onTabClick = (event) => {
  const clickedTab = event.currentTarget;

  [].forEach.call(acc, (tab, i) => {
    if (tab !== clickedTab) {
      panels[i].style.maxHeight = null;
      panels[i].style.display = 'none';
      panels[i].previousElementSibling.classList.remove('active');

      const ArrowToClose = panels[i].previousElementSibling;
      ArrowToClose.lastElementChild.classList.remove('active');
    }
  });

  clickedTab.classList.toggle('active');

  const arr = clickedTab.lastElementChild;
  arr.classList.toggle('active');

  const panel = clickedTab.nextElementSibling;
  if (panel.style.display === 'flex') {
    panel.style.display = 'none';
  } else {
    panel.style.display = 'flex';
  }

  if (panel.style.maxHeight) {
    panel.style.maxHeight = null;
  } else {
    panel.style.maxHeight = `${panel.scrollHeight}px`;
  }

  const headerHeight = document.querySelector('div.header-fixed').clientHeight;
  $('body, html').animate(
    {
      scrollTop: $(clickedTab).offset().top - headerHeight,
    },
    500
  );
};

[].forEach.call(acc, (tab) => {
  tab.addEventListener('click', onTabClick);
});


// TOGGLE menu
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');
const burger = document.querySelector('.burger');

const toggleNav = () => {
  const isOpen = nav.classList.contains('nav-active');

  if (isOpen) {
    // close nav
    nav.classList.remove('nav-active');
    navLinks.forEach((link) => {
      // eslint-disable-next-line no-param-reassign
      link.style.animation = '';
    });
    burger.classList.remove('active');
    return;
  }

  // open nav
  nav.classList.add('nav-active');
  navLinks.forEach((link, index) => {
    // eslint-disable-next-line no-param-reassign
    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 15 + 0.2}s`;
  });
  burger.classList.add('active');
};
burger.addEventListener('click', () => {
  toggleNav();
});

// ----------- Click on NAV-- > SCROLL  to section-- JQ--
var throttleTimeout = 0;
$('nav ul li a').not('.menu-number').on('click', function (ev) {
  ev.preventDefault();
  clearTimeout(throttleTimeout);

  if (burger.classList.contains('active')) {
    toggleNav();
  }

  throttleTimeout = setTimeout(() => {
    const goToSection = `[data-section=${$(this).attr('class')}]`;
    const headerHeight = document.querySelector('div.header-fixed').clientHeight - 1;

    $('body, html').animate(
      {
        scrollTop: $(goToSection).offset().top - headerHeight,
      },
      600
    );
  }, 100);
});
