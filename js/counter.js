// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function ( $, window, document, undefined ) {

  "use strict"; 
  
  // Simple function to countdown time to 0
  function portfolio_update_time() {
    var txt = $('#countdown').text();
    if (txt > 0) {
      var seconds = txt - 1;
      $('#countdown').text(seconds);  
    } else {
      clearInterval(counter);
      window.location.href="../index.html";
    }    
  }
  
  portfolio_update_time();
  var counter = setInterval(portfolio_update_time, 1000);


  // End of file
})( jQuery, window, document );