/**
 * Main JS file for Casper behaviours
 */

/* globals jQuery, document */
(function ($, undefined) {
    "use strict";

    var $document = $(document);

    $document.ready(function () {

        var $postContent = $(".post-content");
        $postContent.fitVids();

        $(".scroll-down").arctic_scroll();

        $(".menu-button, .nav-cover, .nav-close").on("click", function(e){
            e.preventDefault();
            $("body").toggleClass("nav-opened nav-closed");
        });

    });

    // Arctic Scroll by Paul Adam Davis
    // https://github.com/PaulAdamDavis/Arctic-Scroll
    $.fn.arctic_scroll = function (options) {

        var defaults = {
            elem: $(this),
            speed: 500
        },

        allOptions = $.extend(defaults, options);

        allOptions.elem.click(function (event) {
            event.preventDefault();
            var $this = $(this),
                $htmlBody = $('html, body'),
                offset = ($this.attr('data-offset')) ? $this.attr('data-offset') : false,
                position = ($this.attr('data-position')) ? $this.attr('data-position') : false,
                toMove;

            if (offset) {
                toMove = parseInt(offset);
                $htmlBody.stop(true, false).animate({scrollTop: ($(this.hash).offset().top + toMove) }, allOptions.speed);
            } else if (position) {
                toMove = parseInt(position);
                $htmlBody.stop(true, false).animate({scrollTop: toMove }, allOptions.speed);
            } else {
                $htmlBody.stop(true, false).animate({scrollTop: ($(this.hash).offset().top) }, allOptions.speed);
            }
        });

    };
})(jQuery);

$.fn.progressScroll = function(options){
	var settings = $.extend({
		fontSize : 20,
		fontFamily : 'sans-serif',
		color : '#009ACF',
		height : '5px',
		textArea : 'dark',
	}, options);

	// namespace
	var progress = {};
	if(settings.textArea === 'dark'){
		$('.scrollWrapper').css({"background-color": "rgba(0,0,0,0.75)"});
		$('.scrollWrapper h3').css({"color": "white"});
	} else {
		$('.scrollWrapper').css({"background-color": "rgba(255,255,255,0.75)"});
		$('.scrollWrapper h3').css({"color": "black"});

	}
	progress.targetScroll = 0;
	progress.headHeight = $('header').outerHeight();
	progress.screenh = screen.height;
	progress.divHeight = $(this).outerHeight();
	progress.numberOfH2 = $('h2').length;
	console.log(progress.numberOfH2);
	console.log("divHeight "+progress.divHeight);
	console.log("headHeight "+progress.headHeight);

	$(window).scroll(function() {
	  	var scrollAmount = $(this).scrollTop() - progress.headHeight ;
	  	var scrollPercent = ((scrollAmount)/(progress.divHeight - progress.screenh))*100;
		// console.log("scroll amount"+scrollAmount);
		// console.log("scroll percent "+scrollPercent+"%");
		// console.log("screen height"+progress.screenh)

		//blank out the text if above the first h2 tag
		if(scrollAmount <= $('h2:first').position().top){
			$('.scrollWrapper h3').text('');
		}

		//everytime it passes an h2 it grabs it's text
		$('h2').each(function() {
			if(scrollAmount + progress.headHeight >= $(this).position().top){
				var text = $(this).text();
	    		$('.scrollWrapper h3').text(text);
	    		// console.log("this pos top "+$(this).position().top)
	    		// $('.scroll-bar').toggleClass('orange');
			};
		});


		//calculate scroll amount
	    $('.scroll-bar').css('width', scrollPercent+'%' );
	    // $('.scroll-bar').css('opacity', scrollPercent/100 );
	    if( scrollAmount >= progress.targetScroll){
	    	$('.scrollWrapper').removeClass('hidden');
		} else {
			$('.scrollWrapper').addClass('hidden');
		};
	 
	}); //end window scroll

	var $el = $('.scroll-bar').css(settings); 
	return $el;
// });
}

$(function() {
	
	$('.content').progressScroll({
		backgroundColor: "#f71735;",
		height : "1px",
	});

});

$(document).ready(function() {
    var txt = $('.content')[0].textContent,
    wordCount = txt.replace( /[^\w ]/g, "" ).split( /\s+/ ).length;

    var readingTimeInMinutes = Math.floor(wordCount / 250) + 1;
    var readingTimeAsString = readingTimeInMinutes + " min read | ";
    $('article .reading-time').html(readingTimeAsString);
});