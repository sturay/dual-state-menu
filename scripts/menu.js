// Specify the target button to collapse/expand the main navigation
var nav = document.getElementById('toggleBtn'); // <nav class="nav">
var menuIconAction = document.querySelectorAll('.menu-label')
// initial heights
var initialHeights = document.getElementsByClassName("level-1");
var values = [];
this.tooltipId = undefined;

for(var i = 0; initialHeights.length > i; i++){
  values.push(initialHeights[i].clientHeight);
}

var mainSubMenus = document.getElementsByClassName("level-1");
function toZero(){
  for(i = 0; mainSubMenus.length > i; i++){
    mainSubMenus[i].setAttribute("style", "height:0;");
  }
}
toZero();

var toggleNav = function () {
  tooltipId = window.setTimeout(hideToolltip, 1);
  var sections = document.querySelectorAll('span.menu-label.list');
  for(var i=0; i < sections.length; i++){
    sections[i].classList.remove('active');
  }
  // 'this' is the target element that the click event was bound to.

  // get the height of all of the inner UL elements within the parent element
  var temp = document.getElementById('flyout');

  for(i = 0; mainSubMenus.length > i; i++){
    if(this.classList.contains("expanded")) {
      toZero();
    }
    else if(this.classList.contains("collapsed")) {
      if(temp.classList.contains('active')){
        temp.classList.remove('active');
         tooltipId = window.setTimeout(countdown, 250);
      }
      // make sure all uf the child lists are collapsed
      for(i = 0; initialHeights.length > i; i++){
        initialHeights[i].classList.remove('expanded');
        initialHeights[i].classList.add('collapsed');
      }
      toZero();
    }
  }

  // identify the parent element of the menu
  var parentElement = document.getElementById('navigation');
  
  // alter the classList object to toggle classes for css animation/transition !IE9
  parentElement.classList.toggle("collapsed");
  parentElement.classList.toggle("expanded");
  
  // do the same to the button so the inline svg can adapt to the state
  this.classList.toggle("collapsed");
  this.classList.toggle("expanded");

};

// bind the collapse function to the target element
nav.addEventListener('click', toggleNav, false);

// Accordion action bound to the main section element name 'menu-label.list'
var control = document.getElementById('navigation');

function hideToolltip(){
  document.getElementById('menu_tooltip').classList.remove('tooltip');
  document.getElementById('menu_tooltip').classList.add('hidden');
  document.getElementById('menu_tooltip').innerHTML = '';
}

var menu_tooltip = function(event, str) {
  window.clearTimeout(tooltipId);
  navItems = event.currentTarget.lastChild;
  str = navItems.innerHTML;
  var element = event.currentTarget;
  if(document.getElementById('navigation').classList.contains('collapsed')) {
    // show tooltip
    if(!document.getElementById('flyout').classList.contains('active')){
      var useThis = document.getElementById('menu_tooltip');
      useThis.style.top = '-100px';
      var elem = element.getBoundingClientRect();
      var elemTop = elem.top;
      var elemHeight = elem.height / 2;
      var elemWidth = elem.width;
      useThis.classList.remove('hidden');
      useThis.classList.add('tooltip');
      useThis.innerHTML = '';
      useThis.style.top = elemTop + 6 + 'px';
      useThis.innerHTML = str;
      tooltipId = window.setTimeout(hideToolltip, 2000);
    }
  }
};

var accordion = function(event, name) {

  name = event.currentTarget.nextElementSibling.id;
  console.log(name)
  
  var clickedSections = document.querySelectorAll('span.menu-label.list');
  for(i=0; i < clickedSections.length; i++){
    if(event.currentTarget.classList.contains('active') && document.getElementById('flyout').classList.contains('active')) {
      event.currentTarget.classList.remove('active');
      document.getElementById('flyout').classList.remove('active');
      return;
    }
    clickedSections[i].classList.remove('active');
  }
  var thisSection = event.currentTarget.classList.add('active');

  document.getElementById('menu_tooltip').classList.remove('tooltip');
  document.getElementById('menu_tooltip').classList.add('hidden');

  // Main accordion functionality - only available when expanded
  if(document.getElementById('navigation').classList.contains('expanded')){ // key element for differentiating between states
    var menuToUse = document.getElementById(name), indexOfMenu;
    var allMenusReset = document.querySelectorAll('ul.level-1');
    if (menuToUse.classList.contains('collapsed')){
      for(i=0; i < allMenusReset.length; i++){
        allMenusReset[i].style.height = '0px';
        allMenusReset[i].classList.remove('expanded');
        allMenusReset[i].classList.add('collapsed');
        allMenusReset[i].setAttribute('dataIndex', i);
      }
      if(menuToUse.getAttribute('style') !== "height:0px;"){
        indexOfMenu = menuToUse.getAttribute('dataIndex');
        if (menuToUse.classList.contains('collapsed')){
          menuToUse.setAttribute("style", "height: calc("+ values[indexOfMenu] +"px + 15px);");
          menuToUse.classList.remove('collapsed');
          menuToUse.classList.add('expanded');
        }
      }
      else {
        indexOfMenu = menuToUse.getAttribute('dataIndex');
        menuToUse.setAttribute("style", "height: calc("+ values[indexOfMenu] +"px + 15px);");
        menuToUse.classList.remove('collapsed');
        menuToUse.classList.add('expanded');
      }
    }
    else {
      menuToUse.setAttribute("style", "height:0px;");
      menuToUse.classList.remove('expanded');
      menuToUse.classList.add('collapsed');
    }

  }
  // fly-out menus for when the menu is collapsed
  else {
    var temp = document.getElementById('flyout') || '';

    if(event.currentTarget.classList.contains('active') && temp.classList.contains('active')){
      console.log('foo')
      tooltipId = window.setTimeout(countdown, 25);
      temp.innerHTML = '';
      event.currentTarget.classList.remove('active');
      temp.classList.remove('active');
      return;
    }
    else{
      window.clearTimeout(tooltipId);
      var clickedElement = event.currentTarget.children[1].cloneNode(true);
      var nextElement = document.getElementById(name).cloneNode(true);
      nextElement.id = '_'+name; // alter the id to avoid clashes
      temp.classList.add('active');
      temp.innerHTML = '';
      temp.appendChild(clickedElement);
      temp.appendChild(nextElement);
    }
  }
};
  
var countdown = function(){
  if(document.querySelectorAll('span.menu-label').classList){
    document.querySelectorAll('span.menu-label').classList.remove('active');
  }
  document.getElementById('flyout').classList.remove('active');
  document.getElementById('flyout').innerHTML = '';
  return true;
};

function hideflyout(event){
  var x = event.clientX;
  var y = event.clientY;
  if(x > 36) {
    tooltipId = window.setTimeout(countdown, 3000);
  }
  if(x > document.getElementById('flyout').clientWidth) {
    window.clearTimeout(tooltipId);
  }
  else{
  }
}

for(i=0;i < menuIconAction.length;i++){
  menuIconAction[i].addEventListener('mouseover', menu_tooltip, false);
  menuIconAction[i].addEventListener('click', accordion, true);
}
