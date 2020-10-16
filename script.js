let throttleTimeout = 0;

// scroll
$('nav a').on('click', function (ev) {
    clearTimeout(throttleTimeout);
    throttleTimeout = setTimeout(() => {
        const goToSection = "[data-section=" + $(this).attr('class') + "]";
        $('body, html').animate({
            scrollTop: $(goToSection).offset().top - 85
        }, 1000)
    }, 100);
})

// Price-list display

$(".pricing-categories>div").on('click', function(){
if ($(this).hasClass('active')){
}
else{
    $('.pricing-categories>div').removeClass('active')
    $('.pricing-list-items').removeClass('active')
    
    activeCategoryClass = this.className
    $(this).addClass('active')
     $('.pricing-list-items.' + activeCategoryClass).addClass('active')
    }
})

// book-a-visit  button   (Afspraak Maken)

$('.book-a-visit').on('click', function(){
    console.log("klik działa")

    $('body, html').animate({
        scrollTop: $('[data-section="menu-contact"]').offset().top - 85
    }, 1000)
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

    if(scrollValue > serviceWaxingFromTop+(serviceWaxingHeight/2)-windowHeight){
        $serviceWaxing.addClass('active'); 
    }

    if(scrollValue > serviceFaceFromTop+(serviceFaceHeight/2)-windowHeight){
        $serviceFace.addClass('active'); 
    }

    if(scrollValue > serviceManicureFromTop+(serviceManicureHeight/2)-windowHeight){
        $serviceManicure.addClass('active'); 
    }
    
    if(scrollValue > serviceContactMapFromTop+(serviceContactMapHeight/2) - windowHeight){
        $serviceContactMap.addClass('active'); 
    }
    // Clear 
    if(scrollValue < 100){
        $('.services .service, .contact-map').removeClass('active');
    }
})

