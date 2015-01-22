(function ($) { // JavaScript should be compatible with other libraries than jQuery
  Drupal.behaviors.textResize = { // D7 "Changed Drupal.behaviors to objects having the methods "attach" and "detach"."
    attach: function(context) {
      // Which div or page element are we resizing?
      if (text_resize_scope) { // Admin-specified scope takes precedence.
        var element_to_resize = $(text_resize_scope); // It's just a tag specified by admin
      }
      else { // Look for some default scopes that might exist.
        if ($('DIV.left-corner').length > 0) {
          var element_to_resize = $('DIV.left-corner'); // Main body div for Garland
        }
        else if ($('#content-inner').length > 0) {
          var element_to_resize = $('#content-inner'); // Main body div for Zen-based themes
        }
        else if ($('#squeeze > #content').length > 0) {
          var element_to_resize = $('#squeeze > #content'); // Main body div for Zen Classic
        }
      }

      var $scope = element_to_resize;

      // Changer links will change the text size when clicked
      $('a.changer').click(function() {
        var button = this;
        $scope.each(function () {
          element_to_resize = $(this);
          
          // Set the current font size of the specified section as a variable
          var currentFontSize = parseFloat(element_to_resize.css('font-size'), 10);
          // Set the current line-height
          var current_line_height = parseFloat(element_to_resize.css('line-height'), 10);
          // javascript lets us choose which link was clicked, by ID
          if (button.id == 'text_resize_increase') {
            var new_font_size = currentFontSize * 1.2;
            if (text_resize_line_height_allow) { var new_line_height = current_line_height * 1.2; }
            // Allow resizing as long as font size doesn't go above text_resize_maximum.
            if (new_font_size <= text_resize_maximum) {
              $.cookie('text_resize', new_font_size, { path: '/' });
              if (text_resize_line_height_allow) { $.cookie('text_resize_line_height', new_line_height, { path: '/' }); }
              var allow_change = true;
            }
            else {
              $.cookie('text_resize', text_resize_maximum, { path: '/' });
              if (text_resize_line_height_allow) { $.cookie('text_resize_line_height', text_resize_line_height_max, { path: '/' }); }
              var reset_size_max = true;
            }
          }
          else if (button.id == 'text_resize_decrease') {
            var new_font_size = currentFontSize / 1.2;
            if (text_resize_line_height_allow) { var new_line_height = current_line_height / 1.2; }
            if (new_font_size >= text_resize_minimum) {
              // Allow resizing as long as font size doesn't go below text_resize_minimum.
              $.cookie('text_resize', new_font_size, { path: '/' });
              if (text_resize_line_height_allow) { $.cookie('text_resize_line_height', new_line_height, { path: '/' }); }
              var allow_change = true;
            }
            else {
              // If it goes below text_resize_minimum, just leave it at text_resize_minimum.
              $.cookie('text_resize', text_resize_minimum, { path: '/' });
              if (text_resize_line_height_allow) { $.cookie('text_resize_line_height', text_resize_line_height_min, { path: '/' }); }
              var reset_size_min = true;
            }
          }
          else if (button.id == 'text_resize_reset') {
            $.cookie('text_resize', null, { path: '/' });
            if (text_resize_line_height_allow) { $.cookie('text_resize_line_height', null, { path: '/' }); }
            var reset_size_original = true;
          }
          // jQuery lets us set the font size value of the main text div
          if (allow_change == true) {
            element_to_resize.css('font-size', new_font_size + 'px'); // Add 'px' onto the end, otherwise ems are used as units by default
            if (text_resize_line_height_allow) { element_to_resize.css('line-height', new_line_height + 'px'); }
          }
          else if (reset_size_min == true) {
            element_to_resize.css('font-size', text_resize_minimum + 'px');
            if (text_resize_line_height_allow) { element_to_resize.css('line-height', text_resize_line_height_min + 'px'); }
          }
          else if (reset_size_max == true) {
            element_to_resize.css('font-size', text_resize_maximum + 'px');
            if (text_resize_line_height_allow) { element_to_resize.css('line-height', text_resize_line_height_max + 'px'); }
          }
          else if (reset_size_original == true) {
            element_to_resize.css('font-size', '');
            if (text_resize_line_height_allow) { element_to_resize.css('line-height', ''); }
          }
        });
      });
    }
  };
})(jQuery);