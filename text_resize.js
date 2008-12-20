// $Id $

if (Drupal.jsEnabled) {
  $(document).ready(function(){
    // Config variables
    var largestSizeAllowed = text_resize_maximum; // Based on admin form variable
    var smallestSizeAllowed = text_resize_minimum; // Based on admin form variable
    // Which div or page element are we resizing?
    if ($('DIV.left-corner').length > 0) {
      var elementToResize = $('DIV.left-corner'); // Main body div for Garland
    } else if ($('#content-inner').length > 0) {
      var elementToResize = $('#content-inner'); // Main body div for Zen-based themes
    } else if ($('#'+text_resize_scope).length > 0) {
      var elementToResize = $('#'+text_resize_scope); // ID specified by admin
    } else {
      var elementToResize = $(text_resize_scope); // It's just a tag specified by admin
    }

    // Set the initial font size if necessary
    if ($.cookie('text_resize') != null) {
      elementToResize.css('font-size', parseFloat($.cookie('text_resize')));
      //alert( "Should be size: " + $.cookie('text_resize'));
    } else {
      //alert('Couldn\'t find text_resize cookie.');
    }
    // Changer links will change the text size when clicked
    $('a.changer').click(function(){
      // set the current font size of .mainText as a var called currentSize
      var currentFontSize = elementToResize.css('font-size');
      // parse the number value out of the font size value, set as a var called 'num'
      var currentFontSizeNum = parseFloat(currentFontSize, 10);
      // javascript lets us choose which link was clicked, by ID
      if (this.id == 'text_resize_fontBig'){
        var newFontSize = currentFontSizeNum * 1.2;
        // Allow resizing as long as font size doesn't go above largestSizeAllowed.
        if (newFontSize <= largestSizeAllowed) {
          $.cookie('text_resize', newFontSize, { path: '/' });
          var allowChange = true;
        }
      } else if (this.id == 'text_resize_fontSmall'){
        var newFontSize = currentFontSizeNum * 0.8;
        if (newFontSize >= smallestSizeAllowed) {
          // Allow resizing as long as font size doesn't go below smallestSizeAllowed.
          $.cookie('text_resize', newFontSize, { path: '/' });
          var allowChange = true;
        } else {
          // If it goes below smallestSizeAllowed, just leave it at smallestSizeAllowed.
          $.cookie('text_resize', smallestSizeAllowed, { path: '/' });
          var resetSize = true;
        }
      }
      // jQuery lets us set the font Size value of the main text div
      if (allowChange == true) {
        elementToResize.css('font-size', newFontSize);
        return false;
      } else if (resetSize == true) {
        elementToResize.css('font-size', smallestSizeAllowed);
        return false;
      }
    });
  });
}