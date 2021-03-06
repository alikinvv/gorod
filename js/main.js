var timerId;
var swiperDoing = undefined;
var swiperLogos = undefined;

// init on mobile & destroy on desktop
function initSwiper() {
    var screenWidth = $(window).width();        
    if(screenWidth < 767 && swiperDoing == undefined) {            
        $('.swiperMobile').each(function(){
            swiperDoing = new Swiper(this, {  
              pagination: {
                el: '.swiper-pagination',
                clickable: true
              },
            })
        });        
    } else if (screenWidth > 768 && swiperDoing != undefined) {            
        swiperDoing.destroy();
        swiperDoing = undefined;
        jQuery('.swiper-wrapper').removeAttr('style');
        jQuery('.swiper-slide').removeAttr('style');            
    }        
}   

function logosSwiper() {
  var screenWidth = $(window).width();        
  if(screenWidth < 767 && swiperLogos == undefined) {            
      $('.logosMobile').each(function(){
        swiperLogos = new Swiper(this, {  
            slidesPerView: 2,
            spaceBetween: 0,
            slidesPerGroup: 2,
            pagination: {
              el: '.swiper-pagination-logos',
              clickable: true
            },
          })
      });        
  } else if (screenWidth > 768 && swiperLogos != undefined) {            
    swiperLogos.destroy();
      swiperLogos = undefined;
      jQuery('.logosMobile .swiper-wrapper').removeAttr('style');
      jQuery('.logosMobile .swiper-slide').remove('style');            
  }        
}   

// set one height for all blocks
function sameHeight(block) {
  if($('*').is(block)) {
    var maxHeight = 0;
        $(block).each(function () {
            var h_block = parseInt($(this).height());
            if(h_block > maxHeight) {
                maxHeight = h_block;
            };
        });
        $(block).height(maxHeight);
    }
}

$(document).ready(function(){

  // scroll to section 
  $('a[data-target]').click(function(e) {
    e.preventDefault();
    $("html, body").animate({ scrollTop: $('section#' + $(this).attr('data-target') +'').offset().top -200 }, 1000);
  });

  
  // upload form check file
  if($('*').hasClass('video')) {
    $('#videoUploadFile').change(function() {
      if(document.getElementById("videoUploadFile").files.length == 0 ){
        $(this).siblings('.upload-label').text('Прикрепить резюме');
      } else {
        $(this).siblings('.upload-label').text('Файл прикреплен');
      }
    });
  }
 

  // video player
  if($('*').hasClass('video')) {
    $('.video__main .video__play').click(function() {
      $(".video iframe").remove();

      $('<iframe class="video__iframe" frameborder="0" allowfullscreen></iframe>')
    .attr("src", $('.video__other .video__second:first-child').attr('data-src'))
    .appendTo(".video");

      $(this).parent().fadeOut().hide();
      $(this).fadeOut().hide();
    });

    $('.video__second .video__play').click(function() {
      $(".video iframe").remove();

      $('<iframe class="video__iframe" frameborder="0" allowfullscreen></iframe>')
    .attr("src", $(this).parent().attr('data-src'))
    .appendTo(".video");

      $(this).parent().toggleClass('show');
      $('.video__main').fadeOut();
    });

  }

  initSwiper(); 
  logosSwiper(); 

  $('.header__search').click(function() {
    $('.header').toggleClass('search');
  });

  // sliders
  if($('*').hasClass('swiperNumber')) {
    var swiperNumber = new Swiper('.swiperNumber', {
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
    });
  }
  
  if($('*').hasClass('swiperCards')) {
    var swiperCards = new Swiper('.swiperCards', {
      slidesPerView: 3,
      spaceBetween: 0,
      pagination: {
        el: '.swiper-pagination-programs',
        clickable: true
      },
      breakpoints: {
        767: {
          slidesPerView: 1,
          spaceBetween: 0
        }
      }
    });
  }
  
  if($('*').hasClass('swiperReviews')) {
    var swiperReviews = new Swiper('.swiperReviews', {
      pagination: {
        el: '.swiper-pagination-review',
        clickable: true
      },
    });
  }
  
  if($('*').hasClass('swiperClients')) {
    var swiperClients = new Swiper('.swiperClients', {
      slidesPerView: 'auto',
      spaceBetween: 30,
      loop: true,
      autoplay: {
        delay: 400,
      },
      pagination: {
        el: '.swiper-pagination-clients',
        clickable: true
      },
    });

    swiperClients.autoplay.stop();

    $(".swiperClients").hover(function(){
      swiperClients.autoplay.start();
    }, function(){
      swiperClients.autoplay.stop();
    });
  } 

  initSwiper();
  
  // open modal
  $('.btn[data-modal]').click(function(e) {
    e.preventDefault();
    $('.modal[data-modal="'+ $(this).attr('data-modal') +'"]').addClass('sh');
  });

  $('.btn.success[data-modal]').click(function(e) {
    e.preventDefault();
    $('.modal[data-modal="'+ $(this).attr('data-modal') +'"]').addClass('sh success');
  });  

  // close modal
  $('.modal .closeForm').click(function() {
    $(this).parent().parent().removeClass('sh');
  });

  if($(window).width() <= 1023) {
    $('.header .row').append('<div class="hamburger"><span></span><span></span><span></span></div>');
    $('.header__menu').addClass('mobile');
  }

    $('.hamburger').click(function() {
      $(this).toggleClass('active');
      $('.header__menu').toggleClass('showMenu');
    });

    // contact map
  if($('*').hasClass('mapWrap')) {

    var uluru = {lat: 58.007606, lng: 56.249746};
    var map = new google.maps.Map(document.getElementById('fullMap'), {
      zoom: 17,
      center: uluru,
      styles: [{"stylers":[{"saturation":-100},{"gamma":1}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"off"}]},{"featureType":"poi.business","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"poi.business","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"poi.place_of_worship","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"poi.place_of_worship","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"geometry","stylers":[{"visibility":"simplified"}]},{"featureType":"water","stylers":[{"visibility":"on"},{"saturation":50},{"gamma":0},{"hue":"#50a5d1"}]},{"featureType":"administrative.neighborhood","elementType":"labels.text.fill","stylers":[{"color":"#333333"}]},{"featureType":"road.local","elementType":"labels.text","stylers":[{"weight":0.5},{"color":"#333333"}]},{"featureType":"transit.station","elementType":"labels.icon","stylers":[{"gamma":1},{"saturation":50}]}]
    });

    var image = 'img/marker.png';
    var marker = new google.maps.Marker({
      position: uluru,
      map: map,
      icon: image
    });

  };

  // change submenu text to arrows
  if($(window).width() <= 767 && $('*').hasClass('subMenu')) {
    $('.subMenu li.prev').addClass('arrow-left').removeClass('prev').text('');
    $('.subMenu li.next').addClass('arrow-right').removeClass('next').text('');
  }

});

$( window ).load(function() {
  $('.heroBanner').addClass('active');
});

$(document).on('scroll',function() {

  if($(window).scrollTop() >= 15 && $(window).width() >= 1024) {
    $('.header:not(.header-red)').addClass('fixed').removeClass('search');
  } else if ($(window).scrollTop() <= 14 && $(window).width() >= 1024) {
    $('.header:not(.header-red)').removeClass('fixed').css('background','transparent');
  }

});

//Swiper plugin initialization on window resize
$(window).on('resize', function(){
    initSwiper();   

    if($(window).width() >= 768) {
      sameHeight('.news-main .card__info');
    } else {
      $('.news-main .card__info').css('height','auto');
    }

    // change submenu text to arrows
    if($(window).width() <= 767 && $('*').hasClass('subMenu')) {
      $('.subMenu li.prev').addClass('arrow-left').removeClass('prev').text('');
      $('.subMenu li.next').addClass('arrow-right').removeClass('next').text('');
    }
});