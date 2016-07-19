// Specify the target button to collapse/expand the main navigation
var nav = document.getElementById('toggleBtn'); // <nav class="nav">
// initial heights
var initialHeights = document.getElementsByClassName("level-1")
var values = []
for(var i = 0; initialHeights.length > i; i++){

  values.push(initialHeights[i].clientHeight)
}

var mainSubMenus = document.getElementsByClassName("level-1")
function toZero(){
  for(var i = 0; mainSubMenus.length > i; i++){
    mainSubMenus[i].setAttribute("style", "height:0;")
  }
}
toZero()

var toggleNav = function () {
  
  // 'this' is the target element that the click event was bound to.

  // get the height of all of the inner UL elements within the parent element
  for(var i = 0; mainSubMenus.length > i; i++){
    if(this.classList.contains("expanded")) {
      toZero()
      // mainSubMenus[i].setAttribute("style", "height:"+ values[i].clientHeight +"px;")
    }
    else if(this.classList.contains("collapsed")) {
      toZero()
    }
  }

  // identify the parent element of the menu
  var parentElement = document.getElementById('navigation')
  
  // alter the classList object to toggle classes for css animation/transition !IE9
  parentElement.classList.toggle("collapsed")
  parentElement.classList.toggle("expanded")
  
  // do the same to the button so the inline svg can adapt to the state
  this.classList.toggle("collapsed")
  this.classList.toggle("expanded")

};

// bind the collapse function to the target element
nav.addEventListener('click', toggleNav, false);

// Accordion action bound to the main section element name 'menu-label.list'
var control = document.getElementById('navigation')
if(control.classList.contains('expanded')) {
  var accordion = function(num, loc) {
    console.log('click', this.nextElementSibling)
  }
  var accArray = document.querySelectorAll('nav span.menu-label.list')
  for (var i = 0; i < accArray.length; i++) {
    (function () {
      var part = this.nextElementSibling
      accordion(i, part)
     // part.setAttribute("style", "height:"+ values[i].clientHeight +"px;")
    }).call(accArray[i]);
    accArray[i].addEventListener('click', accordion, false);
  }
}

