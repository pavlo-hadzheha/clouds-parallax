
$(function() {
    'use strict';
    const SCROLL_TIME = 2000;
    const SCROLL_EASING = 'easeOutCubic';

    const CLOUD_OFFSET = getCloudOffsets();
    window.CLOUD_OFFSET = getCloudOffsets();

    $('.arrow').click(function() {
        let section = $(this).closest('.section');
        let sectionHeight = section.outerHeight();
        let offsetTop = section.offset().top;
        if($(this).is('.arrow-up')){
            animateScroll(offsetTop - sectionHeight);
        } else {
            animateScroll(offsetTop + sectionHeight);
        } 
    });

    $('.nav-dots .dot').click(function() {
        let id = $(this).attr('href');
        let offsetTop = $(id).offset().top;
        animateScroll(offsetTop);
    });

    $(window).scroll(() => {

        let within = function(s, plusHalf=true) {
            let windowCenter = window.scrollY + plusHalf*document.documentElement.clientHeight / 2;
            return s.top < windowCenter && s.bottom > windowCenter;
        }

        // Nav-dots change
        let sectionBoundaries = getSectionBoundaries();
        for(let key of Object.keys(sectionBoundaries)){
            if(within(sectionBoundaries[key])){ 
                colorNavDot(key)
            }
        }


        // animate clounds;
        let s1 = sectionBoundaries['#first-flights'];
        let s2 = sectionBoundaries['#parachute'];
        let s3 = sectionBoundaries['#english-channel'];

        if(within(s1, false)){
            const SCROLL_COEFF = [0.1, 0.30, 0.44, 0.1, 0.5]
            let disp = window.scrollY - s1.top;
            $('.cloud').filter('.s1').each(function(i,elem){
                let offset = CLOUD_OFFSET[i];
                $(elem).css('top', offset + SCROLL_COEFF[i] * disp);
            });
        }

        if(within(s2, false)){
            const SCROLL_COEFF = [0.1, 0.5]
            let disp = window.scrollY;
            $('.cloud').filter('.s2').each(function(i,elem){
                let offset = CLOUD_OFFSET.slice(3,5)[i];
                $(elem).css('top', offset + SCROLL_COEFF[i] * disp);
            });
        }

        if(within(s3, false)){
            const SCROLL_COEFF = [0.5, 0.5];
            let disp = window.scrollY - s3.top;
            $('.cloud').filter('.s3').each(function(i,elem){
                let offset = CLOUD_OFFSET.slice(-2)[i];
                $(elem).css('top', offset + SCROLL_COEFF[i] * disp);
            });
        }

    });


    function getSectionBoundaries(){
        let obj = {};
        $('.section').each(function(_, elem) {
            let id = '#'+$(elem).attr('id');
            let top = $(elem).offset().top;
            let bottom = $(elem).offset().top + $(elem).outerHeight();
            obj[id] = {
                top: top,
                bottom: bottom
            }
        });
        return obj;
    }

    function animateScroll(offset){
        $('html').finish().animate({
            scrollTop: offset,
        }, SCROLL_TIME, SCROLL_EASING);
    }

    function colorNavDot(href){
        $('.dot').removeClass('picked');
        $('.dot').filter(`[href*="${ href }"]`).addClass('picked');
    }

    function getCloudOffsets(){
        let offsets = [];
        for(const c of $('.cloud')){
            offsets.push($(c).offset().top);
        }
        return offsets;
    }


    window.onbeforeunload = function () {
        this.scrollTo(0,0);
    };
});
