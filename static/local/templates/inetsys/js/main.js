$(document).ready(function () {
    if (typeof(grecaptcha) == 'undefined') {
        var grecaptcha_s = document.createElement('script');
        grecaptcha_s.src = 'https://www.google.com/recaptcha/api.js?render=6Ld11cUdAAAAALJgDBWnFNwHYaenc35jvSa3umuy';

        var grecaptcha_h = document.getElementsByTagName('script')[0];
        grecaptcha_h.parentNode.insertBefore(grecaptcha_s,grecaptcha_h);
    } else {
        grecaptcha.ready(function () {
            grecaptcha.execute('6Ld11cUdAAAAALJgDBWnFNwHYaenc35jvSa3umuy', {action: 'feedback'}).then(
                function (token) {
                    $('form input[name="g_recaptcha_response"]').val(token);
                }
            );
        });
    }
    /*$("img.lazy").lazyload({
        effect : "fadeIn",
        placeholder : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXY/j///9/AAn7A/0FQ0XKAAAAAElFTkSuQmCC",
        threshold : 300
    })*/
    $('#form').validate({
        rules: {
            form_text_2: {
                required: true
            },
            form_text_3: {
                required: true
            },
            form_text_4: {
                required: true
            },
            ch0: {
                required: true
            }
        },
        errorPlacement: function (error, element) {
        },
        submitHandler: function (form) {
            $(this).parents('.form').fadeToggle();
            $(this).parents('.form').removeClass("active");
            $('.form-saccess').fadeToggle();
            $('.form-saccess').toggleClass("active");
            form.submit();
        },

    });
    $('#bottom-form').validate({
        rules: {
            form_text_5: {
                required: true
            },
            form_text_6: {
                required: true
            },
            form_text_7: {
                required: true
            },
            ch1: {
                required: true
            }
        },
        errorPlacement: function (error, element) {
        },

    });


    $('.acceleration-form').validate({
        rules: {
            ch0: {
                required: true
            }
        },
        errorPlacement: function (error, element) {
        }
    });
    $('#tarif').validate({
        rules: {
            form_text_8: {
                required: true
            },
            form_text_9: {
                required: true
            },
            form_text_10: {
                required: true,
                email: true
            }
        },
        errorPlacement: function (error, element) {
        },
    });
    $('body').on('click','form input, form textarea', function() {
        if (typeof(grecaptcha) == 'undefined') {
            var grecaptcha_s = document.createElement('script');
            grecaptcha_s.src = 'https://www.google.com/recaptcha/api.js?render=6Ld11cUdAAAAALJgDBWnFNwHYaenc35jvSa3umuy';

            var grecaptcha_h = document.getElementsByTagName('script')[0];
            grecaptcha_h.parentNode.insertBefore(grecaptcha_s,grecaptcha_h);
        } else {
            grecaptcha.ready(function () {
                grecaptcha.execute('6Ld11cUdAAAAALJgDBWnFNwHYaenc35jvSa3umuy', {action: 'feedback'}).then(
                    function (token) {
                        $('form input[name="g_recaptcha_response"]').val(token);
                    }
                );
            });
        }
    });
    $('body').on('click','form .web_form_submit, form .web_form_submit', function() {
        if (typeof(grecaptcha) != 'undefined') {
            grecaptcha.ready(function () {
                grecaptcha.execute('6Ld11cUdAAAAALJgDBWnFNwHYaenc35jvSa3umuy', {action: 'feedback'}).then(
                    function (token) {
                        $('form input[name="g_recaptcha_response"]').val(token);
                    }
                );
            });
        }
    });
    $('.js-form-have-project').on('click', function (e) {
        e.preventDefault();
        $('.form-have-project').fadeToggle();
        $('.form-have-project').toggleClass("active");
        $('body').css('overflow-y', 'hidden');

    });

    $('.form-close,.js-form-close').on('click', function (e) {
        $(this).parents('.form').fadeToggle();
        $(this).parents('.form').removeClass("active");
        $('body').css('overflow-y', 'auto');

    });



    $('.form-bg').on('click', function (e) {
        $('.form.active').fadeToggle();
        $('.form.active').removeClass("active");
        $('body').css('overflow-y', 'auto');
    });
    $('.specialization__item-img').on('click', function (e) {
        $(this).parents('.specialization-item').find('.specialization-item-inner').toggleClass("active");
    });

    $('.header-tabs_nav-item').on('click', function (e) {
        $('.header-tabs_nav-item').removeClass("active");
        $(this).addClass("active");
        $('.tab-content_item').removeClass("active").hide();
        $('.tab-content_item').eq($(this).index()).addClass("active").fadeIn();
        if ($(window).width() > 991) {
            if ($(this).index() == 1) {
                $('.header-img img').hide();
                $('.header-img img').show();
                $('.header-content .header-img_mein').hide();
                $('.header-content .teg').hide();
                $('.header-content .detail').hide();
                $('.header-img_mein-mb').hide();
                $('.header-img_mein2-mb').hide();

                $('.header-content .header-img_mein2').fadeIn();
                $('.header-content .hart').fadeIn();
                $('.header-content .wifi').fadeIn();

            } else {
                $('.header-img img').hide();
                $('.header-img img').show();
                $('.header-content .header-img_mein2').hide();
                $('.header-content .hart').hide();
                $('.header-content .wifi').hide();
                $('.header-img_mein-mb').hide();
                $('.header-img_mein2-mb').hide();

                $('.header-content .teg').fadeIn();
                $('.header-content .detail').fadeIn();
                $('.header-content .header-img_mein').fadeIn();
            }
        }
    });

    function activateheadercolor() {
        var stf = $(".hc_js_1").height() + $(".hc_js_2").height();
        var st = $(window).scrollTop() / stf;
        if (stf > $(window).scrollTop())
            $(".header-color-js").css({
                "background-color": "rgb(241 248 254 / " + (1 - st * 0.95) + ")"
            });
    }

    $(window).bind('scroll', activateheadercolor);

    function scrollShow() {
        var vh = $(this).height();
        var sct = $(window).scrollTop();
        $(".section-title-js").each(function (index) {
            var title = $(".section-title-js");
            var of = title.eq(index).offset().top;
            var bh = title.parents("section").height();
            if (sct > of - vh && sct < of + bh) {
                if (sct > of - vh / 1.15) {
                    title.eq(index).closest(".animate-block").addClass('scroll-here');
                }
            }
        });
    };
    $(window).bind('scroll', scrollShow);

    function onloadShow() {
        var vh = $(this).height();
        var sct = $(window).scrollTop();
        $(".animate-block").each(function (index) {
            var block = $(".animate-block");
            var of = block.eq(index).offset().top;
            if (sct > of - vh / 1.15) {
                block.eq(index).addClass('scroll-here');
            }
        });
        $('.animate-block.scroll-here:not(.animate-block-first)').prevAll('.animate-block:not(.scroll-here)').addClass('scroll-here');
    }

    $(window).on('load', onloadShow);


    $('.header-content').on('mousemove', function (e) {
        if ($(window).width() > 991) {
            var mouseX = e.pageX / 2;
            var mouseY = (e.pageY - $('.header-content').offset().top);

            $('.header-content .paralax-img').each(function () {
                var z = parseInt($(this).data("z"));
                var y = parseInt($(this).data("y"));
                $(this).css('transform', 'translate(' + (mouseX * (z * 0.012)) + 'px, ' + (mouseY * (y * 0.03)) + 'px)');
            });


        }
    });

    var cardsSliderList = $('.js-slider-card').html();

    function cardsSliderScroll() {
        $(".js-slider-card").mCustomScrollbar({
            axis:"x",
            theme:"dark-thick",
            autoExpandScrollbar:true,
            advanced:{autoExpandHorizontalScroll:true},
            mouseWheel:{ enable: false },
            updateOnContentResize:true,
            scrollbarPosition: 'outside',
            scrollInertia: 0,
            alwaysShowScrollbar: 0
        });
    }
        cardsSliderScroll();

    
    var clientsSliderList = $('.clients-slider').html();

    function clientsSliderScroll() {
        $(".clients-slider").mCustomScrollbar();
    }

    function clientsSlider() {
        $('.clients-slider').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
            arrows: false,

        });
    }

    if ($(window).width() > 991) {
        clientsSliderScroll();
    }
    if ($(window).width() < 991) {
        clientsSlider();
    }
    $(window).bind('resize', function () {
        if ($(window).width() > 991) {
            if ($(".clients-slider").hasClass("slick-initialized")) {
                $(".clients-slider").find(".slick-cloned").remove();
            }
            clientsSliderScroll();
        }
    });


    if ($(".clients-slider").length > 0) {
        $(window).bind('resize', function () {
            if ($(window).width() < 991) {
                $(".clients-slider").mCustomScrollbar('destroy');
                clientsSlider();
            }
        });
    }

    $('.develop-slider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        dots: true,
        arrows: true,
        speed: 700,
        prevArrow: '<button class="button-slider slider-circle-button ico-arrow-left" aria-label="Previous" type="button" ></button>',
        nextArrow: '<button class="button-slider slider-circle-button ico-arrow-right" aria-label="Next" type="button"></button>',
        responsive: [{
            breakpoint: 1200,
            settings: {
                slidesToShow: 3,
            }
        },
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 2,
                    arrows: false,
                }
            },
            {
                breakpoint: 550,
                settings: {
                    slidesToShow: 1,
                    dots: true,
                    arrows: false,
                }
            }
        ]
    });
    $('.project-list').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
        arrows: false,
        responsive: [{

            breakpoint: 550,
            settings: {
                dots: true,
            }
        }]

    });


    $('.project-list-next').on('click', function () {
        $('.project-list').slick('slickNext');
    });


    $('.project-list-prev').on('click', function () {
        $('.project-list').slick('slickPrev');

    });


    $('.acceleration-form input').change(function () {
        if ($(this).val() == "" || $(this).val() == " ") {
            $(this).removeClass("success");
            $(this).addClass("error");
        } else {
            $(this).removeClass("error");
            $(this).addClass("success");
        }

    });


    $(function () {
        $('.price_block_choose').click(function (e) {
            //e.preventDefault();
            tarif = $(this).data('tarif');
            var sc = $(this).attr("href");
            var dn = $(sc).offset().top;

            $('.list').find('li.selected').removeClass('selected');
            $('.list').find('li').each(function(){
                if ($(this).data('value')==tarif) {
                    text = $(this).text();
                    $(this).addClass('selected');
                    $('span.current').text(text);
                }
            });
            $('html,body').animate({scrollTop:dn},800);
        });
    });
    $(function(){
        $('.cookie-button').click(function (e) {
            setCookie('agree_with_cookie', 'Y', {path: '/', expires: 60 * 60 * 24 * 365 * 10});
            $('.cookie-popup').fadeToggle();
        })
    });
});

function setCookie(name, value, options) {
    options = options || {}; //по умолчанию нет параметров (допустимые: expires, domain, secure, path)
    var expires = options.expires;

    if (typeof expires === "number" && expires) { //если указано время жизни, и это число
        var d = new Date();
        d.setTime(d.getTime() + expires * 1000); //expires в секундах
        expires = options.expires = d;
    }
    if (expires && expires.toUTCString) {
        options.expires = expires.toUTCString();
    }

    value = encodeURIComponent(value);
    var data = name + "=" + value; //строка в формате cookie имеет вид "имя_куки=значение"

    for (var propName in options) {   //дописываем параметры кук (domain, secure, path)
        data += "; " + propName;
        var propValue = options[propName];
        if (propValue !== true) {
            data += "=" + propValue;
        }
    }

    document.cookie = data; //сохраняем куку
}
var i = 12;
var scrollPos = 0;
var scrollTop = false;
$(window).on('scroll', function() {
    var currScroll = $(document).scrollTop();
    var currElem = $(".slider-card .js-slider-card");
    if(currElem.length) {
        var currElemScroll = $(".slider-card .js-slider-card").offset().top;
        var currElemHeight = currElem.height();
        if(currScroll > scrollPos) {
            scrollTop = true;
        } else {
            scrollTop = false;
        }
        var pos1 = currScroll + screen.height - currElemHeight/2 - currElemScroll;
        var pos2 = currScroll - currElemHeight - currElemScroll;
        console.log("pos1="+pos1);
        console.log("pos2="+pos2);
        console.log("i="+i);
        var res = pos1-pos2;
        res = res/100;
        console.log("res="+res);
        if(pos1<0) {
            i=2;
        } else if (pos2>0) {
            i=100;
        }

        if(pos1>=0) {
                if (scrollTop == true && i + 2 <= 100) {
                    i = i + 2;
                } else if(scrollTop != true && i - 2 >= 0) {
                    i = i - 2;
                }
        }
        scrollPos = currScroll;

            $(".slider-card .js-slider-card").mCustomScrollbar('scrollTo', i+"%");
    }
});