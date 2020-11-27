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
  $('body, html').animate({
    scrollTop: $('[data-section="menu-contact"]').offset().top - 70,
  },
    600
  );
});

// Animation on scroll

const serviceWaxing = document.querySelector('.services .service.waxing');
const serviceFace = document.querySelector('.services .service.face');
const serviceManicure = document.querySelector('.services .service.manicure');
const serviceContactMap = document.querySelector('.contact-map');

let windowHeight;
let serviceWaxingFromTop;
let serviceWaxingHeight;
let serviceFaceFromTop;
let serviceFaceHeight;
let serviceManicureFromTop;
let serviceManicureHeight;

const onResize = function onDocumentResize() {
  //   console.log("resize");
  // windowHeight = $(window).height();
  windowHeight = window.innerHeight;
  serviceWaxingFromTop = serviceWaxing.offsetTop;
  serviceWaxingHeight = serviceWaxing.offsetHeight;
  serviceFaceFromTop = serviceFace.offsetTop;
  serviceFaceHeight = serviceFace.offsetHeight;
  serviceManicureFromTop = serviceManicure.offsetTop;
  serviceManicureHeight = serviceManicure.offsetHeight;
};

onResize();
window.addEventListener('resize', onResize);

window.addEventListener('scroll', function () {
  const scrollValue = window.scrollY;

  if (scrollValue > serviceWaxingFromTop + serviceWaxingHeight / 4 - windowHeight) {
    serviceWaxing.classList.add('active');
  }

  if (scrollValue > serviceFaceFromTop + serviceFaceHeight / 4 - windowHeight) {
    serviceFace.classList.add('active');
  }

  if (scrollValue > serviceManicureFromTop + serviceManicureHeight / 4 - windowHeight) {
    serviceManicure.classList.add('active');
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
  $('body, html').animate({
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

    $('body, html').animate({
      scrollTop: $(goToSection).offset().top - headerHeight,
    },
      600
    );
  }, 100);
});

// Close Burger menu on resize 

window.addEventListener('resize', () => {
  var newWidth = window.innerWidth;
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav-links');

  if ((newWidth > 1024) && (burger.classList.contains('active'))) {
    burger.classList.remove('active');
    nav.classList.remove('nav-active');
  }
});

// ****** EMAIL ****** FORMSPREE

window.addEventListener('DOMContentLoaded', function () {

  var form = document.getElementById('my-form');
  var status = document.getElementById('form-status');

  // Success and Error functions for after the form is submitted
  function success() {
    form.reset();
    status.classList.add('success');
    status.innerHTML = 'Bedankt, uw bericht is met succes verzonden!';
  }

  function error() {
    status.classList.add('error');
    status.innerHTML = 'Ooops! Er is iets misgegaan. Probeer het bericht opnieuw te versturen of neem telefonisch contact met ons op.';
  }

  // handle the form submission event
  form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    var data = new FormData(form);
    ajax(form.method, form.action, data, success, error);
  });
});

// helper function for sending an AJAX request
function ajax(method, url, data, success, error) {
  var xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.setRequestHeader('Accept', 'application/json');
  xhr.onreadystatechange = function () {
    if (xhr.readyState !== XMLHttpRequest.DONE) return;
    if (xhr.status === 200) {
      success(xhr.response, xhr.responseType);
    } else {
      error(xhr.status, xhr.response, xhr.responseType);
    }
  };
  xhr.send(data);
}
