// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function ( $, window, document, undefined ) {

  "use strict";
  
  /**
   * Global variables available for all scopes
   */
  var $popupBox = $('#popupBox');
  var $fixedNav = $('#fixednavbar');
  var $floatingNav = $('#floatingnavbar');
  var slidingCircles = 0;
  var section01, section02, section03, section04, section05, siteLogo;
  var scrollDir, resize;
  var popin = false;
  var screenSize;
  
  /**
   * All function calls are placed on top for ease of access
   * and personal coding practices.
   */
  $(document).ready(function(){
    // reset the document each time we refresh [because I say so!]
    $(document).scrollTop(0);
    // after the DOM is ready we get the window width
    portfolio_get_screen_size();
    portfolio_resize_project_info_box();
    portfolio_show_box();
    portfolio_start_circles();
    portfolio_resize_sections();
    $(window).on('DOMMouseScroll', portfolio_get_scroll_direction);
    $(window).on('scroll', portfolio_hide_show_navbar_and_circles);
    $('#section02').find('.featurepicwrapper').on('click', portfolio_project_popup_box);
    $fixedNav.find('li').on('click',  {event: 'fixed'}, portfolio_scrollTo_page_segment);
    $floatingNav.find('li').on('click', {event: 'floating'}, portfolio_scrollTo_page_segment);
    $('#indicators').find('li').on('click',  {event: 'indicators'}, portfolio_scrollTo_page_segment);
    $('#main-carousel').find('.slide').on('click', portfolio_project_ajax_load);
    $('#closePopupBox').on('click', portfolio_project_popup_box_close);
    $('#contactForm').find('.btn').on('mouseover', portfolio_contact_form_antibot_validation);
    $('#contactForm').find('.btn').on('click', portfolio_contact_form_operations);
    // delete the content from the form fields upon page load.
    $('#contactForm').find('.email, .name, .body, .subject').val('');  
    $(document).on('scroll', portfolio_parallax);
    $('#services').find('.service').on('click', portfolio_display_service);
    portfolio_get_section_positions();
  //
  });
  
  
  /**
   * Call all the elements that need to be responsive
   */
  $(window).resize(function() {
    clearTimeout(resize);
    resize = setTimeout(function() {
      //magic goes here
      portfolio_resize_sections();
      portfolio_get_screen_size();
    }, 300);
  });
  
  
  /**
   * Get the size of the screen, simple as that.
   */
  function portfolio_get_screen_size() {
    screenSize = $(window).width();
  }
  
  /**
   * 
   */
  function portfolio_parallax() {
    var scrollPos = $(document).scrollTop();
    // this will represent when the current sections ends and next section begins to appear on screen.
    var windowHeight = $(window).height();
    var scrollPosBot = scrollPos + windowHeight - 100;
    var indicatorPos = scrollPos + (windowHeight / 2);
    portfolio_start_circles();
    
    // start fading in the quotes.
    if ((scrollPosBot - 300) > section05.top && !popin) {
      $('#section05').find('.quote').addClass('pop-in');
      popin = true; 
    // fade the quotes out  
    } else if ((scrollPosBot < section05.top)) {
      $('#section05').find('.quote').removeClass('pop-in');
      popin = false; 
    }
    
    
    if (indicatorPos < section02.top) {
      $('#indicators').find('li').removeClass('active').eq(0).addClass('active');
    } else if (indicatorPos < section03.top && indicatorPos > section02.top) {
      $('#indicators').find('li').removeClass('active').eq(1).addClass('active');
    } else if (indicatorPos < section04.top && indicatorPos > section03.top) {
      $('#indicators').find('li').removeClass('active').eq(2).addClass('active');
    } else if (indicatorPos < section05.top && indicatorPos > section04.top) {
      $('#indicators').find('li').removeClass('active').eq(3).addClass('active');
    } else if (indicatorPos > section05.top) {
      $('#indicators').find('li').removeClass('active').eq(4).addClass('active');
    }

    
    /*
    if (scrollPos > section03.top && !popin) {
      $('#section03').find('.wrapper').addClass('pop-in');
      
    }
    */
    /*
    console.log(scrollPosBot);
    console.log(section05.top);
    //console.log('scroll: ' + scrollPos);
    */
  }
  
  
  /*
   * Highlihgits the clicked indicator, also when page si scrolled
   * 
   * @param int id
   * 
   */
  function portfolio_highlight_indicator(id) {
    $('#indicators').find('li').removeClass('active').eq(id).addClass('active');
  }
  
  
  /**
   * Calculates the positions of each section in relation to the document. 
   */
  function portfolio_get_section_positions() {
    section02 = $('#section02').position();
    section03 = $('#section03').position();
    section04 = $('#section04').position();
    section05 = $('#section05').position();
    siteLogo  = $('#intro').position();
  }
  
  
  /**
   * This fires when we use the mousewheel, and returns the direction
   * in which we scrolled, up/down.
   */
  function portfolio_get_scroll_direction(event) {
      if (event.originalEvent.detail >= 0) {
        // Down
        scrollDir = 1;
      }
      else {
        // Up
        scrollDir = -1;
      }     
  }
  
  /*
   * Starts the circles animation on document ready and when the scroll
   * position is at the begginin/top of the document.
   */
  function portfolio_start_circles() {
    
    var scrollPos = $(document).scrollTop();

    if (scrollPos < 410 && slidingCircles == 0) {
      slidingCircles = setInterval(function(ev){
        // animate the circles.
        $('.small1').animate({'opacity': 1}, 400, function(){
            $('.small2').animate({'opacity': 1}, 400, function(){
              $('.small3').animate({'opacity': 1}, 400, function(){
                  $('.small4').animate({'opacity': 1}, 400, function(){
                    $('.small1, .small3, .small2, .small4').animate({'opacity': 0}, 400);
                  });
              });
            });
        });
      }, 2100);
    } else if (scrollPos > 411 && slidingCircles > 0) {
      // unset the timer and variable, and reset the styles for the circles
      clearTimeout(slidingCircles);
      slidingCircles = 0;
      $('.small').css({'opacity':0});
    }
    
  }
  
  
  /**
   * Initializing the NiceScroll on the document
   */
  //$("html").niceScroll({cursorcolor:"#FFF", cursorwidth:"7px", cursorborder: "1px solid #000"});
  
  
  /**
   * Loading the tooltips for the social media links.
   */
  $('[data-toggle="tooltip"]').tooltip();
  
  
  /**
   * We must take the height of the filler image
   * and pass it as the default height to the sibling div
   * which houses all the project information so that it too
   * has the identical height at all times (on load / and 
   * during resizing).
   * 
   * This is called during initial load and during window resizing.
   */
  function portfolio_resize_project_info_box(){
    var imgSize = $('#section02').find('.featurepic').height();
    $('#section02').find('.info').height(imgSize);
  }
  
  
  /**
   * Just shows the .box in the first section upon loading the site
   */
  function portfolio_show_box() {
    $('#section01').find('.box').animate({'opacity': 1}, 650);
  }

  /*
   * When a service is clicked on , entire row is expanded
   * and the service color is restored.
   */
  function portfolio_display_service() {
    var $service = $(this);
    
    $service.toggleClass('color');
    $service.find('p').slideToggle();
    
    // the document height has changed, so we need to recalculate the positions.
    portfolio_get_section_positions();
  }
  
  /**
   * Calls an larger image of the feature project image
   * in a popup box and bind the mouse event to pan
   * the displayed larger image across the popup box.
   * 
   * Closing the box will destroy the event.
   */
  function portfolio_project_popup_box() {
    
    var padLeft, padTop;
    // get the image name
    var imageName = $('#section02').find('.featurepic').attr('data-name');
    // get the project folder/name
    var project = $('#section02').find('.featurepic').attr('data-project');
    // build the src/url
    var src = '/images/projects/' + project + '/' + imageName; 
    // build the image itself.
    var image = $('<img class="featureimage" />');
    image.attr('src', src);
    
    // insert the image into the HTML.
    $popupBox.find('.inner').html('').html(image);
    
    // Get the number of pixels to center the popup.
    var maxWidth = $(window).width();
    var popupWidth = 1000;// @TODO dynamically ascertain the width via mediaqueries/resolution.
    var left = (maxWidth - popupWidth) / 2;
    var top  = $(window).height() - 100;
    
    // Center the popup accoding to resolution and fade it in.
    $popupBox.find('.boxwrapper').css({'left': left, 'height': top});
    $popupBox.find('.inner').css({'height': top - 45});
    $popupBox.fadeIn(200, function(){
      // after the image is displayed position it in the center of the box.
      var imgHeight = $(this).find('.featureimage').height();
      var imgWidth = $(this).find('.featureimage').width();
      padLeft = (imgWidth - $(this).find('.inner').width()) / 2;
      padTop = (imgHeight - (top - 45)) / 2;
      
      $popupBox.find('.featureimage').css({'left': padLeft*(-1), 'top': padTop*(-1)});
      
    });
    // set the close/open flag.
    $('#closePopupBox').removeClass('closed').addClass('opened');
    // Temporarily disable the scroll.
    $('body').addClass("stop-scrolling");
       
    
    
    // CAlculates the mouse position and translates the movement
    // into pixels which we then use to move the image in the box.
    $popupBox.find('.boxwrapper').mousemove(function(e){
      var diff = $popupBox.offset();
      var relativeX = e.pageX - this.offsetLeft;
      var relativeY = ((e.pageY/diff.top) - 1 ) * 1500;
      if (relativeY > 1 && relativeY < padTop*2) {
        $popupBox.find('.featureimage').css('top', relativeY*(-1) +'px');  
      }
      if (relativeX > 1 && relativeX < padLeft*2) {
        $popupBox.find('.featureimage').css('left', relativeX*(-1) +'px');  
      }

    }); 
    
  }
  
  
  /**
   * Closes the popupbox.
   * Removes the image and resets the flags.
   */
  function portfolio_project_popup_box_close() {    
    // remove the image and fadeout the popupbox
    $popupBox.fadeOut().find('.featureimage').remove();
    // set flag to false    
    $(this).removeClass('opened').addClass('closed');
    // enable the scroll.
    $('body').removeClass("stop-scrolling");
  }
  
  
  /**
   * On click loads the selected project into the above part
   * of the section 04, and makes it the `feature project`, 
   * until a new project has been loaded.
   */
  function portfolio_project_ajax_load() {
    // get the project info
    var project = $(this).attr('data-project');
    project = 'assets/projects/' + project;
    
    $('#ajaxLoader').load( project, function() {
      // remove the current `current project`
      $("#section02").find('.currentProject').remove();
      // move the new project to its place and fade it in.
      $(this).find('.currentProject').insertAfter($("#section02").find('.heading'));
      $("#section02").find('.currentProject').fadeIn(500);
      // we empty the contents of the ajaxDiv, just in case.
      $(this).html('');
      // call the neccesary functions once more
      portfolio_resize_project_info_box();
      $('#section02').find('.featurepicwrapper').on('click', portfolio_project_popup_box);
    });
    
  }
  
  
  /**
   * Pre-validation for the contact form, as an anti-bot measure.
   * We use this method because bot's can click on a button,
   * but cannon trigger the mouseover/mouseenter events.
   */
  function portfolio_contact_form_antibot_validation() {
    
   // this means that a real person has moved their mouse
   // over the button, and not a bot clicking the button. 
   $('#contactForm').find('.btn').addClass('passed');

  }
  
  
  /**
   * The validation and submition of the contact
   * form.
   */
  function portfolio_contact_form_operations(e) {
    
    e.preventDefault();
    // load the 3 elements that are required for form submition
    var $name  = $('#contactForm').find('.name');
    var $email = $('#contactForm').find('.email');
    var $body  = $('#contactForm').find('.body');
    var $subject  = $('#contactForm').find('.subject');
    // regex for testing email
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    
    // anti bot validation, if the submit does not have the
    // class 'passed' nothing will happen;
    if (!$('#contactForm').find('.btn').hasClass('passed')) {
      return false;
    }

    // validation of the name
    if ($name.val() == '') {
      $name.addClass('invalid').removeClass('valid');
    } else {
      $name.addClass('valid').removeClass('invalid');
    }
    // validation of the email
    if (!$email.val()) {
      $email.addClass('invalid').removeClass('valid');
    } else if (regex.test($email.val()) && $email.val()) {
      $email.addClass('valid').removeClass('invalid');
    }
    // validation of the subject
    if (!$subject.val()) {
      $subject.addClass('invalid').removeClass('valid');
    } else if ($subject.val() && $subject.val()) {
      $subject.addClass('valid').removeClass('invalid');
    }
    // validation of the body
    if (!$body.val()) {
      $body.addClass('invalid').removeClass('valid');
    } else if ($body.val() && $body.val().length > 50) {
      $body.addClass('valid').removeClass('invalid');
    }

    // fianlly we call the function wich whill send the email if validation is TRUE.
    if ($body.hasClass('valid') && $name.hasClass('valid') && $email.hasClass('valid') && $subject.hasClass('valid')) {
      var data = {};
      data.email = $email.val();
      data.body = $body.val();
      data.name = $name.val();
      data.subject = $subject.val();
      portfolio_send_email(data);
    } else {
      return false;
    }   

    return false;
    
  }
      
      
  /**
   * The function that send the contact form parameters to the php
   * script.
   * 
   * @see send_email.php
   */
  function portfolio_send_email(emailData) {

    if(emailData) {
        jQuery.ajax({
            url: "send_email.php",
            data:'name='+emailData.name+'&email='+
            emailData.email+'&subject='+
            emailData.subject+'&body='+
            emailData.body,
            type: "POST",
            success:function(data){
                $('#modal .modal-body').html(data);
                $('#modal').modal('show'); 
                $('#modal').find('.review').on('click', portfolio_review_email);
                $('#contactForm').find('.email, .name, .body').val(''); 
            },
            error:function(data){
              $('#modal .modal-body').html(data);
              $('#modal').modal('show');      
            }
        });
      }
  }
  
  
  /**
   *  Toggles the visibility of the email when a successful
   *  callback has been made. 
   */
  function portfolio_review_email() {
      $('#modal').find('.emailcontent').toggleClass('hide');
  }
    
    
  /*
   * Controls the behaviour of the navbars.
   * The top/fixed one will be hidden once the scrollbar
   * passed a ceratin point of pixels, and after that
   * the floating navbar will be displayed. 
   */
  function portfolio_hide_show_navbar_and_circles() {
        
    var scrolledAmount = $(window).scrollTop();
    
    // in relation to the scroll position we call one of two functions
    // which will hide/show the navbars.
    if (scrolledAmount > 100 && screenSize > 1200) {
      portfolio_show_floating_hide_fixed_navbar_controll(scrolledAmount);
    } else {
      portfolio_show_fixed_hide_floating_navbar_controll(scrolledAmount);
    }
    
  }
  
  
  /**
   * The logic behind the fixed navbar.
   * I've kept it separate from the main controller
   * since we're gonna used it on resize/ready events as well.
   * 
   * Here we will hide the fixed navbar and show the floating one.
   *  
   * @param int scrolledAmount
   *    the page offset when scrolled
   */
  function portfolio_show_floating_hide_fixed_navbar_controll(scrolledAmount) {
    
    if ($fixedNav.hasClass('on')) {
      $('#navbar').stop(true,true).fadeOut(200, function(){
        $fixedNav.animate({'opacity': 0}, 350).addClass('off').removeClass('on');
      });  
    }
    
    if (scrolledAmount > 450 && $floatingNav.hasClass('off')) {
      $floatingNav.stop(true,true).animate({'width': 205}, 330).addClass('on').removeClass('off');
    }
    
    // this is if we already showed the flaoting bar and the screen shrunked
    if (!$floatingNav.hasClass('off') && screenSize < 1200) {
      $floatingNav.stop(true,true).animate({'width': 0}, 330).addClass('off').removeClass('on');
      $fixedNav.animate({'opacity': 1}, 200, function(){
        $('#navbar').stop(true,true).fadeIn(200);
      }).addClass('on').removeClass('off'); 
    }
    
  }
  
  
  /**
   * The logic behind the fixed navbar.
   * I've kept it separate from the main controller
   * since we're gonna used it on resize/ready events as well.
   * 
   * Here we will hide the floating navbar and show the fixed one.
   * 
   * @param intereg scrolledAmount
   *    the page offset when scrolled
   */
  function portfolio_show_fixed_hide_floating_navbar_controll(scrolledAmount) {
    
    if ($fixedNav.hasClass('off')) {      
      $fixedNav.animate({'opacity': 1}, 200, function(){
        $('#navbar').stop(true,true).fadeIn(200);
      }).addClass('on').removeClass('off');        
    }
    
    if ($floatingNav.hasClass('on')) {
      $floatingNav.stop(true,true).animate({'width': 0}, 330).addClass('off').removeClass('on');
    }
  }
  
  
  /**
   * Resizes the Section01 and Section03 accodingly to the window resolution.
   * They must always be the same height as the height of the document.
   */
  function portfolio_resize_sections() {
    var doc_height = $(window).height();
    $('#section01, #section03').height(doc_height);
  }
  
  
  /**
   * After a menu item has been clicked the id is passed
   * to this function and it's used to scroll the page to the 
   * corresponding section.
   * 
   * @param string caller
   *    who called the function
   */
  function portfolio_scrollTo_page_segment(caller) {
    // the id of the clicked element
    var id = $(this).text().toLowerCase();

    // animate the document via scrolling
    $('html, body').animate({
        scrollTop: $("#" + id).offset().top
    }, 1000);
    
    // we do this is after we have clicked on the floating navbar
    // it will close after the event has been triggered.
    if (caller.data.event == 'floating') {
      $floatingNav.find('.navbar-toggle').click();
    }
    
    // if we clicked on an indicator, remove the previous holder of 
    // the active class and assigned it to the current.
    if (caller.data.event == 'indicators') {
      $('#indicators').find('li').removeClass('active');
      $(this).addClass('active');      
    } else {
      var position = $(this).attr('data-id');
      portfolio_highlight_indicator(position);
    }
    
  }
  
  
  // End of file
})( jQuery, window, document );