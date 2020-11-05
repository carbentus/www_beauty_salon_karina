// ----------- Click on NAV --> SCROLL  to section  -- JQ --

let throttleTimeout = 0;
$('nav a').on('click', function (ev) {
    ev.preventDefault();
    clearTimeout(throttleTimeout);
    throttleTimeout = setTimeout(() => {
         const goToSection = "[data-section=" + $(this).attr('class') + "]";
        $('body, html').animate({
            scrollTop: $(goToSection).offset().top - 85
        }, 1000)
    }, 100);
})



// ----------- Pricelist display

$(".pricing-categories>div").on('click', function(){
if ($(this).hasClass('active')){
}
else{
    $('.pricing-categories>div').removeClass('active')
    $('.pricing-list-items').removeClass('active')
    
    activeCategoryClass = this.className
    console.log(this.className);
    $(this).addClass('active')
     $('.pricing-list-items.' + activeCategoryClass).addClass('active')


    }
})

// book-a-visit  button   (Afspraak Maken)

$('.book-a-visit').on('click', function(){
    console.log("klik działa")

    $('body, html').animate({
        scrollTop: $('[data-section="menu-contact"]').offset().top - 85
    }, 600)
})


// Animation, scroll

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
let serviceContactMapFromTop;
let serviceContactMapHeight;

const onResize = function onDocumentResize() {
    console.log('resize');
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

$(document).on('scroll', function(){
    console.log('scroll');
    const scrollValue = $(this).scrollTop();

    if(scrollValue > serviceWaxingFromTop+(serviceWaxingHeight/3)-windowHeight){
        $serviceWaxing.addClass('active'); 
    }

    if(scrollValue > serviceFaceFromTop+(serviceFaceHeight/3)-windowHeight){
        $serviceFace.addClass('active'); 
    }

    if(scrollValue > serviceManicureFromTop+(serviceManicureHeight/3)-windowHeight){
        $serviceManicure.addClass('active'); 
    }
    
    if(scrollValue > serviceContactMapFromTop+(serviceContactMapHeight/2) - windowHeight){
        $serviceContactMap.addClass('active'); 
    }
})

// ACCORDION 

// acc=button
var acc = document.getElementsByClassName("menu-pricing-accordion-categorie");
var panels = document.getElementsByClassName("accordion-pricing-list-items");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener('click', function() {

    // for (i=0; i< panels.length; i++){
    //       if (acc != this) {
    //         panels[i].style.maxHeight = null;
    //         panels[i].style.display= "none";
    //         panels[i].previousElementSibling.classList.remove("active");
    //          }
    // }
   
    this.classList.toggle("active");
    
    var arr = this.lastChild;
    arr.classList.toggle("active");

    var panel = this.nextElementSibling;
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
  });
}
// TODO:  w raz z otwieraniem kategorii, scrolowanie strony do naglowka wybranej kategorii. zobacz: https://www.bundesregierung.de/breg-de/themen/coronavirus/corona-massnahmen-1734724