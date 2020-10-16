// scroll
$('nav a').on('click', function (ev) {
    ev.preventDefault();
    const goToSection = "[data-section=" + $(this).attr('class') + "]";
    $('body, html').animate({
        scrollTop: $(goToSection).offset().top - 85
    }, 1000)
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
    }, 600)
})


// Animation, scroll

$(document).on('scroll', function(){
    const windowHeight = $(window).height();
    const scrollValue = $(this).scrollTop();

    const $serviceWaxing = $('.services .service.waxing');
    const serviceWaxingFromTop = $serviceWaxing.offset().top;
    const serviceWaxingHeight = $serviceWaxing.outerHeight();

    const $serviceFace = $('.services .service.face');
    const serviceFaceFromTop = $serviceFace.offset().top;
    const serviceFaceHeight = $serviceFace.outerHeight();

    const $serviceManicure = $('.services .service.manicure');
    const serviceManicureFromTop = $serviceManicure.offset().top;
    const serviceManicureHeight = $serviceManicure.outerHeight();

    const $serviceContactMap = $('.contact-map');
    const serviceContactMapFromTop = $serviceContactMap.offset().top;
    const serviceContactMapHeight = $serviceContactMap.outerHeight();

  
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

