/* =================================
LOADER
=================================== */
jQuery(window).load(function () {
	// will first fade out the loading animation
	jQuery(".status").fadeOut();
	// will fade out the whole DIV that covers the website.
	jQuery(".preloader").delay(1000).fadeOut("slow");
	jQuery('.carousel').carousel('pause');
})

/*** DROPDOWN FOR MOBILE MENU */
var callback_mobile_dropdown = function () {
	var navLi = jQuery('#site-navigation li');

	navLi.each(function () {
		if (jQuery(this).find('ul').length > 0 && !jQuery(this).hasClass('has_children')) {
			jQuery(this).addClass('has_children');
			jQuery(this).find('a').first().after('<p class="dropdownmenu"></p>');
		}
	});
	jQuery('.dropdownmenu').click(function () {
		if (jQuery(this).parent('li').hasClass('this-open')) {
			jQuery(this).parent('li').removeClass('this-open');
		} else {
			jQuery(this).parent('li').addClass('this-open');
		}
	});

	navLi.find('a').click(function () {
		jQuery('.navbar-toggle').addClass('collapsed');
		jQuery('.collapse').removeClass('in');
	});
};
jQuery(document).ready(callback_mobile_dropdown);


jQuery(document).ready(function () {
	var current_height = jQuery('.header .container').height();
	jQuery('.header').css('min-height', current_height);
});


/* show/hide reCaptcha */
jQuery(document).ready(function () {
	var thisOpen = false;
	jQuery('.contact-form .form-control').each(function () {
		if (jQuery(this).val().length > 0) {
			thisOpen = true;
			jQuery('.zerif-g-recaptcha').css('display', 'block').delay(1000).css('opacity', '1');
			return false;
		}
	});
	if (thisOpen == false && (typeof jQuery('.contact-form textarea').val() != 'undefined') && (jQuery('.contact-form textarea').val().length > 0)) {
		thisOpen = true;
		jQuery('.zerif-g-recaptcha').css('display', 'block').delay(1000).css('opacity', '1');
	}
	jQuery('.contact-form input, .contact-form textarea').focus(function () {
		if (!jQuery('.zerif-g-recaptcha').hasClass('recaptcha-display')) {
			jQuery('.zerif-g-recaptcha').css('display', 'block').delay(1000).css('opacity', '1');
		}
	});
});

/* =================================
Bootstrap Fix
=================================== */
if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
	var msViewportStyle = document.createElement('style')
	msViewportStyle.appendChild(
			document.createTextNode(
					'@-ms-viewport{width:auto!important}'
			)
	)
	document.querySelector('head').appendChild(msViewportStyle)
}

/* =================================
STICKY NAV
=================================== */
jQuery(document).ready(function () {
	// Sticky Header - http://jqueryfordesigners.com/fixed-floating-elements/
	var top = jQuery('#main-nav').offset().top - parseFloat(jQuery('#main-nav').css('margin-top').replace(/auto/, 0));
	jQuery(window).scroll(function (event) {
		// what the y position of the scroll is
		var y = jQuery(this).scrollTop();
		// whether that's below the form
		if (y >= top) {
			// if so, ad the fixed class
			jQuery('#main-nav').addClass('fixed');
		} else {
			// otherwise remove it
			jQuery('#main-nav').removeClass('fixed');
		}
	});
});

/* =================================
SET CURRENT NAV ITEM
=================================== */
jQuery(document).ready(function () {
	var headerHeight;
	jQuery('.current').removeClass('current');
	jQuery('#site-navigation a[href$="' + window.location.hash + '"]').parent('li').addClass('current');
	if (jQuery(window).width() >= 751) {
		headerHeight = jQuery('#main-nav').height();
	} else {
		headerHeight = 0;
	}
	if (location.pathname.replace(/^\//, '') == window.location.pathname.replace(/^\//, '') && location.hostname == window.location.hostname) {
		var target = jQuery(window.location.hash);
		if (target.length) {
			jQuery('html,body').animate({
				scrollTop: target.offset().top - headerHeight + 10
			}, 1200);
			return false;
		}
	}
});

/* ================================
PARALLAX
================================= */
jQuery(document).ready(function () {
	var jQuerywindow = jQuery(window);
	jQuery('div[data-type="background"], header[data-type="background"], section[data-type="background"]').each(function () {
		var jQuerybgobj = jQuery(this);
		jQuery(window).scroll(function () {
			var yPos = -(jQuerywindow.scrollTop() / jQuerybgobj.data('speed'));
			var coords = '50% ' + yPos + 'px';
			jQuerybgobj.css({
				backgroundPosition: coords
			});
		});
	});
});

/* ======================================
MOBILE NAV
====================================== */

jQuery('.navbar-toggle').on('click', function () {

	jQuery(this).toggleClass('active');

});


/* SETS THE HEADER HEIGHT */
jQuery(window).load(function () {
	setminHeightHeader();
});
jQuery(window).resize(function () {
	setminHeightHeader();
});

function setminHeightHeader() {
	jQuery('#main-nav').css('min-height', '75px');
	jQuery('.header').css('min-height', '75px');
	var minHeight = parseInt(jQuery('#main-nav').height());
	jQuery('#main-nav').css('min-height', minHeight);
	jQuery('.header').css('min-height', minHeight);
}

/* ======================================
STICKY FOOTER
======================================*/
jQuery(window).load(fixFooterBottom);
jQuery(window).resize(fixFooterBottom);

function fixFooterBottom() {

	var header = jQuery('header.header');
	var footer = jQuery('footer#footer');
	var content = jQuery('.site-content > .container');

	content.css('min-height', '1px');

	var headerHeight = header.outerHeight();
	var footerHeight = footer.outerHeight();
	var contentHeight = content.outerHeight();
	var windowHeight = jQuery(window).height();

	var totalHeight = headerHeight + footerHeight + contentHeight;

	if (totalHeight < windowHeight) {
		content.css('min-height', windowHeight - headerHeight - footerHeight);
	} else {
		content.css('min-height', '1px');
	}
}

/* ======================================
LATEST NEWS
========================================*/
jQuery(window).load(zerif_home_latest_news);
jQuery(window).resize(zerif_home_latest_news);

function zerif_home_latest_news() {
	if (jQuery('#carousel-homepage-latestnews').length > 0) {
		jQuery('#carousel-homepage-latestnews div.item').height('auto');
		if (isMobile.any() || (!isMobile.any() && jQuery('.container').outerWidth() > 768)) {

			if (jQuery('#carousel-homepage-latestnews div.item').length < 2) {
				jQuery('#carousel-homepage-latestnews > a').css('display', 'none');
			}
			var maxheight = 0;
			jQuery('#carousel-homepage-latestnews div.item').each(function () {
				if (jQuery(this).height() > maxheight) {
					maxheight = jQuery(this).height();
				}
			});
			jQuery('#carousel-homepage-latestnews div.item').height(maxheight);
		}
	}
}

/* ======================================
FIX FOR IE9 PLACEHOLDERS
========================================*/
jQuery(document).ready(function () {
	if (document.createElement("input").placeholder == undefined) {
		jQuery('.contact-form input, .contact-form textarea').focus(function () {
			if ((jQuery(this).attr('placeholder') != '') && (jQuery(this).val() == jQuery(this).attr('placeholder'))) {
				jQuery(this).val('').removeClass('zerif-hasPlaceholder');
			}
		}).blur(function () {
			if ((jQuery(this).attr('placeholder') != '') && (jQuery(this).val() == '' || (jQuery(this).val() == jQuery(this).attr('placeholder')))) {
				jQuery(this).val(jQuery(this).attr('placeholder')).addClass('zerif-hasPlaceholder');
			}
		});

		jQuery('.contact-form input').blur();
		jQuery('.contact-form textarea').blur();
		jQuery('form.contact-form').submit(function () {
			jQuery(this).find('.zerif-hasPlaceholder').each(function () {
				jQuery(this).val('');
			});
		});
	}

});
