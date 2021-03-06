// $Id $

The Text Resize  module creates a block with links that use jQuery to resize text within the specified DIV.

Text Resize was designed by Mark W. Jarrell at Jones Knowledge Group (http://www.jones.com).


Install
-------
Installing the Text Resize module is simple:

1) Copy the text_resize folder to the modules folder in your installation.

2) Enable the module using Administer -> Modules (/admin/build/modules)


Customization
-------

Text Resize should work fine with either Garland or Zen-based themes.  If it's not working for your
installation, you may need to change the div that's being resized.

Check inside text_resize.js.  The line that says "var elementToResize" needs
to be set equal to your DIV that you're wanting to resize.  You can also make the value
equal to $('BODY'); if you want to resize all body text.

Support
-------
If you experience a problem with the module, file a
request or issue on the Text Resize queue. DO NOT POST IN THE FORUMS. Posting in
the issue queues is a direct line of communication with the module author.