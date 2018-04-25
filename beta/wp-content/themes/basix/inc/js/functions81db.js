jQuery(document).ready(function ($) {

	/* ---------------------------------------------------------------- */
	/* Transparent Header (Set per page by end user)
	/* ---------------------------------------------------------------- */

	if ($('body').hasClass("dark_transparent_header")) {
		$basix_new_header_style = "dark";
	}

	if ($('body').hasClass("light_transparent_header")) {
		$basix_new_header_style = "white";
	}

	if ($('.header').hasClass("white")) {
		$basix_original_header_style = "white";
	}

	if ($('.header').hasClass("dark")) {
		$basix_original_header_style = "dark";
	}

	var $header_height = $('.header').height();

	if ($('body').hasClass("transparent_header")) {

		$('.header').removeClass($basix_original_header_style);
		$('.header').addClass($basix_new_header_style);

		if ($('body').hasClass("sticky_header")) {
			// Header Styles On Load
			function transparentClass() {
				if ($(this).scrollTop() > 1) {
					$('body.sticky_header').removeClass("transparent_header");
					$('body.sticky_header .header').removeClass("white dark");
					$('body.sticky_header .header').addClass($basix_original_header_style);
					if ($('body').hasClass("alternate_logo")) {
						$('.logo .alternate_logo').hide();
						$('.logo .standard_logo').show();
					}
				} else {
					if (!($(".mobilenav").is(':visible'))) {
						$('body').addClass("transparent_header");
					}
					$('body.sticky_header .header').removeClass("white dark");
					$('body.sticky_header .header').addClass($basix_new_header_style);
					if ($('body').hasClass("alternate_logo")) {
						$('.logo .standard_logo').hide();
						$('.logo .alternate_logo').show();
					}
				}
			}

			$(window).load(transparentClass);
			$(window).scroll(transparentClass);

		} else {

			if ($('body').hasClass("alternate_logo")) {
				$('.logo .standard_logo').hide();
				$('.logo .alternate_logo').show();
			} else {
				$('.logo .alternate_logo').hide();
				$('.logo .standard_logo').show();
			}

		}

	}

	// Header border
	function borderClass() {
		if ($(this).scrollTop() > 1) {
			$('body.sticky_header .header').addClass("border");
		} else {
			$('body.sticky_header .header').removeClass("border");
		}
	}

	$(window).load(borderClass);
	$(window).scroll(borderClass);


	// Sticky Class for Animation on Scroll
	function stickyClass() {
		if ($(window).scrollTop() > 1) {
			$('body.sticky_header .header').addClass("sticky");
		} else {
			$('body.sticky_header .header').removeClass("sticky");
		}
	}

	$(document).ready(stickyClass);
	$(window).scroll(stickyClass);

	/* ---------------------------------------------------------------- */
	/* Header Search
	/* ---------------------------------------------------------------- */

	$('.header .search-click, .search_overlay .close').click(function(){
        if( $('.search_overlay').is(':hidden') ) { // check to see if menu is hidden
        	$('.search_overlay').css("display", "flex").hide().fadeIn(300);
        	$('.search_overlay #s').focus();
        } else {
        	$('.search_overlay').fadeOut(300);
        }
    });

	/* ---------------------------------------------------------------- */
	/* Mobile Navigation - Duplicate standard navigation contents
	/* ---------------------------------------------------------------- */

	var $main_nav = $('.topnav');
	$main_nav.data('navigation', $main_nav.html());

	var newnav = $main_nav.data('navigation');
	$(newnav).appendTo('ul.mobilenav');

	/* ---------------------------------------------------------------- */
	/* Mobile Navigation Show/Hide
	/* ---------------------------------------------------------------- */

	if ($('body').hasClass("transparent_header")) {

		$('.mobilenav-click').click(function () {
			$("html").toggleClass("stop-scrolling");
			$('.mobilenav').toggle();
			if (!$(window).scrollTop()) {
				if ($(".mobilenav").is(':visible')) {
					$('body').removeClass("transparent_header");
					$('.header').removeClass("white dark");
					$('.header').addClass($basix_original_header_style);
					if ($('body').hasClass("alternate_logo")) {
						$('.logo .alternate_logo').hide();
						$('.logo .standard_logo').show();
					}
				} else {
					$('body').addClass("transparent_header");
					$('.header').removeClass("white dark");
					$('.header').addClass($basix_new_header_style);
					if ($('body').hasClass("alternate_logo")) {
						$('.logo .alternate_logo').show();
						$('.logo .standard_logo').hide();
					}
				}
			}
		});

	} else {

		$('.mobilenav-click').click(function () {
			$("html").toggleClass("stop-scrolling");
			$('.mobilenav').toggle();
		});

	}

	/* ---------------------------------------------------------------- */
	/* Mobile Navigation - Sub Menus
	/* ---------------------------------------------------------------- */

	$('.mobilenav li.menu-item-has-children a').click(function () {
		$(this).next('ul').toggle();
	});

	/* ---------------------------------------------------------------- */
	/* Alerts (Hide when close button clicked)
	/* ---------------------------------------------------------------- */

	$(".alert span.close").click(function () {
		$(this).parent().fadeOut();
	});

	/* ---------------------------------------------------------------- */
	/* Top of Page Link
	/* ---------------------------------------------------------------- */

	$(window).scroll(function () {
		if ($(this).scrollTop() > 300) {
			$('.top-of-page-link').show();
		} else {
			$('.top-of-page-link').hide();
		}
	});

	$('.top-of-page-link').click(function () {
		$("html, body").animate({scrollTop: 0}, 600);
		return false;
	});

	/* ---------------------------------------------------------------- */
	/* Sticky Clients Carousel
	/* ---------------------------------------------------------------- */

	/* Adjust footer padding */
	$(".clients-carousel.bottom").each(function () {
		$('.main-content-inner').css({
			"padding-bottom": "0"
		});
	});

	/* Make it stick */
	$(".clients-carousel.bottom").closest('.wpb_row').position({
		"my": "bottom",
		"at": "top",
		"of": $(".footer-container"),
		"collision": "none"
	});

	/* AND On Resize */
	$(window).resize(function () {
		$(".clients-carousel.bottom").closest('.wpb_row').position({
			"my": "bottom",
			"at": "top",
			"of": $(".footer-container"),
			"collision": "none"
		});
	});

	/* ---------------------------------------------------------------- */
	/* Force Carousel Widths (3rd Party Plugins can remove image dimensions)
	/* ---------------------------------------------------------------- */

	$('.jcarousel-outer').each(function () {
		$(this).closest(".vc_column-inner").addClass("carousel-parent");
		$(this).width($(this).parent().width());
	});

	$(window).resize(function () {
		$('.jcarousel-outer').each(function () {
			$(this).width($(this).parent().width());
		});
	});

	/* ---------------------------------------------------------------- */
	/* Contained (Boxed) Detection
	/* ---------------------------------------------------------------- */

	/* On Load */
	if ($("body").width() < 1346) {
		$("body").removeClass("contained");
	}

	/* AND On Resize */
	if ($("body").hasClass("contained")) {
		$(window).resize(function () {
			if ($("body").width() < 1346) {
				$("body").removeClass("contained");
			} else {
				if ($originally_boxed = 1) {
					$("body").addClass("contained");
				}
			}
		});
	}

	/* ---------------------------------------------------------------- */
	/* Thumbnail Zoom - Disabled by default
	/* ---------------------------------------------------------------- */

	/*$( "a.link_image" ).wrap( '<div class="zoomContainer"></div>' );
	var $basix_link_image_radius = $("a.link_image").css('border-radius');
	$(".zoomContainer").css('border-radius', $basix_link_image_radius);*/

	/* ---------------------------------------------------------------- */
	/* Mega menus
	/* ---------------------------------------------------------------- */

	$('.header .topnav > li.mega > ul.sub-menu').each(function () {
		$(this).children('li').wrapAll('<div class="mega-container"></div>');
	});

	/* ---------------------------------------------------------------- */
	/* Apple Mac Detection
	/* ---------------------------------------------------------------- */
	if (navigator.platform.match('Mac') !== null) {
		$("body").addClass('osx');
	}

	/* ---------------------------------------------------------------- */
	/* Dropdown Menu Edge Detection
	/* ---------------------------------------------------------------- */

	function dropdown_edge() {
		'use strict';
		$("body.header_nav_right .topnav li.mega, body.header_nav_right .topnav li.wide").each(function (e) {

			if ($('ul', this).length) {
				var elm = $('ul:first', this);
				var ending_right = ($(".topbar").width() - (elm.offset().left + elm.outerWidth()));

				if (ending_right < 1) {
					$(this).addClass('edge');
				} else {
					$(this).removeClass('edge');
				}
			}
		});
	}

	$(document).ready(dropdown_edge);
	$(window).resize(dropdown_edge);

	/* On Window Resize with delay to keep it behaving nicely */
	/*var dropdown_edge_timeout;
	$(window).resize(function () {
	clearTimeout(dropdown_edge_timeout);
	dropdown_edge_timeout = setTimeout(dropdown_edge, 250);
	});*/


	/* ---------------------------------------------------------------- */
	/* Masonry
	/* ---------------------------------------------------------------- */

	$('.masonry').masonry({
		itemSelector: '.masonry-item'
	});

	$('.wpb_masonry_gallery').masonry({
		itemSelector: '.masonry-item',
		gutter: 20
	});


	/* ---------------------------------------------------------------- */
	/* Newsletter widget (material)
	/* ---------------------------------------------------------------- */

	/* Replace submit text with FontAwesome icon */

	$('body.material-form-inputs .widget_basix_newsletter_widget button.button').each(function () {
		$( '<button type="submit" id="submit"><i class="FontAwesome-arrow-circle-right"></i></button>' ).insertAfter( $(this) );
		$(this).remove();
	});





	/* ---------------------------------------------------------------- */
	/* Slider Revolution
	/* ---------------------------------------------------------------- */

	$('.rev_slider div[class*=left]').wrap('<div class="left-inner-override"></div>');

	function rev_slider_left_edge() {
		$('.rev_slider .left-inner-override').each(function () {
			this.style.setProperty('left', Math.ceil(($('.main-content').width() - $('.content-width .vc_row_outer').width()) / 2) + 'px', '');
			this.style.setProperty('width', $('.content-width .vc_row_outer').width() + 'px', '');
		});
	}

	$(document).ready(rev_slider_left_edge);
	$(window).resize(rev_slider_left_edge);

});