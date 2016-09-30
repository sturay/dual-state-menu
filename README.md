# CC menu playground - vanilla

As long as the HTML structure is the same, inclusion of the script and shim will make the menu spring into life.

## Structure

The structure is very straightforward. A simple list based html list structure separated by any kind of image if required and two empty elements placed at the end of the document.

There are two script files - which could be put into one if required, but the classList.js file could actually benefit a whole suite of other scripts. menu.js is where it all happens and needs to be included **after** the last element and immediately before the closing _body_ tag.
The only requirement is that the classes are the same as in the example. The IDs can be whatever you like as long as they follow W3C rules and are all unique within the document.

The images can be any format. I have just chosen the injected svg files as they demonstrate the non-fussy nature. Styling is irrelevant, but the functionality in the stylesheets should be maintained.
