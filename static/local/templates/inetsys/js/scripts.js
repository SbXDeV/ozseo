$(document).ready(function () {
  $('.menu-item-tel li').click(function () {
    if (navigator.cookieEnabled === false){
      return;
    } else {
      document.cookie = "city="+$(this).data("city")+";max-age=2629743;path=/";
    }
  });
  if($('#projects_slider').length) {
    $(window).scroll(function () {
      var $window = $(window);
      var $panel = $('#projects_slider');
      var scroll = $window.scrollTop() + ($window.height() + 500);
      if (scroll > $panel.position().top) {
        $('#projects_slider .project-item').each(function () {
          var $this = $(this);
          var src = $this.attr('data-src');
          $this.css('background-image', 'url(' + src + ')');
        });
      }
    });
  }

  //Смена цвета фона при скроле на странице проектов
  $(window).scroll(function () {
    var $window = $(window),
      $body = $('body'),
      $panel = $('.panel_js');
    var scroll = $window.scrollTop() + ($window.height() / 1.8);
    $panel.each(function () {
      var $this = $(this);
      if ($this.position().top <= scroll && $this.position().top + $this.height() > scroll) {
        $body.removeClass(function (index, css) {
          return (css.match(/(^|\s)color-\S+/g) || []).join(' ');
        });
        $body.addClass($(this).data('color'));
      }
      if ($window.scrollTop() == 0) {
        $body.removeClass(function (index, css) {
          return (css.match(/(^|\s)color-\S+/g) || []).join(' ');
        });
      }
    });

  }).scroll();
  //Анимации футера
  function scrollShowFooter() {
    var vh = $(this).height();
    var of = $(document).height();
    var sct = $(window).scrollTop();
    var ftrf = $(".footer-form").height();
    var ftr = $(".footer-main").height();
    var ftr_all = ftrf + ftr;
    var ftr1 = of - ftr_all;
    var ftr2 = sct + vh - ftr1;
    var ftr_transform = -25 + 25 * ((ftr2 * 1.25) / (ftr_all - ftr));
    if (sct + vh * 1.40 > ftr1 && ftr_transform >= -50 && ftr_transform <= 0) {
		$(".footer-form:not(.footer-form-np) .wrap").css({
        "transform": "translateY(" + ftr_transform + "%)"
      });
    };
  }

  $(window).bind('scroll', scrollShowFooter);

  //Запуск анимации первого блока при загрузке
  function animate_first_block() {
    $(".animate-block-first").addClass('scroll-here');
  }
  $(document).ready(animate_first_block());
  $('.accordion-button').click(function () {
    var accordion_id = $(this).data("accordion_toggle");
    var accordion_btn_text = $(this).children('.button-text');
    $(this).toggleClass("active");
    $("*[data-accordion_block='" + accordion_id + "']").slideToggle(600, 'linear').toggleClass("active");
    if (!$(this).hasClass("active")) {
      accordion_btn_text.text(accordion_btn_text.data("base_text"));
    } else {
      accordion_btn_text.text('Свернуть');
    }
  });
  $('.popup-button').click(function () {
    var $popup_id = $(this).data("popup_toggle");
    $('body').find('.form-bg').addClass('active');
    $('body').css('overflow-y', 'hidden');
    var $actual_popup = $("*[data-popup_block='" + $popup_id + "']");
    $actual_popup.addClass("active").hide().stop().fadeIn(200, 'swing');
    var $actual_popup_content = $actual_popup.find('.popup_scroll');
    var $actual_popup_header = $actual_popup.find('.popup_header');
    var $actual_popup_header_h = $actual_popup_header.outerHeight(true);
    var $actual_popup_content_h = $actual_popup_content.outerHeight(true);
    $actual_popup_content.css('max-height', 'calc(100% - ' + $actual_popup_header_h + 'px)');
    if ($(window).width() < 992) {
      var $popup_padding = 30
    } else if ($(window).width() > 991 && $(window).width() < 1200) {
      var $popup_padding = 45
    } else {
      var $popup_padding = 73
    }
    var $actual_popup_h = $actual_popup_content_h + $actual_popup_header_h + $popup_padding;
    $actual_popup.css('max-height', $actual_popup_h);
    console.log($actual_popup_header_h);
    console.log($actual_popup_content_h);
    console.log($popup_padding);
  });

  $(document).on('click', '.image-zoom-hover', function (e) {
    e.preventDefault();
    var imglink = $(this).attr('href');
    $('<div class="col-12 popup-block popup-block-image active"><div class="subwrap background-purple scroll-here"><div class="popup_header"><span class="popup-close"><span class="button-circle ico-plus"></span></span></div><div class="popup_scroll"><img src="' + imglink + '"></div></div></div>').appendTo($('body'));
    $('body').find('.form-bg').addClass('active');
    $('body').css('overflow-y', 'hidden');
    $('body').addClass('popup-block-image-active');
    var imgheight = $('.image-zoom-hover img').get(0).naturalHeight;
    var imgwidth = $('.image-zoom-hover img').get(0).naturalWidth;
    console.log(imgheight);
    console.log(imgwidth);
    $('.popup-block-image').css('width', 'calc(' + imgwidth + 'px + 40px)');
    $('.popup-block-image').css('height', 'calc(' + imgheight + 'px + 20px)');
  });

  $(document).on('click', '.popup-close', function (e) {
    $('.popup-block.active').stop().fadeOut(200, 'swing').css('max-height', 'auto');
    $('.popup-button.active').removeClass("active");
    $('body').css('overflow-y', 'auto');
    $('body').find('.form-bg').removeClass("active");
    if ($('body').hasClass('popup-block-image-active')) {
      $('body').removeClass('popup-block-image-active');
      $('.popup-block.popup-block-image').remove();
    }
  });

  $(".popup-block:not(.popup-block-image) .popup_scroll").mCustomScrollbar({
    mouseWheelPixels: 200
  })


  $('.form-bg').on('click', function (e) {
    $('.popup-block.active').stop().fadeOut(200, 'swing');
    $('.popup-button.active').removeClass("active");
    $('body').css('overflow-y', 'auto');
    $(this).removeClass("active");
    if ($('body').hasClass('popup-block-image-active')) {
      $('body').removeClass('popup-block-image-active');
      $('.popup-block.popup-block-image').remove();
    }
  });

  //Работа таймлайна
  $('.timeline-picker-button').click(function () {
    var timeline_block = $(this).data("timeline_block_btn");
    $(this).closest('.timeline').find('.timeline-block-content').css('display', 'none');
    $(this).closest('.timeline').find("*[data-timeline_block='" + timeline_block + "']").css('display', 'block');
    $(this).closest('.timeline').find('.timeline-picker-button').removeClass('active');
    if (!$(this).hasClass("active")) {
      $(this).addClass('active');
    }
  });

  //Выбор тарифа
  $('.price_block_choose').click(function () {
    var tarif = $(this).data('tarif');
    var block_id = $(this).attr('href');
    $(block_id).find('.select-form').val(tarif);
    $('select').niceSelect('update');
  });

  //Обработка клика на мобильное меню
  $(document).on('click', '.mobile-menu-hamburger', function (e) {
    if (!$(this).hasClass("active")) {
      $(this).closest('.header-wrap').find('.header-nav').addClass('active');
      $(this).closest('.header-wrap').find('.header-nav').hide().stop().slideDown().show();
      $(this).addClass('active');
      $('body').find('.nav-bg').addClass('active');
      $('body').css('overflow-y', 'hidden');
    } else {
      $(this).closest('.header-wrap').find('.header-nav').stop().slideUp();
      $(this).removeClass('active');
      $('body').find('.nav-bg').removeClass('active');
      $('body').css('overflow-y', 'auto');
    }
  });
  $(document).on('click', '.nav-bg', function (e) {
    $('.header-nav').stop().slideUp();
    $(this).removeClass('active');
    $('.mobile-menu-hamburger').removeClass('active');
    $('body').css('overflow-y', 'auto');
  });

  $(document).ready(mobile_menu_click);
  $(window).on('resize', mobile_menu_click);

  //Обработка клика в меню на пункт с подменю
  function mobile_menu_click() {
    if ($(window).width() < 768) {
      $(document).on('click', '.nav-menu .menu_dropdown .menu-item-link', function (e) {
        e.preventDefault();
        var menu_title_change = $(this).text();
        var submenu_height = $(this).closest('.menu_dropdown').find('.submenu').height();
        $(this).closest('.header-nav').find('.menu-title').html(menu_title_change).addClass('changed');
        $(this).closest('.nav-menu').addClass('submenu-active').css('min-height', submenu_height);
        $(this).closest('.menu_dropdown').find('.submenu').addClass('active').show();
      });
    }
    else if ($(window).width() > 767 && $(window).width() < 992) {
      $(document).on('click', '.nav-menu .menu_dropdown .menu-item-link', function (e) {
        e.preventDefault();
        var menu_title2_change = $(this).text();
        $(this).closest('.header-nav').find('.menu-item-link').removeClass('active');
        $(this).closest('.header-nav').find('.submenu').removeClass('active');
        $(this).addClass('active');
        $(this).closest('.header-nav').find('.nav-menu .submenu').hide(1);
        var submenu_height = $(this).closest('.menu_dropdown').find('.submenu').height();
        $(this).closest('.nav-menu').addClass('submenu-active').css('min-height', submenu_height);
        $(this).closest('.menu_dropdown').find('.submenu').addClass('active').show();
        $(this).closest('.header-nav').find('.menu-title2').html(menu_title2_change).addClass('changed');
      });
    }
  }

  //Обработка меню при ресайзе
  $(window).on('resize', mobile_menu_on_resize);
  //Обработка клика в меню на пункт с подменю
  function mobile_menu_on_resize() {
    if ($(window).width() > 767) {
      $('.nav-menu').removeClass('submenu-active').css('min-height', 'auto');
      $('.header-nav').find('.menu-title.changed').html('Меню').removeClass('changed');
      $('.header-nav').removeClass('active');
      $('.mobile-menu-hamburger').removeClass('active');
      $('.menu-title2').removeClass('changed');
      $('.submenu').removeClass('active');
      $('body').find('.nav-bg').removeClass('active');
      $('body').css('overflow-y', 'auto');
    };
  }


  //Обработка клика на тайтл в подменю для возврата
  $(document).on('click', '.menu-title.changed', function (e) {
    $(this).html('Меню').removeClass('changed');
    $(this).closest('.header-nav').find('.menu-item-link').removeClass('active');
    $(this).closest('.header-nav').find('.nav-menu').removeClass('submenu-active');
    $(this).closest('.header-nav').find('.nav-menu .submenu').delay(300).hide(1);
    $(this).closest('.header-nav').find('.nav-menu').css('min-height', '228px');
  });


  $(document).ready(city_menu_click);
  $(window).on('resize', city_menu_click);
  function city_menu_click() {
    //Обработка клика на кнопку смены города
    if ($(window).width() < 992) {
      $(document).on('click', '.menu-item-tel.menu_dropdown', function (e) {
        if (!$(this).hasClass("active")) {
          $(this).addClass('active');
          $(this).find('.submenu').css('display', 'flex').hide().addClass('active').stop().slideDown(200).css('display', 'flex');
        } else {
          $(this).removeClass('active')
          $(this).find('.submenu').removeClass('active').stop().slideUp(200);
        }
      });
      $(document).on('click', '.menu-item-tel.menu_dropdown li', function (e) {
        var city = $(this).text();
        var tel = $(this).data('tel');
        var tel_link = $(this).data('tel_link');
        $(this).closest('.city-switcher').find('.tel_number').attr('href', tel_link).html(tel);
        $(this).closest('.city-switcher').find('.menu-item-link').html(city);
        $(this).closest('.city-switcher').find('.submenu').removeClass('active').stop().slideUp();
      });
    } else if ($(window).width() > 991) {
      $(document).on('click', '.menu-item-tel.menu_dropdown li', function (e) {
        var city = $(this).text();
        var tel = $(this).data('tel');
        var tel_link = $(this).data('tel_link');
        $(this).closest('.city-switcher').find('.tel_number').attr('href', tel_link).html(tel);
        $(this).closest('.city-switcher').find('.menu-item-link').html(city);
        $(this).closest('.menu-item-tel').removeClass('menu_dropdown').delay(100).queue(function () {
          $(this).addClass('menu_dropdown').dequeue();
        });
      });
    }
  }

  $(window).on('scroll', sticky_menu);
  var lastScrollTop = 0;
  function sticky_menu() {
    var currentScroll = $(this).scrollTop();
    if (currentScroll > 200) {
      $('body').addClass('sticky-menu');
    } else {
      $('body').removeClass('sticky-menu');
    };
    if (currentScroll > 200 && currentScroll < lastScrollTop) {
      $('body').addClass('scroll_top').removeClass('scroll_bottom');
    } else {
      $('body').removeClass('scroll_top').addClass('scroll_bottom');
    }
    lastScrollTop = currentScroll;
  }


  $(document).ready(function () {
    $('select').niceSelect();
  });

  $('.prnt-active-btn').click(function () {
    $(this).parent().toggleClass("active");
  });

  /*---таблица сравнение--*/
  $(document).on("click", ".table-compare-single-showmore", function () {
    $(this).toggleClass("active");
    var dataacc = $(this).closest(".support-block-stages-compare-single").data("compare_table");
    $("*[data-compare_table='" + dataacc + "'] .table-compare-single-accordion-content").stop().slideToggle(200, 'linear').toggleClass("active");
  });
  $(document).on("click", ".compare-table-toggle .compare-table-toggle-single", function () {
    $(".compare-table-toggle-single").toggleClass("active");
    $(".support-block-stages-compare-header .heading-3").toggleClass("active");
    $(this).closest(".support-block-stages-compare-title").next(".support-block-stages-compare-table").toggleClass("active");
  });
  $('.support-block-stages-compare-single').hover(function () {
    var datahover = $(this).data("compare_table");
    $("*[data-compare_table='" + datahover + "']").toggleClass("hover");
  });
  $(document).ready(storeslider);
  $(window).on('resize', storeslider);
  function storeslider() {
    $('.our-projects-slider').not('.slick-initialized').slick({
      responsive: [
        {
          breakpoint: 9999,
          settings: "unslick"
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            prevArrow: false,
            nextArrow: false,
            dots: true,
            arrows: true,
            speed: 700,
          }
        }
      ]
    });
  }

  $(document).ready(jpegslider);
  $(window).on('resize', jpegslider);
  function jpegslider() {
    $('.progressive-jpg-block').not('.slick-initialized').slick({
      responsive: [
        {
          breakpoint: 9999,
          settings: "unslick"
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            prevArrow: false,
            nextArrow: false,
            infinite: false,
            dots: true,
            arrows: false,
            speed: 700,
          }
        }
      ]
    });
  }

  $(document).ready(clientswidelider);
  $(window).on('resize', clientswidelider);
  function clientswidelider() {
    $('.our-clients-wide-slider').not('.slick-initialized').slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      centerPadding: '10%',
      infinite: false,
      dots: false,
      arrows: true,
      speed: 700,
      prevArrow: '<button class="button-slider slider-circle-button ico-arrow-left" aria-label="Previous" type="button" ></button>',
      nextArrow: '<button class="button-slider slider-circle-button ico-arrow-right" aria-label="Next" type="button"></button>',
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 1,
            dots: true,
          }
        },
        {
          breakpoint: 991,
          settings: {
            slidesToShow: 1,
            arrows: false,
            dots: true,
            prevArrow: false,
            nextArrow: false
          }
        }
      ]
    });
  }

  $(document).ready(priceblockslider);
  $(window).on('resize', priceblockslider);
  function priceblockslider() {
    $('.price-block-slider').not('.slick-initialized').slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      centerPadding: '10%',
      infinite: false,
      dots: true,
      arrows: false,
      prevArrow: false,
      nextArrow: false,
      speed: 700,
      prevArrow: '<button class="button-slider slider-circle-button ico-arrow-left" aria-label="Previous" type="button" ></button>',
      nextArrow: '<button class="button-slider slider-circle-button ico-arrow-right" aria-label="Next" type="button"></button>',
      responsive: [
        {
          breakpoint: 9999,
          settings: "unslick"
        },
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 1,
            dots: true,
          }
        },
        {
          breakpoint: 991,
          settings: {
            slidesToShow: 1,
            arrows: false,
          }
        }
      ]
    });
  }

  $(document).ready(timelinecontentmobileslider);
  $(window).on('resize', timelinecontentmobileslider);
  function timelinecontentmobileslider() {
    $('.timeline-content-mobile-slider').not('.slick-initialized').slick({
      responsive: [
        {
          breakpoint: 9999,
          settings: "unslick"
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: false,
            speed: 700,
            arrows: false,
            dots: true,
          }
        }
      ]
    });
  }
  $(document).ready(competenceslider);
  $(window).on('resize', competenceslider);
  function competenceslider() {
    $('.competence-slider').not('.slick-initialized').slick({
      responsive: [
        {
          breakpoint: 9999,
          settings: "unslick"
        },
        {
          breakpoint: 991,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: false,
            speed: 700,
            arrows: false,
            dots: true,
          }
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: false,
            speed: 700,
            arrows: false,
            dots: true,
          }
        }
      ]
    });
  }

  $(document).ready(pricecolumnsslider);
  $(window).on('resize', pricecolumnsslider);
  function pricecolumnsslider() {
    $('.price-columns-slider').not('.slick-initialized').slick({
      responsive: [
        {
          breakpoint: 9999,
          settings: "unslick"
        },
        {
          breakpoint: 991,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: false,
            speed: 700,
            arrows: false,
            dots: true,
          }
        }
      ]
    });
  }
  $(document).ready(kalibr3dblocknumbersslider);
  $(window).on('resize', kalibr3dblocknumbersslider);
  function kalibr3dblocknumbersslider() {
    $('.kalibr-3d-block-numbers-slider').not('.slick-initialized').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      centerPadding: '10%',
      infinite: false,
      dots: false,
      arrows: true,
      speed: 700,
      prevArrow: '<button class="button-slider slider-circle-button ico-arrow-left" aria-label="Previous" type="button" ></button>',
      nextArrow: '<button class="button-slider slider-circle-button ico-arrow-right" aria-label="Next" type="button"></button>',
      responsive: [
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: false,
            speed: 700,
            arrows: false,
            dots: true,
          }
        }
      ]
    });
  }
  $(document).ready(kalibr3dschemeslide);
  $(window).on('resize', kalibr3dschemeslide);
  function kalibr3dschemeslide() {
    $('.kalibr-3d-scheme-slide').not('.slick-initialized').slick({
      responsive: [
        {
          breakpoint: 9999,
          settings: "unslick"
        },
        {
          breakpoint: 991,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: false,
            centerPadding: '10%',
            speed: 700,
            arrows: false,
            dots: true,
          }
        }
      ]
    });
  }
	$(document).ready(fullwidthslider);
  	$(window).on('resize', fullwidthslider);
	  function fullwidthslider() {
		$('.full-width-slider.slider').not('.slick-initialized').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			dots: false,
			arrows: false,
			responsive: [{
				breakpoint: 767,
				settings: {
					dots: true,
				}
			}]
		});
	  }
	$('.full-width-slider-arrow.ico-arrow-left').click(function () {
	  $('.full-width-slider.slider').slick('slickPrev');
	})
	
	$('.full-width-slider-arrow.ico-arrow-right').click(function () {
	  $('.full-width-slider.slider').slick('slickNext');
	})
  $(document).ready(kalibrsiteblockprototypeslider);
  $(window).on('resize', kalibrsiteblockprototypeslider);
  function kalibrsiteblockprototypeslider() {
    $('.kalibr-site-block-prototype-slider').not('.slick-initialized').slick({
      responsive: [
        {
          breakpoint: 9999,
          settings: "unslick"
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: false,
            speed: 700,
            arrows: false,
            dots: true,
          }
        }
      ]
    });
  }
});
$(document).ready(function () {
  $(function(){
    $('.project-block-img').hover(function() {
      $(this).closest('.project-block').find('.js-hover-background').toggleClass("hover");
    })
  })
  $(function(){
    $('.js-hover-background').hover(function() {
      $(this).closest('.project-block').find('.project-block-img').toggleClass("hover");
    })
  })
});