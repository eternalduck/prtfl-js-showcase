// July, 16, 2018
$(document).ready(function () {
// debug
//$('.first').append('<div class="wsize">' + 'js: ' + cWidth + '</div>');

	var timeout_id = false;
	var bHeight = document.body.scrollHeight;
	var bWidth = document.body.scrollWidth;
	var cHeight = $(window).height();
	var cWidth = $(window).width();
	var formHeight = $('.story_wrap').height();
	var blockTopHeight = (cHeight - formHeight) / 2;
	var blockBottomHeight = bHeight - cHeight + blockTopHeight;
	var bodyWidth = document.body.clientWidth;
	var rightCoordinate = bodyWidth / 2 - 610;
	var rightPos = bodyWidth - 575 + 95 - rightCoordinate;
	var $docScroll = $(window).scrollTop();

	initCoordinate();
	$(window).resize(function () {
		if (timeout_id) {
			clearTimeout(timeout_id);
		}
		timeout_id = setTimeout(initCoordinate, 500);
	});

	function buttonActive() {
		var elem = this;
		$(elem).addClass('active');
		setTimeout(function () {
			$(elem).removeClass('active');
		}, 200);
	}

// Top menu stickness
	$(window).scroll(function () {
		initCoordinate();
		if ($(window).scrollTop() > 0) {
			$('.header_wrap').addClass('active');
		} else {
			$('.header_wrap').removeClass('active');
		}
	});

// Top menu search field
	$('.search_icon').click(function () {
		$('.search_wrap').toggleClass('active');
	});

// Top menu collapse
	$('.menu_icon, .close_icon').click(function () {
		$('.main_nav').toggle();
	});

// Footer & top menu scroll
	$('.main_nav a[href^="#"],.footer-menu a[href^="#"]').click(function () {
		var c = $(this).attr("href");
		$("html, body").animate({
			scrollTop: $(c).offset().top - 80
		}, 300);
		return false
	});
	$('.footer-menu li a').click(buttonActive);

// Frontpage: top slider
	$('#slider_1').slick({
		slidesToScroll: 1,
		infinite: true,
		arrows: true,
		prevArrow: '<span class="s_header_prev s_h_control"></span>',
		nextArrow: '<span class="s_header_next s_h_control"></span>',
		speed: 2000,
		slidesToShow: 1,
		responsive: [
			{
				breakpoint: 1920,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				}
			}]
	});

//Frontpage: fullstack svg
	$('.f_s_click').click(function () {
		svgActive(this, 1);
		var handle = $(this).attr('data-top-handle');
		var imgName = $(this).attr('img-name');
		topContentActive(handle);
		$('#fs-img').attr('src', 'images/' + imgName + '.png');
	});

	$('.fullstack_l_control').click(function () {
		var elem = this;
		$(this).addClass('active');
		setTimeout(function () {
			$(elem).removeClass('active');
		}, 200);

		var thisId = $(this).parent('.fullstack-left').find('.fullstack_list .active').attr('data-id');
		var $prevElem = $('.f_s_click.active').prev();
		var $nextElem = $('.f_s_click.active').next();
		var handlePrev = $prevElem.attr('data-top-handle');
		var handleNext = $nextElem.attr('data-top-handle');
		var imgNamePrev = $prevElem.attr('img-name');
		var imgNameNext = $nextElem.attr('img-name');
		if ($(this).is('#fullstack_up') && thisId != 1) {
			svgActive($prevElem, 0);
			topContentActive(handlePrev);
			$('#fs-img').attr('src', 'images/' + imgNamePrev + '.png');
			$('.f_s_click.active').removeClass('active').prev().addClass('active');
		} else if ($(this).is('#fullstack_down') && thisId != 8) {
			svgActive($nextElem, 0);
			topContentActive(handleNext);
			$('#fs-img').attr('src', 'images/' + imgNameNext + '.png');
			$('.f_s_click.active').removeClass('active').next().addClass('active');
		}
	});

	function initCoordinate() {
		bHeight = document.body.scrollHeight;
		bWidth = document.body.scrollWidth;
		cHeight = $(window).height();
		cWidth = $(window).width();
		blockTopHeight = (cHeight - formHeight) / 2;
		blockBottomHeight = bHeight - cHeight + blockTopHeight;
		bodyWidth = document.body.clientWidth;
		rightCoordinate = bodyWidth / 2 - 610;
		rightPos = bodyWidth - 575 + 95 - rightCoordinate;
		$docScroll = $(window).scrollTop();
	};

	function graphActive($this) {
		var $parentLi = $($this).parents('li');

		var textG1 = $parentLi.find('.text_g1');
		var textG2 = $parentLi.find('.text_g2');

		var textWidthG1 = textG1.width();
		var textWidthG2 = textG2.width();

		var textG1Per = textWidthG1 / 100;
		var textG2Per = textWidthG2 / 100;

		textG1.css('margin-left', '-' + textG1Per * 99 + 'px');
		textG2.css('margin-left', '-' + textG2Per * 99 + 'px');

		$parentLi.addClass('active');
	}

	function topContentActive(handle) {
		$('.top_content').each(function () {
			if ($(this).attr('data-top-content') != handle) {
				$(this).removeClass('active');
			} else {
				$(this).addClass('active');
			}
		});
	}

	function svgActive(clickElem, flag) {
		var tId;
		var svgName = $(clickElem).attr('data-svg');
		clearTimeout(tId);
		if (flag) {
			$(clickElem).addClass('active');
			$('.f_s_click').each(function () {
				if ($(this).attr('data-svg') != svgName) {
					$(this).removeClass('active');
				}
			});
		}
		$('.svg').css('display', 'none');
		$('.bottom_content').css('opacity', '0');

		var contentName = document.querySelector('div[data-content-svg=' + svgName + ']');
		var svgAttributes = anime.timeline();
		svgAttributes
				.add({
					targets: '#' + svgName + ' path',
					strokeDashoffset: [anime.setDashoffset, 0],
					easing: 'linear',
					duration: 400,
				})
				.add({
					targets: contentName,
					opacity: 1,
					easing: 'linear',
					duration: 200,
				});

		function svgShown() {
			$('#' + svgName).css('display', 'block');
		}

		tId = setTimeout(svgShown, 50);
	}

//END fullstack svg

// Frontpage: factory_num graphs
	$('.number_g2').addClass('active');
	$('.text_g2').addClass('active');

	$('#g1').click(function () {
		$('.number_g1').addClass('active');
		$('.text_g1').addClass('active');
		$(this).addClass('active');
		$('#factory_num').addClass('graph_1');


		$('.number_g2').removeClass('active');
		$('.text_g2').removeClass('active');
		$('#g2').removeClass('active');
		$('#factory_num').removeClass('graph_2');
	});

	$('#g2').click(function () {
		$('.number_g2').addClass('active');
		$('.text_g2').addClass('active');
		$(this).addClass('active');
		$('#factory_num').addClass('graph_2');

		$('.number_g1').removeClass('active');
		$('.text_g1').removeClass('active');
		$('#g1').removeClass('active');
		$('#factory_num').removeClass('graph_1');
	});

	var graph_array = [1, 4, 7, 10, 13, 16, 19];
	$('.graph ul li').mouseover(function () {
		$('.graph li').removeClass('active_first');
		$('.graph li').removeClass('active_2016');
	});
	$('.graph .graph_hover').mouseover(function () {
		$('.graph li').removeClass('active_first');
		$('.graph li').removeClass('active_2016');
	});

	$('.graph .graph_bottom').mouseover(function () {
		$('.graph li').removeClass('active_first');
		$('.graph li').removeClass('active_2016');
	});

	$('.graph ul li').mouseleave(function () {
		for (var key in graph_array) {
			$('.graph li:nth-child(' + graph_array[key] + ')').addClass('active_first');
		}
		$('.graph li:nth-child(19)').addClass('active_2016');
	});

	$('.graph .graph_hover').mouseleave(function () {
		for (var key in graph_array) {
			$('.graph li:nth-child(' + graph_array[key] + ')').addClass('active_first');
		}
		$('.graph li:nth-child(19)').addClass('active_2016');
	});

	$('.graph .bottom_hover').mouseleave(function () {
		for (var key in graph_array) {
			$('.graph li:nth-child(' + graph_array[key] + ')').addClass('active_first');
		}
		$('.graph li:nth-child(19)').addClass('active_2016');
	});

	$('.graph .year').mouseover(function (e) {
		graphActive(this);
		$('.graph li').removeClass('active_first');
		$('.graph li:nth-child(19)').removeClass('active_2016');
	});

	$('.graph .year').mouseleave(function () {
		$(this).parents('li').removeClass('active');
		for (var key in graph_array) {
			$('.graph li:nth-child(' + graph_array[key] + ')').addClass('active_first');
		}
		$('.graph li:nth-child(19)').addClass('active_2016');
	});

	$('.graph .bottom_hover').mouseover(function (e) {
		$('.graph li').removeClass('active_first');
	});

	$('.graph .line_wrap').mouseenter(function (e) {
		graphActive(this);
	});

	$('.graph .line_wrap').mouseleave(function () {
		var $parentLi = $(this).parents('li');
		$parentLi.removeClass('active');
	});

	$('.graph .text.active').mouseenter(function (e) {
		graphActive(this);
	});

	$('.graph .text.active').mouseleave(function () {
		var $parentLi = $(this).parents('li');
		$parentLi.removeClass('active');
	});

	$('.graph .point').mouseover(function (e) {
		graphActive(this);
	});

	$('.graph .point').mouseleave(function () {
		var $parentLi = $(this).parents('li');
		$parentLi.removeClass('active');
	});
// END factory_num graphs

// Frontpage: factory_stats workers slider
	var sliderTop = {
		19: '-15px',
		18: '6px',
		17: '28px',
		16: '47px',
		15: '65px',
		14: '85px',
		13: '105px',
		12: '125px',
		11: '145px',
		10: '165px',
		9: '185px',
		8: '205px',
		7: '222px',
		6: '241px',
		5: '263px',
		4: '282px',
		3: '300px',
		2: '323px',
		1: '340px'
	}

	$('#slider_num').slider({
		min: 1,
		max: 19,
		step: 1,
		orientation: "vertical",
		classes: {
			"ui-slider-handle": "my_graph_handle"
		},
		slide: function (event, ui) {
			var dataWorkerCount = $('.workers_wrap div[data-active=' + (ui.value) + ']').attr('data-count');
			$('.workers_count').html(dataWorkerCount);

			$('.workers_wrap div').each(function () {
				if ($(this).attr('data-active') <= ui.value) {
					if (!$(this).hasClass('no_active')) {
						$(this).addClass('active');
					}
				} else {
					if (!$(this).hasClass('all_time')) {
						$(this).removeClass('active');
					}
				}
			});

			var dataWorkshopCount = $('.workshop_wrap div:nth-child(' + ui.value + ')').attr('data-count');
			$('.workshop_count').html(dataWorkshopCount);
			for (var i = 1; i <= (ui.value + 1); i++) {
				$('.workshop_wrap div:nth-child(' + i + ')').addClass('active');
			}
			for (var i = 1; i <= (19 - ui.value); i++) {
				if (ui.value != 0) {
					$('.workshop_wrap div:nth-child(' + (ui.value + i) + ')').removeClass('active');
				}

			}

			$('.stats-right .up_year').css('top', sliderTop[ui.value]);
			if (ui.value == 1) {
				$('.stats-right .up_year').html('');
				$('.stats-right .down_year').css('font-weight', '600');
			} else {
				$('.stats-right .up_year').html(1997 + ui.value);
				$('.stats-right .down_year').css('font-weight', '400');
			}
		},
		create: function (event, ui) {
			$('#slider_num').slider("value", 19);
			$('.workers_count').html('600');
			$('.workshop_count').html('11');
		}
	});
// END factory_stats workers

// Frontpage: brands animation
	$('.brands_handle').click(function () {
		var itemNumder = $(this).attr('data-handle');
		var activeItem;
		var timeOut = 0;

		$('#brands .right_item').each(function () {
			if ($(this).hasClass('active')) {
				activeItem = $(this).attr('data-item');
			}
		});
		if ($('#brands .brands_item').hasClass('active')) {
			timeOut++;
			$('#brands .brands_item').removeClass('active');
			setTimeout(function () {
				$('#brands .brands_item').css('z-index', '9');
			}, 500);
		} else {
			if (activeItem != itemNumder) {
				$('#brands .brands_item[data-item=' + itemNumder + ']').addClass('active');
				$('#brands.brands_item[data-item=' + itemNumder + ']').css('z-index', '999999');
			}
		}

		if (timeOut) {
			setTimeout(function () {
				if (activeItem != itemNumder) {
					$('#brands .brands_item[data-item=' + itemNumder + ']').addClass('active');
					$('#brands .brands_item[data-item=' + itemNumder + ']').css('z-index', '999999');
				}
			}, 500);
		}

		timeOut = 0;

	});

	$('#brands .brands_item').click(function () {
		$(this).addClass('active');
		$(this).css('z-index', '999999');

	});

	//END brands animation

	// About: factory map hovers
	$('.territory-list li').hover(function () {
		var terrListNum = $(this).attr('class').split('_')[1];
		$('.terr-point.p_' + terrListNum).toggleClass('current')
	});

	$('.terr-point').hover(function () {
		var terrPointNum = $(this).attr('class').split('_')[1];
		$('.territory-list li.b_' + terrPointNum).toggleClass('current')
	});

	//video popup
	$('.youtube').colorbox({
		iframe: true, width: 640, height: 390, href: function () {
			var videoId = new RegExp('[\\?&]v=([^&#]*)').exec(this.href);
			if (videoId && videoId[1]) {
				return 'http://youtube.com/embed/' + videoId[1] + '?rel=0&wmode=transparent';
			}
		}
	});

	//workers' stories popups
	$('.worker_1, .pic-worker').click(function () {
		var story = $(this).attr('data-story');
		$('.' + story).fadeIn('fast').addClass('active');
		$('.story_wrap').each(function () {
			if (!$(this).is('.' + story)) {
				$(this).fadeOut('fast').removeClass('active');

			}
		});
	});
	$('.story_close').click(function () {
		$(this).parents('.story_wrap').removeClass('active').css('display', 'none');
	});

	//contact form popup
	$('.become-partner-btn').click(function () {
		var colorSrc = '.' + $(this).attr('data-colorbox');
		$(this).colorbox({

			inline: true,
			width: '70%',
			opacity: 0.75,
			href: colorSrc

		});
	});

	// About: history slider
	$('.years-d, .years-m').click(function () {
		$('.years-d, .years-m').removeClass('current');
		$(this).addClass('current');
		var currentYear = $(this).attr('class').split(' ')[1];

		$('.history-slide').fadeOut('fast').removeClass('current');
		$('.history-slide.s_' + currentYear).fadeIn('fast').addClass('current');
		$('.history-slide.s_' + currentYear + ' .history-pic').css({
			'background': 'url(images/about/years/card-' + currentYear + '.jpg) left center/cover no-repeat'
		});

	});//years click

	$('#diplom-slider-container').slick({
		infinite: true,
		slidesToScroll: 5,
		slidesToShow: 5,
		arrows: true,
		prevArrow: '<div class="control prev"></div>',
		nextArrow: '<div class="control next"></div>',
		speed: 1000,
		responsive: [{
			breakpoint: 980,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 3,
			}

		}]
	});
	$('.diplom_item a').colorbox({slideshow: true, slideshowAuto: false});

	// news load more
	$(function () {
		$(".hidden-news").slice(0, 0).show();
		$("#newsLoadMore").on('click', function (e) {
			e.preventDefault();
			$(".hidden-news:hidden").slice(0, 1).slideDown();
			if ($(".hidden-news:hidden").length == 0) {
				$("#newsLoadMore").fadeOut('slow');
			}
			$('html,body').animate({
				scrollTop: $(this).offset().top
			}, 1000);
		});
	});

	// brand page white panels slide down
	$(function () {
		$('.advant-block').hover(
				function () {
					$(this).find('.txt-panel').animate({
						'bottom': '-150px'
					}, 400);
				},
				function () {
					$(this).find('.txt-panel').animate({
						'bottom': '0'
					}, 400);
				}
		);

	});

	//cleaning menu stickness
	$(window).scroll(function () {
		//initCoordinate();
		if ($(window).scrollTop() > 350) {
			$('.clean-menu').addClass('active');
		} else {
			$('.clean-menu').removeClass('active');
		}
	});

	//cleaning menu nav
	$(".clean-menu a").click(function (event) {
		event.preventDefault();
		var target = $(this).attr("href");
		$('html,body').animate({
			scrollTop: $(target).offset().top - 150
		}, 500);
	});

	//detect current section
	var topMenu = $('.clean-menu'),
			topMenuHeight = topMenu.outerHeight() + 150,
			menuItems = topMenu.find('a[href*="#"]'),
			scrollItems = menuItems.map(function () {
				var item = $($(this).attr("href"));
				if (item.length) {
					return item;
				}
			});
	$(window).scroll(function () {
		var fromTop = $(this).scrollTop() + topMenuHeight;
		var cur = scrollItems.map(function () {
			if ($(this).offset().top < fromTop)
				return this;
		});
		cur = cur[cur.length - 1];
		var id = cur && cur.length ? cur[0].id : "";
		menuItems
				.parent().removeClass("current")
				.end().filter("[href='#" + id + "']").parent().addClass("current");
	});

	//cleaning places pic change
	$("#places-menu .places-item").click(function () {
		$("#places-menu .places-item").removeClass("active");
		var placeId = $(this).attr('id');
		var cleanImg = $("#eff-custom .left-pic img");
		var cleanInfo = $("#eff-custom .info-block");
		cleanImg.fadeOut('fast', function () {
			cleanImg.attr('src', 'images/cleaning/' + placeId + '.jpg');
			cleanImg.fadeIn('fast');
		});
		cleanInfo.hide();
		$("#eff-custom .info-block" + "." + placeId + "-info").show();
		$(this).addClass("active");
	});

	//cleaning load more
	$(function () {
		$("#cleanLoadMore").on('click', function (e) {
			e.preventDefault();
			$(".eff-hidden:hidden").slice(0, 1).slideDown();
			if ($(".eff-hidden:hidden").length == 0) {
				$("#cleanLoadMore").fadeOut('slow');
			}
		});
	});

	//cleaning cases slider
	$('#cases-slider').slick({
		infinite: true,
		slidesToScroll: 1,
		slidesToShow: 1,
		prevArrow: '.cases-prev',
		nextArrow: '.cases-next',
		speed: 1000

	});

	//cleaning popups
	$('#eff-custom .button, .ready-pack span').click(function () {
		var colorSrc = '.' + $(this).attr('data-colorbox');
		$(this).colorbox({

			inline: true,
			width: '96%',
			maxWidth: '1200px',
			// minHeight: '700px',
			// height: 'auto',
			opacity: 0.75,
			href: colorSrc

		});
	});

	//product props popup
	$('.eff-item .button').click(function () {
		var colorSrc = '.' + $(this).attr('data-colorbox');
		$(this).colorbox({

			inline: true,
			width: '65%',
			maxWidth: '620px',
			minWidth: '600px',
			opacity: 0.75,
			href: colorSrc

		});
	});

	//cleaning popup load more
	$(function () {
		$("#cleanPopLoadMore").on('click', function (e) {
			e.preventDefault();
			$(".prods-hidden:hidden").slice(0, 5).slideDown();
			if ($(".prods-hidden:hidden").length == 0) {
				$("#cleanPopLoadMore").fadeOut('slow');
			}
			$("#cboxLoadedContent").css("height", "auto");
		});
	});

	//select&checkbox trick
	$("#eff-filter .select-holder").click(function () {
		$(this).find("label").fadeOut("fast");
		$(this).find("select").css({"color": "#2c2c2c",})

	});

	$("#quant-calc .cl-type").click(function () {
		$(this).toggleClass("chckd");

	});

	// tab-buttons popup
	$("#quant-calc .btn-block .button").click(function () {
		$("#quant-calc .btn-block .button").removeClass("selected");
		$(this).toggleClass("selected");
	});

});//doc ready
