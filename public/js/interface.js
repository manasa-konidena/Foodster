( function($) {
  'use strict';



  	/*-------------------------------------------------------------------------------
	  Detect mobile device 
	-------------------------------------------------------------------------------*/



	var mobileDevice = false; 

	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
	  	$('html').addClass('mobile');
	  	mobileDevice = true;
	}

	else{
		$('html').addClass('no-mobile');
		mobileDevice = false;
	}



    /*-------------------------------------------------------------------------------
	  Window load
	-------------------------------------------------------------------------------*/



	$(window).load(function(){

		$('.loader').fadeOut();

    	var wow = new WOW({
		    offset: 100,          
		    mobile: false
		  }
		);
		wow.init();
	});

	var navbar=$('.navbar');
	var navbarAffixHeight=73




	/*-------------------------------------------------------------------------------
	  Smooth scroll to anchor
	-------------------------------------------------------------------------------*/



    $('.js-target-scroll').on('click', function() {
        var target = $(this.hash);
        if (target.length) {
            $('html,body').animate({
                scrollTop: (target.offset().top - navbarAffixHeight + 1)
            }, 1000);
            return false;
        }
    });



    /*-------------------------------------------------------------------------------
	  Affix
	-------------------------------------------------------------------------------*/



	navbar.affix({
	  offset: {
	    top: 12
	  }
	});

	navbar.on('affix.bs.affix', function() {
		if (!navbar.hasClass('affix')){
			navbar.addClass('animated slideInDown');
  			navbar.find('.js-brand-hinge').addClass('animated hinge');
		}
	});

	navbar.on('affix-top.bs.affix', function() {
	  	navbar.removeClass('animated slideInDown');
	  	$('.navbar-collapse').collapse('hide');
	});


	/*-------------------------------------------------------------------------------
	 Navbar collapse
	-------------------------------------------------------------------------------*/



	$('.navbar-collapse').on('show.bs.collapse', function () {
	 	navbar.addClass('affix');
	});

	$('.navbar-collapse').on('hide.bs.collapse', function () {
		if (navbar.hasClass('affix-top')){
			navbar.removeClass('affix');
		}
	});

	$(".navbar-nav > li > a").on('click', function() {
	    $(".navbar-collapse").collapse('hide');
	});



	/*-------------------------------------------------------------------------------
	 Scrollspy
	-------------------------------------------------------------------------------*/



	$('body').scrollspy({
		offset:  navbarAffixHeight + 1
	});

	$(".partners-carousel").owlCarousel({
		itemsMobile:[479,1],
		itemsTablet:[768,2],
		itemsDesktopSmall:[979,3],
		items:4,
		responsiveRefreshRate:0,
	 	autoHeight : true,
    	responsiveRefreshRate : 0,
	});




	/*-------------------------------------------------------------------------------
	  Parallax
	-------------------------------------------------------------------------------*/



	if(!mobileDevice){
		$(window).stellar({
		  	responsive: true,
		  	horizontalScrolling: false,
		  	hideDistantElements: false,
		  	horizontalOffset: 0,
		  	verticalOffset: 0,
		});
	}



	/*-------------------------------------------------------------------------------
	  Pie charts
	-------------------------------------------------------------------------------*/



    $(window).scroll( function(){

	    $('.chart').each( function(i){
	        var bottom_of_object = $(this).offset().top + $(this).outerHeight();
	        var bottom_of_window = $(window).scrollTop() + $(window).height();
	        if( bottom_of_window > bottom_of_object ){
		        $('.chart').easyPieChart({
		          scaleColor:false,
		          trackColor:'#ebedee',
		          barColor: function(percent) {
				    var ctx = this.renderer.getCtx();
				    var canvas = this.renderer.getCanvas();
				    var gradient = ctx.createLinearGradient(0,0,canvas.width,0);
				        gradient.addColorStop(0, "#e35e5b");
				        gradient.addColorStop(1, "#febf28");
				    return gradient;
				  },
			      lineWidth:6,
			      lineCap: false,
			      rotate:180,
			      size:180,
		          animate:1000
		        });
	        }
	    }); 
	});



	/*-------------------------------------------------------------------------------
	  Video pop-up
	-------------------------------------------------------------------------------*/



	$('.js-play').magnificPopup({
	    type: 'iframe',
	    removalDelay: 300
    });



	/*-------------------------------------------------------------------------------
	  Reviews carousel
	-------------------------------------------------------------------------------*/



	$(".review-carousel").owlCarousel({
		itemsTablet:[768,1],
		itemsDesktopSmall:[979,2],
		itemsDesktop:[1199,3],
		items:3,
		responsiveRefreshRate:0,
	 	autoHeight : true
	});



	/*-------------------------------------------------------------------------------
	  Subscribe Form
	-------------------------------------------------------------------------------*/


	
    $('#mc-form').ajaxChimp({
        url: 'http://blahblah.us1.list-manage.com/subscribe/post?u=5afsdhfuhdsiufdba6f8802&id=4djhfdsh9'
            //http://xxx.xxx.list-manage.com/subscribe/post?u=xxx&id=xxx
	});


    $.ajaxChimp.translations.cm = {
        'submit': 'Submitting...',
        0: '<i class="fa fa-envelope"></i> Awesome! We have sent you a confirmation email',
        1: '<i class="fa fa-exclamation-triangle"></i> Please enter a value',
        2: '<i class="fa fa-exclamation-triangle"></i> An email address must contain a single @',
        3: '<i class="fa fa-exclamation-triangle"></i> The domain portion of the email address is invalid (the portion after the @: )',
        4: '<i class="fa fa-exclamation-triangle"></i> The username portion of the email address is invalid (the portion before the @: )',
        5: '<i class="fa fa-exclamation-triangle"></i> This email address looks fake or invalid. Please enter a real email address'
    };


	/*-------------------------------------------------------------------------------
	  Ajax Form
	-------------------------------------------------------------------------------*/



	if ($('.js-ajax-form').length) {
		$('.js-ajax-form').each(function(){
			$(this).validate({
				errorClass: 'error wobble-error',
			    submitHandler: function(form){
		        	$.ajax({
			            type: "POST",
			            url:"mail.php",
			            data: $(form).serialize(),
			            success: function() {
			                $('.modal').modal('hide');
		                	$('#success').modal('show');
		                },

		                error: function(){
			            	$('.modal').modal('hide');
			                $('#error').modal('show');
			            }
			        });
			    }
			});
		});
	}
})(jQuery);
