/*======================================================================
 Table of Content:

 01. Menu Toggle
 02. Page Pilling
 03. Tooltip
 04. Skills LineProgressbar
 05. jQuery counterUp
 06. Porfolio Isotope Filter
 07. Magnific Popup
    7.1. Image Gallery Popup
    7.2. Youtube - Vimeo - SoundCloud Popup
    7.3. Porfolio Detail Popup
    7.4. Blog Detail Popup
 08. Form Validation
 ========================================================================*/


(function ($) {
    // Start of use strict
    'use strict';

    /*--------------------------------
     01. Menu Toggle
     ----------------------------------*/
    $('.menu-toggle').on("click", function () {
        $('.overlay-menu').addClass('toggled');
        $('.overlay-menu').toggleClass('mobile-menu-hide');
        $('.menu-toggle').toggleClass('open');
    });
    function mobileMenuHide() {
        var siteHeader = $('.overlay-menu');
        siteHeader.addClass('mobile-menu-hide');
        $('.menu-toggle').removeClass('open');
        setTimeout(function () {
            siteHeader.addClass('toggled');
        }, 500);
    }
    $('.overlay-menu').on("click", ".main-navigation", function () {
        mobileMenuHide();
    });

    /*-------------------------
     02. Page Pilling
     -------------------------*/
    function page_piling() {
        $('#pagepiling').pagepiling({
            menu: '#menu',
            direction: 'vertical',
            verticalCentered: true,
            sectionsColor: [],
            anchors: ['home', 'about'],
            scrollingSpeed: 700,
            easing: 'swing',
            loopBottom: false,
            loopTop: false,
            css3: true,
            navigation: {
                'position': 'right',
                'tooltips': ['HOME', 'ABOUT ME']
            },
            normalScrollElements: null,
            normalScrollElementTouchThreshold: 5,
            touchSensitivity: 5,
            keyboardScrolling: true,
            sectionSelector: '.section',
            animateAnchor: true,
            //events
            onLeave: function (index, nextIndex, direction) {},
            afterLoad: function (anchorLink, index) {},
            afterRender: function () {}
        });
    }
    page_piling();

    /*--------------------------------
     03. Tooltip
     ----------------------------------*/
    function tooltip() {
        $('[data-toggle="tooltip"]').tooltip();
    }
    tooltip();

    /*--------------------------------
     04. Skills LineProgressbar
     ----------------------------------*/
    function skill_linux() {
        $('#linux').LineProgressbar({
            percentage: 100,
            radius: '3px',
            height: '10px',
            duration: 6000,
            backgroundColor: '#ddd'
        });
    }
    skill_linux();

    function skill_networking() {
        $('#networking').LineProgressbar({
            percentage: 100,
            radius: '3px',
            height: '10px',
            duration: 6000,
            backgroundColor: '#ddd'
        });
    }
    skill_networking();

    function skill_secops() {
        $('#secops').LineProgressbar({
            percentage: 85,
            radius: '3px',
            height: '10px',
            duration: 6000,
            backgroundColor: '#ddd'
        });
    }
    skill_secops();

    function skill_cloud() {
        $('#cloud').LineProgressbar({
            percentage: 90,
            radius: '3px',
            height: '10px',
            duration: 6000,
            backgroundColor: '#ddd'
        });
    }
    skill_cloud();

    function skill_cicd() {
        $('#cicd').LineProgressbar({
            percentage: 75,
            radius: '3px',
            height: '10px',
            duration: 6000,
            backgroundColor: '#ddd'
        });
    }
    skill_cicd();

    function skill_kubernetes() {
        $('#kubernetes').LineProgressbar({
            percentage: 80,
            radius: '3px',
            height: '10px',
            duration: 6000,
            backgroundColor: '#ddd'
        });
    }
    skill_kubernetes();

    function skill_serverless() {
        $('#serverless').LineProgressbar({
            percentage: 75,
            radius: '3px',
            height: '10px',
            duration: 6000,
            backgroundColor: '#ddd'
        });
    }
    skill_serverless();

    function skill_cdns() {
        $('#cdns').LineProgressbar({
            percentage: 80,
            radius: '3px',
            height: '10px',
            duration: 6000,
            backgroundColor: '#ddd'
        });
    }
    skill_cdns();

    /*--------------------------------
     05. jQuery counterUp
     ----------------------------------*/
    function counter_number() {
        $('.counter').countUp();
    }
    counter_number();

    /*--------------------------------
     06. Porfolio Isotope Filter
     ----------------------------------*/
    $(window).on('load', function () {
        /* Porfolio Filter */
        var portfolioIsotope = $('.portfolio-container').isotope({
            itemSelector: '.portfolio-item',
            layoutMode: 'fitRows'
        });
        $('#portfolio-flters li').on('click', function () {
            $("#portfolio-flters li").removeClass('filter-active');
            $(this).addClass('filter-active');
            portfolioIsotope.isotope({
                filter: $(this).data('filter')
            });
        });

        /* Preloader */
        $('.preloader').removeClass("active");
    });

    /*--------------------------------
     7.1. Image Gallery Popup
     ----------------------------------*/
    function image_gallery() {
        $('.gallery-popup-btn').magnificPopup({
            type: 'image',
            gallery: {
                enabled: true
            }
        });
    }
    image_gallery();

    /*--------------------------------
     7.2. Youtube - Vimeo - SoundCloud Popup
     ----------------------------------*/
    function video_soundcloud() {
        $('.magnific-youtube,.magnific-vimeo,.magnific-soundcloud').magnificPopup({
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 300,
            preloader: true,
            fixedContentPos: false
        });
    }
    video_soundcloud();

    /*--------------------------------
     7.3. Porfolio Detail Popup
     ----------------------------------*/
    function porfolio_detail_popup() {
        $('.portfolio-detail-popup').magnificPopup({
            type: 'inline',
            mainClass: 'mfp-fade',
            preloader: true,
            gallery: {
                enabled: true
            }
        });
    }
    porfolio_detail_popup();

    /*--------------------------------
     7.4. Blog Detail Popup
     ----------------------------------*/
    function blog_detail_popup() {
        $('.blog-detail-popup').magnificPopup({
            type: 'inline',
            mainClass: 'mfp-fade',
            preloader: true,
            gallery: {
                enabled: true
            }
        });
    }
    blog_detail_popup();

    /*--------------------------------
     08. Form Validation
     ----------------------------------*/
    window.addEventListener('load', function () {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function (form) {
            form.addEventListener('submit', function (event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);

})(jQuery);
