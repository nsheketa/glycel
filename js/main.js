var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
var h = $(window).height();
var controller;

$(document).ready(function () {
    homepageParallax();
    productsAnimation();
    selectChange();

    $(".hamburger").click(function () {
        $(this).toggleClass("active");
        $('.header__inner').toggleClass('header__inner-visible');
        $("body, html").toggleClass('no-scroll');
    });

    $('.header__link').on('click', function (e) {
        if ($('.header__inner').hasClass('header__inner-visible')) {
            $(".hamburger").removeClass("active");
            $('.header__inner').removeClass('header__inner-visible');
            $("body, html").removeClass('no-scroll');
        }
    });

    function selectChange() {
        $(".form-select__wrap").each(function () {
            $(this).find("p").text($(this).find("select option:selected").text());
        })
    }

    $(".form-select__wrap select").on('change', function () {
        selectChange();
    });

    $('.feature-product__slider').slick({
        dots: true,
        arrows: false
    });

    //feature tabs
    $(".header-features__item").click(function (e) {
        var $this = $(this),
            attr = $(this).attr('href');
        e.preventDefault();
        $this.addClass("active").siblings(".header-features__item").removeClass('active');
        $('.feature-tab__content-wrap').find('.feature-tab__content' + attr).addClass('active').siblings('.feature-tab__content').removeClass('active');
        $('.feature-tab__content.active').find('.feature-tab__images').addClass('active');
        $('.feature-tab__content').find('.feature-product__slider').addClass('hidden');
    });


    //products list animation
    function productsAnimation() {
        var isiPhone = navigator.userAgent.toLowerCase().indexOf("iphone");
        var isiPad = navigator.userAgent.toLowerCase().indexOf("ipad");
        var isiPod = navigator.userAgent.toLowerCase().indexOf("ipod");
        if(isiPhone > -1 || isiPad > -1 || isiPod > -1){
            if ($(window).width() <= 1024){
                $('.products-list__item').on('mouseenter',function (e) {
                    var $this = $(this),
                        thisAttr = $this.attr('data-img'),
                        thisParents = $this.parents('.feature-tab__content'),
                        img = $('.feature-tab__img' + '.' + thisAttr),
                        slider = $('.feature-product__slider'),
                        parentsAttr = $this.parent().attr('data-feature-tab');

                    if(thisParents.is('.feature-tab__product')){
                        slider.addClass('hidden');
                    }
                    thisParents.find('.feature-tab__images').addClass('active');
                    thisParents.find('.feature-tab__img').removeClass('active');
                    thisParents.find(img).addClass('active');
                    $('.header-features').find('.header-features__item.' + parentsAttr).addClass('active').siblings('.header-features__item').removeClass('active');
                });
            }
        }
        else{
            $('.products-list__item').on('click',function (e) {
                var $this = $(this),
                    thisAttr = $this.attr('data-img'),
                    thisParents = $this.parents('.feature-tab__content'),
                    img = $('.feature-tab__img' + '.' + thisAttr),
                    slider = $('.feature-product__slider'),
                    parentsAttr = $this.parent().attr('data-feature-tab');

                if(thisParents.is('.feature-tab__product')){
                    slider.addClass('hidden');
                }

                thisParents.find('.feature-tab__images').addClass('active');
                thisParents.find('.feature-tab__img').removeClass('active');
                thisParents.find(img).addClass('active');
                $('.header-features').find('.header-features__item.' + parentsAttr).addClass('active').siblings('.header-features__item').removeClass('active');
            });
        }
    }

    //images over slider


    //parallax
    function homepageParallax() {
        controller = new ScrollMagic.Controller({vertical: true});
        // build tween
        $(".parallax-fast-01").each(function () {
            var tl = new TimelineMax();
            tl.to(this, 1, {y: 60, ease: Ease.easeNone});

            // build scene
            var scene = new ScrollMagic.Scene({
                triggerElement: ".service",
                offset: 200,
                duration: $('.service').height() * 2
            })
                .setTween(tl)
                // .addIndicators() // add indicators (requires plugin)
                .addTo(controller);
        });

        $(".parallax-fast-02").each(function () {
            $(".parallax-fast-02").css('margin-top', '-3px');
            var tl = new TimelineMax();
            tl.to(this, 1, {y: 55, ease: Ease.easeNone});

            // build scene
            var scene = new ScrollMagic.Scene({
                triggerElement: this,
                offset: 0,
                duration: $('.service').height() * 1.7
            })
                .setTween(tl)
                // .addIndicators() // add indicators (requires plugin)
                .addTo(controller);
        });

        $(".parallax-slow").each(function () {
            var tl = new TimelineMax();

            tl.to(this, 1, {y: -10, ease: Ease.easeNone});

            // build scene
            var scene = new ScrollMagic.Scene({triggerElement: ".service", duration: $('.service').height() * 2})
                .setTween(tl)
                // .addIndicators() // add indicators (requires plugin)
                .addTo(controller);
        });
    }

    $('.series-slider').slick({
        dots: false,
        arrows: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [{
            breakpoint: 768,
            settings: {
                slidesToShow: 1
            }
        }]
    });

    $('.series-slider__item').on('click', function () {
        var $this = $(this),
            attr = $(this).attr('data-slide');

        console.log($this);
        console.log(attr);

        $('.series-slider__item').removeClass('active');
        $this.addClass('active');

        $this.parents('.series').find('.series__tab-img').removeClass('active');
        $this.parents('.series').find('.series__tab-img' + attr).addClass('active');
    });

    //products page

    $('.product-menu__title').on('click',function (e) {
        $('.product-menu').toggleClass('opened');
    });
    $(document).on('click',function (event) {
        if(!$(event.target).closest('.product-menu.opened,.product-menu__title').length){
            $('.product-menu').removeClass('opened');
        }
    });

    controller = new ScrollMagic.Controller();

    $(window).on('resize', function () {
        productsAnimation();
    })

    //contact page

    $('.location-map__comment').on('click',function (e) {
        e.preventDefault();
        var $this = $(this),
            attr = $this.attr('href');

        $('#overlay').addClass('active');
        $('.main.contact').find('.contact-details__modal' + attr).addClass('active');
    });

    $('#overlay, .modal-close').on('click', function(e){
        // if(!$(event.target).closest('.contact-details__modal.active').length){
            $('#overlay').removeClass('active');
            $('.contact-details__modal.active').removeClass('active');
        // }
    });

});

$(window).on('load', function () {

});
