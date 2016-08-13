# CC menu playground - vanilla

Core Control menu updates with vanilla javascript as jQuery is good if you're doing a whole load of DOM manipulation, but awful at more focussed things due to performance and the whole sledgehammer to crack a nut analagy.

The use of Angular is not possible due to conflicting libraries (it's already loaded in the SPAs within Core Control so there are toys thrown)

## Structure

The structure is very straightforward. A simple list based html list structure separated by any kind of image if required and two empty elements placed at the end of the document.

There are two script files - which could be put into one if required, but the classList.js file could actually benefit a whole suite of other scripts. menu.js is where it all happens and needs to be included **after** the last element and immediately before the closing _body_ tag.
The only requirement is that the classes are the same as in the example. The IDs can be whatever you like as long as they follow W3C rules and are all unique within the document.

The images can be any format. I have just chosen the injected svg files as they demonstrate the non-fussy nature. Styling is irrelevant, but the functionality in the stylesheets should be maintained.
