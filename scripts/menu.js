// Specify the target button to collapse/expand the main navigation
var nav = document.getElementById('toggleBtn'); // <nav class="nav">
var i;
// specify the main targets for actions both collapsed and expanded
var menuIconAction = document.querySelectorAll('.menu-label');

var resetSubMenuHeights = function(){
  var subs = document.getElementsByClassName("level-2");
  for(i=0; i < subs.length; i++){
    subs[i].style.height = 0;
  }
}

// sub accordion for embedded elements
var subAccordion = function(event) {
  var classes = document.getElementsByClassName("level-2");
  var parentHeight = event.path[1].clientHeight;
  var thisOriginalHeight = secondLevelHeightValues[event.path[0].id];
  var subMenuToUse = event.path[0].firstElementChild
  var indexOfParent, thisClickedHeight;

  if(document.querySelector('.level-2.expanded'))
    thisClickedHeight = document.querySelector('.level-2.expanded').clientHeight
  else
    thisClickedHeight = 0;
  var reduceByNumber = thisClickedHeight - subMenuToUse.clientHeight
  
  if (event.path[0].firstElementChild.classList.contains('collapsed')){
    for(i=0; i < classes.length; i++){
      event.path[1].style.height = parentHeight - thisClickedHeight + 'px';
      classes[i].style.height = 0;
      classes[i].classList.remove('expanded');
      classes[i].classList.add('collapsed');
    }
    if(subMenuToUse.clientHeight === 0){
      indexOfParent = event.path[1].getAttribute('dataIndex');
      if (subMenuToUse.classList.contains('collapsed')){
        subMenuToUse.style.height = secondLevelHeightValues[event.path[0].id] + "px";
        event.path[1].style.height = thisOriginalHeight + firstLevelHeightValues[indexOfParent] + 14 + 'px';
        subMenuToUse.classList.remove('collapsed');
        subMenuToUse.classList.add('expanded');
      }
    }
    else {
      indexOfParent = event.path[1].getAttribute('dataIndex');
      subMenuToUse.style.height = secondLevelHeightValues[event.path[0].id] + "px";
      event.path[1].style.height = thisOriginalHeight + firstLevelHeightValues[indexOfParent] + 14 +'px';
      subMenuToUse.classList.remove('collapsed');
      subMenuToUse.classList.add('expanded');
    }
  }
  else {
    console.log('thisClickedHeight',thisClickedHeight,'reduceByNumber',reduceByNumber, 'subMenuToUse.clientHeight', subMenuToUse.clientHeight)
    event.path[1].style.height = parentHeight - thisClickedHeight + 'px';
    subMenuToUse.style.height = 0;
    subMenuToUse.classList.remove('expanded');
    subMenuToUse.classList.add('collapsed');
  }

  var foo = document.querySelector('.level-2.expanded').clientHeight

}

// initial heights for the sub menus
// these need to be called first so as to not distort the height of the accordions on entry
var secondLevelHeights = document.querySelectorAll("li.sub");
var secondLevelHeightValues = {};
for(i = 0; secondLevelHeights.length > i; i++){
  // create the values for calling whenever
  var id = secondLevelHeights[i].parentElement.id + '_' + i
  secondLevelHeightValues[id] = secondLevelHeights[i].firstElementChild.offsetHeight;
  // add some identifiers for clicks
  secondLevelHeights[i].firstElementChild.style.height = 0;
  secondLevelHeights[i].id = secondLevelHeights[i].parentElement.id + '_' + i
  secondLevelHeights[i].addEventListener('click', subAccordion, true);
}

// initial heights for the accordion now that the subs are zeroed.
var firstLevelHeights = document.getElementsByClassName("level-1");
var firstLevelHeightValues = [];
for(i = 0; firstLevelHeights.length > i; i++){
  firstLevelHeightValues.push(firstLevelHeights[i].offsetHeight);
}

// assign an ID to timeouts
this.tooltipId = undefined;

// target the sub menus so we know where to apply stuff
// get them all in an array
var mainSubMenus = document.getElementsByClassName("level-1");
function toZero(){
  for(i = 0; mainSubMenus.length > i; i++){
    mainSubMenus[i].style.height = 0;
  }
}
toZero();

var toggleNav = function () {
  resetSubMenuHeights()
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
      for(i = 0; firstLevelHeights.length > i; i++){
        firstLevelHeights[i].classList.remove('expanded');
        firstLevelHeights[i].classList.add('collapsed');
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
  resetSubMenuHeights();
  name = event.currentTarget.nextElementSibling.id;
  
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
          menuToUse.style.height = firstLevelHeightValues[indexOfMenu] + 15 + "px";
          menuToUse.classList.remove('collapsed');
          menuToUse.classList.add('expanded');
        }
      }
      else {
        indexOfMenu = menuToUse.getAttribute('dataIndex');
        menuToUse.style.height = "calc( " + firstLevelHeightValues[indexOfMenu] + "px + 15px)";
        menuToUse.classList.remove('collapsed');
        menuToUse.classList.add('expanded');
      }
    }
    else {
      menuToUse.style.height = "0";
      menuToUse.classList.remove('expanded');
      menuToUse.classList.add('collapsed');
    }

  }
  // fly-out menus for when the menu is collapsed
  else {
    var temp = document.getElementById('flyout') || '';

    if(event.currentTarget.classList.contains('activeOut') && temp.classList.contains('active')){
      event.currentTarget.classList.remove('activeOut');
      tooltipId = window.setTimeout(countdown, 25);
      temp.innerHTML = '';
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

// countdown for timeouts
var countdown = function(){
  if(document.querySelectorAll('span.menu-label').classList){
    document.querySelectorAll('span.menu-label').classList.remove('activeOut');
  }
  document.getElementById('flyout').classList.remove('active');
  document.getElementById('flyout').innerHTML = '';
  return true;
};

// hiding the flyout when not needed
function hideflyout(event){
  var x = event.clientX;
  var y = event.clientY;
  if(x > document.getElementById('flyout').clientWidth) {
    tooltipId = window.setTimeout(countdown, 500);
  }
  else if(x > document.getElementById('flyout').clientWidth) {
    window.clearTimeout(tooltipId);
  }
  else{
  }
}

document.getElementById('flyout').addEventListener('click', subAccordion, true);

for(i=0;i < menuIconAction.length;i++){
  menuIconAction[i].addEventListener('mouseover', menu_tooltip, false);
  menuIconAction[i].addEventListener('click', accordion, true);
}
