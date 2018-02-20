;(function($){
	'use strict';
	
	var doc      = document,
			win      = window,
			isMobile = {
				Android: function() { return navigator.userAgent.match(/Android/i); }, 
				BlackBerry: function() { return navigator.userAgent.match(/BlackBerry/i); }, 
				iOS: function() { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, 
				Opera: function() { return navigator.userAgent.match(/Opera Mini/i); }, 
				Windows: function() { return navigator.userAgent.match(/IEMobile/i); }, 
				any: function() { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } 
			};
	
	$(doc).ready(function(){
		
		optima_content_update();
		
		// Main navigation:
		$('.main-nav__list').superfish({
			hoverClass:    'sfHover',
			delay:         800,
			animation:     {opacity: 'show'},
			animationOut:  {opacity: 'hide'}
		});
		$('.main-nav__btn').on('click', function() {
			$(this).toggleClass('open');
			if($('.main-nav__list').hasClass('open')) {
				$('.main-nav__list').removeClass('open');
			} else {
				$('.main-nav__list').addClass('open');
			}
		});
		
		// Header sticky:
		if ($('.header-box-02').size() > 0) {
			$('.header-box-02').sticky({ 
				topSpacing: 0,
				zIndex: 300
			});
		};
		
		// Search:
		$('.search-btn').on('click', function(e) {
			e.preventDefault();
			$(this).toggleClass('open');
			if($('.search-box__dropdown').hasClass('open')) {
				$('.search-box__dropdown').removeClass('open');
			} else {
				$('.search-box__dropdown').addClass('open');
			}
		});
		
		// Shopping cart:
		$(doc).on('click', function(event){
			if($(event.target).closest('.shopping-cart__dropdown').length) {
				return;
			}
			$('.shopping-cart__dropdown').slideUp('slow');
			event.stopPropagation();
		});
		$('.shopping-btn').on('click', function() {
			$(this).siblings('.shopping-cart__dropdown').slideToggle('slow');
			return false;
		});
		
		// Accordion:
		if ($('.accordion-01').size() > 0 || $('.module_toggle').size() > 0) {
			$('.accordion-01__title').on('click', function() {
				if (!$(this).hasClass('state-active')) {
					$(this).parents('.accordion-01').find('.accordion-01__body').slideUp(300);
					$(this).next().slideToggle(300);
					$(this).parents('.accordion-01').find('.state-active').removeClass('state-active');
					$(this).addClass('state-active');
				}
			});
			$('.accordion-01__title.expanded_yes').each(function(index) {
				$(this).next().slideDown(300);
				$(this).addClass('state-active');
			});
		};
		
		// Toggle:
		$('.toggle-01__title').on('click', function() {
			$(this).toggleClass('active');
			$(this).next('.toggle-01__content').slideToggle(200);
		});
		
		// Skills:
		if ($('.shortcode_skills').size() > 0) {
			if ($(win).width() > 760) {
				$('.module_skills').waypoint(function() {
					$('.skill_div').each(function() {
						var set_width = $(this).attr('data-percent');									
						$(this).stop().animate({'width': set_width}, 1500);
					});
				}, {offset: '99.99%'});
			} else {
				$('.skill_div').each(function() {
					$('.skill_div').each(function() {
						var set_width = $(this).attr('data-percent');									
						$(this).stop().animate({'width': set_width}, 1000);
					});
				});
			}
		};
		
		// Contact form:
		if ($('.form-in-wrapp').size() > 0) {
			$("#ajax-contact-form").on('submit', function() {
				var str = $(this).serialize();		
				$.ajax({
					type: "POST",
					url: "contact_form/contact_process.php",
					data: str,
					success: function(msg) {
						// Message Sent - Show the 'Thank You' message and hide the form
						if(msg === 'OK') {
							var result = '<div class="notification_ok">Your message has been sent. Thank you!</div>';
							$("#fields").hide();
						} else {
							var result = msg;
						}
						$('#note').html(result);
					}
				});
				return false;
			});
		};
		
		// Round circle type 1:
		if ($('.progress-circle-01').size() > 0) {
			if ($(win).width() > 760) {
				$('.progress-circle-01').waypoint(function () {
					$('.progress-circle-01').circleProgress({
						size: 145,
						emptyFill: 'transparent',
						thickness: '8',
						fill: { gradient: ["#466e9d", "#4eaac8"] }
					}).on('circle-animation-progress', function(event, progress, stepValue) {
						$(this).find('.progress-circle-01__value').html((stepValue * 100).toFixed().substr(-3) + '<b>%</b>');
					});
				}, {offset: '99.99%'});
			} else {
				$('.progress-circle-01').circleProgress({
					size: 145,
					emptyFill: 'transparent',
					thickness: '8',
					fill: { gradient: ["#94c860", "#4da7cc"] }
				}).on('circle-animation-progress', function(event, progress, stepValue) {
					$(this).find('.progress-circle-01__value').html((stepValue * 100).toFixed().substr(-3) + '<b>%</b>');
				});
			}
		};
		
		// Round circle type 2:
		roundCircle();
		
		// Slider type 1:
		if ($('.blog-slider-01').size() > 0) {
			$('.blog-slider-01').each(function() {
				$(this).nivoSlider({
					directionNav: true,
					controlNav: false,
					effect:'fade',
					pauseTime:4000,
					slices: 1
				});
			});
		};
		
		// Counter:
		var counter_module = $('.shortcode-counter');
		if (counter_module.size() > 0) {
			if ($(win).width() > 760) {
				counter_module.each(function() {
					if ($(this).offset().top < $(win).height()) {
						if (!$(this).hasClass('done')) {
							var set_count = $(this).find('.stat-count').attr('data-count');
							$(this).find('.stat-temp').stop().animate({
									width: set_count
							}, {
								duration: 3000,
								step: function(now) {
									var data = Math.floor(now);
									$(this).parents('.counter-wrapper').find('.stat-count').html(data);
								}
							});
							$(this).addClass('done');
							$(this).find('.stat-count');
						}
					} else {
						$(this).waypoint(function() {
							if (!$(this).hasClass('done')) {
								var set_count = $(this).find('.stat-count').attr('data-count');
								$(this).find('.stat-temp').stop().animate({
									width: set_count
								}, {
									duration: 3000,
									step: function(now) {
										var data = Math.floor(now);
										$(this).parents('.counter-wrapper').find('.stat-count').html(data);
									}
								});
								$(this).addClass('done');
								$(this).find('.stat-count');
							}
						}, {
							offset: 'bottom-in-view'
						});
					}
				});
			} else {
				counter_module.each(function() {
					var set_count = $(this).find('.stat-count').attr('data-count');
						$(this).find('.stat-temp').animate({
							width: set_count
						}, {
							duration: 3000,
							step: function(now) {
								var data = Math.floor(now);
								$(this).parents('.counter-wrapper').find('.stat-count').html(data);
							}
						});
					$(this).find('.stat-count');
				}, {
					offset: 'bottom-in-view'
				});
			}
		};
		
		// Tabs:
		if ($('.tabs').size() > 0) {
			$('.tabs__caption').on('click', 'li:not(.active)', function() {
				$(this)
					.addClass('active').siblings().removeClass('active')
					.closest('.tabs').find('.tabs__content').removeClass('active').eq($(this).index()).addClass('active');
			});
		};
		
		// Owl Carousel:
		if ($('.owl-carousel-01').size() > 0) {
			$('.owl-carousel-01').owlCarousel({
				margin: 10,
				nav: false,
				loop: true,
				autoplay: true,
				responsive: {
					0: {
						items: 1
					}
				}
			})
		};
		if ($('.owl-carousel-02').size() > 0) {
			$('.owl-carousel-02').owlCarousel({
				margin: 10,
				nav: false,
				loop: true,
				autoplay: true,
				responsive: {
					0: {
						items: 1
					}
				}
			})
		};
		if ($('.owl-carousel-03').size() > 0) {
			$('.owl-carousel-03').owlCarousel({
				loop:true,
				margin:30,
				responsiveClass:true,
				dots: false,
				nav:true,
				autoplay: true,
				responsive:{
					0:{
						items:1
					},
					480:{
						items:1
					},
					640:{
						items:2
					},
					767:{
						items:3
					}
				}
			});
		};
		
		// Back to Top:
		$(win).on('scroll', function() {
			if ($(win).scrollTop() > 0) {
				$('.back2top').fadeIn();
			} else {
				$('.back2top').fadeOut();
			}
			var bottom_pad = parseInt($('.footer_wrapper').height())+parseInt($('.footer_wrapper').attr('data-pad-top'))+parseInt($('.footer_wrapper').attr('data-pad-bottom')) + 30;
			if ($(win).scrollTop() > $(doc).height() - $(win).height() - bottom_pad) {
				$('.back2top').css({'bottom': bottom_pad+'px'});
			} else {
				$('.back2top').css({'bottom': '30px'});
			}
		});
		$('.back2top').on('click', function() {
			$('body,html').animate({
				scrollTop: 0
			}, 400);
			return false;
		});
		
		// Google maps:
		if ($('#map-canvas').size() > 0) {
			function initialize() {
				var styleArray = [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}];
				var myLatlng = new google.maps.LatLng(40.714353, -74.005973);
				var mapOptions = {
					zoom: 15,
					scrollwheel: false,
					center: myLatlng,
					mapTypeId: google.maps.MapTypeId.ROADMAP,
					styles: styleArray
				};
				var map = new google.maps.Map(doc.getElementById('map-canvas'), mapOptions);
				var marker = new google.maps.Marker({
					position: myLatlng,
					map: map,
					title: 'New York!',
					icon: 'img/icons/map_icon.png'
				});
			}
			google.maps.event.addDomListener(window, 'load', initialize);
		};
		
		// Coming soon:
		if ($('#countdown').size() > 0) {
			var	austDay = new Date(2017, 19 - 1, 3);
			$('#countdown').countdown({
				until: austDay,
				padZeroes: true,
				labels: ['Years', 'Months', 'Weeks', 'Days', 'Hours', 'Minutes', 'Seconds'],
				labels1: ['Year', 'Month', 'Week', 'Day', 'Hour', 'Minute', 'Second']
			});
		};
		
		// Video background
		var video_bg_tag = $('.video_bg');
		if (video_bg_tag.size() > 0) {
			video_bg_tag.each(function () {
				if ($(this).children().length == 0) {
					$(this).parent().hide();
				}
			});
			$('.play-video').on('click', function(ev) {
				video_bg_tag.each(function() {
					$(this).find('.video_frame').attr('src', $(this).find('.play-video').attr('data-video-url'));
				});
				video_bg_tag.removeClass('show_video_now');
				$(this).parent().find(".video_frame")[0].src += "&autoplay=1";
				ev.preventDefault();
				optima_video_background();
				$(this).parent('.video_bg').addClass('show_video_now');
			});
		};
		
		// Shop item:
		$('.plus, .minus').on('click', function(e) {
			var numberField = $(this).parent().find('[type="number"]');
			var currentVal = numberField.val();
			var sign = $(this).val();
			if (sign === '-') {
				if (currentVal > 1) {
					numberField.val(parseFloat(currentVal) - 1);
				}
			} else {
				numberField.val(parseFloat(currentVal) + 1);
			}
		});
		
		// Shop slider:
		if ($('.shop-item__slider-wrapp').size() > 0) {
			$('#shop-carousel').flexslider({
				animation: "slide",
				controlNav: false,
				animationLoop: false,
				slideshow: false,
				itemWidth: 80,
				itemMargin: 17,
				directionNav: false,
				asNavFor: '#shop-slider'
			});
			$('#shop-slider').flexslider({
				animation: "fade",
				controlNav: false,
				animationLoop: false,
				directionNav: false,
				slideshow: false,
				sync: "#shop-carousel"
			});
		};
		
		// Pretty photo:
		if ($('.pretty-photo').size() > 0) {
			$('.pretty-photo').prettyPhoto();
		};
		
		// Video popup:
		if ($('.video-block-01').size() > 0) {
			$('.video-block-01__btn').leanModal({ 
				top : 200, 
				closeButton: '.video-block-close'
			});
		};
		
		// Appoinment popup:
		if ($('.appointment-box-wrapp').size() > 0) {
			$('.available-appoinment-btn').leanModal({ 
				top : 200, 
				closeButton: '.appointment-popup-close' 
			});
		};
		
		// Swipebox Popup:
		var swipebox_class = $('.swipebox');
		if(swipebox_class.size() > 0){
			$('html').addClass('smart-box');
			swipebox_class.swipebox();
		}
		$(doc).on('click', '#swipebox-container .slide.current img', function(e){
			$('swipebox-next').trigger('click');
			e.stopPropagation();
		});
		$(doc).on('click', '#swipebox-container', function(e){
			$('#swipebox-close').trigger('click');
		});
		
		// Price filter:
		if ($('.widget-price-filter').size() > 0){
			$('#slider-range').slider({
				range: true,
				min: 100,
				max: 620,
				values: [ 100, 500 ],
				slide: function(event, ui){
					$('#amount').val('$' + ui.values[0] + ' - $' + ui.values[1]);
				}
			});
			$('#amount').val('$ ' + $('#slider-range').slider('values', 0) + '.00' + ' - $' + $('#slider-range').slider('values', 1) + '.00');
		};
		
		// Audio player:
		if($('.music-post').size() > 0) {
			var mediaElements = document.querySelectorAll('audio');
			for (var i = 0, total = mediaElements.length; i < total; i++) {
				var features = ['playpause', 'progress', 'volume'];
				// To demonstrate the use of Chromecast with audio
				if (mediaElements[i].tagName === 'AUDIO') {
					features.push('chromecast');
				}
				new MediaElementPlayer(mediaElements[i], {
					// This is needed to make Jump Forward to work correctly
					pluginPath: 'https://cdnjs.cloudflare.com/ajax/libs/mediaelement/4.2.5/',
					shimScriptAccess: 'always',
					autoRewind: false,
					features: features,
					currentMessage: 'Now playing:'
				});
			}
		}
		
		if (isMobile.any()){
			doc.documentElement.className = doc.documentElement.className + " touch";
			// Parallax
			$('.parallax').each(function(i, obj){
				$(this).css("background-attachment", "scroll");
			});
		}
	});
	$(win).resize(function(){
		
		// Video BG:
		optima_content_update();
		
		// Round circle type 2:
		roundCircle();
		
		// Wideo BG:
		optima_video_background();
		setTimeout("optima_video_background();", 1000);
		
	});
	$(win).load(function(){
		
		// Isotope:
		if ($('.team-grid').size() > 0) {
			// Init Isotope
			var $grid = $('.team-grid').isotope();
			
			// Filter items on button click
			$('.filter-button-group').on( 'click', '.sort-item', function() {
				var filterValue = $(this).attr('data-filter');
				$grid.isotope({ filter: filterValue });
			});
			
			// Change is-checked class on buttons
			$('.sort-group').each( function(i, buttonGroup) {
				var $buttonGroup = $( buttonGroup );
				$buttonGroup.on( 'click', '.sort-item', function(e) {
					e.preventDefault();
					$buttonGroup.find('.is-checked').removeClass('is-checked');
					$(this).addClass('is-checked');
				});
			});
		};
		
		// Gallery
		if ($('.gallery-box').size() > 0) {
			
			// init Isotope:
			var $galleryGrid = $('.gallery-grid').isotope({
				itemSelector: '.gallery-item',
				percentPosition: true,
				masonry: {
					columnWidth: '.gallery-sizer'
				}
			});
			
			// layout Isotope after each image loads:
			$galleryGrid.imagesLoaded().progress(function() {
				$galleryGrid.isotope('layout');
			});  
			
			// Filter items on button click:
			$('.gallery-filter').on( 'click', '.gallery-sort-item', function() {
				var filterValue = $(this).attr('data-filter');
				$galleryGrid.isotope({ filter: filterValue });
			});
			
			// Change is-checked class on buttons:
			$('.gallery-group').each( function(i, buttonGroup) {
				var $buttonGroup = $(buttonGroup);
				$buttonGroup.on( 'click', '.gallery-sort-item', function(e) {
					e.preventDefault();
					$buttonGroup.find('.is-checked').removeClass('is-checked');
					$( this ).addClass('is-checked');
				});
			});
		}
	});
	
	// Round circle type 2:
	function roundCircle() {
		if ($('.progress-circle-02').size() > 0) {
			if ($(win).width() > 991) {
				$('.progress-circle-02').waypoint(function () {
					$('.progress-circle-02').circleProgress({
						size: 200,
						emptyFill: 'transparent',
						thickness: '5',
						fill: { gradient: ["#fff", "#fff"] }
					}).on('circle-animation-progress', function(event, progress, stepValue) {
						$(this).find('.progress-circle-02__value').html((stepValue * 100).toFixed().substr(-3) + '<b>%</b>');
					});
				}, {offset: '99.99%'});
			} else {
				$('.progress-circle-02').circleProgress({
					size: 150,
					emptyFill: 'transparent',
					thickness: '5',
					fill: { gradient: ["#fff", "#fff"] }
				}).on('circle-animation-progress', function(event, progress, stepValue) {
					$(this).find('.progress-circle-02__value').html((stepValue * 100).toFixed().substr(-3) + '<b>%</b>');
				});
			}
		};
	}
	
})(jQuery);

// Video background
function optima_video_background() {
	$('.video_bg').each(function () {
		$(this).find('iframe').css({'height': $(this).height() + 'px'});
	});
}
function optima_content_update() {
	var frame16_10_tag = jQuery('.frame16x10');
	if (frame16_10_tag.size() > 0) {
		optima_iframe16x10(frame16_10_tag);
	}
}
function optima_iframe16x10(frame_class) {
	frame_class.each(function() {
		jQuery(this).height(($(this).width() / 16) * 10.5);
	});
}