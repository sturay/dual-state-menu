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
  
  var sections = document.querySelectorAll('span.menu-label.list')
  for(var i=0; i < sections.length; i++){
    sections[i].classList.remove('active')
  }
  // 'this' is the target element that the click event was bound to.

  // get the height of all of the inner UL elements within the parent element
  for(var i = 0; mainSubMenus.length > i; i++){
    if(this.classList.contains("expanded")) {
      toZero()
    }
    else if(this.classList.contains("collapsed")) {
      var temp = document.getElementById('flyout')
      if(temp.classList.contains('active')){
        temp.classList.remove('active')
        clearTimeout(enterCountdown)
        clearTimeout(countdown)
      }
      // make sure all uf the child lists are collapsed
      for(var i = 0; initialHeights.length > i; i++){
        initialHeights[i].classList.remove('expanded')
        initialHeights[i].classList.add('collapsed')
      }
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


var accordion = function(name, event) {
  
  var clickedSections = document.querySelectorAll('span.menu-label.list')
  for(var i=0; i < clickedSections.length; i++){
    clickedSections[i].classList.remove('active')
  }
  var thisSection = event.path[1].classList.add('active')

  // Main accordion functionality - only available when expanded
  if(document.getElementById('navigation').classList.contains('expanded')){ // key element for differentiating between states
    var menuToUse = document.getElementById(name), indexOfMenu
    var allMenusReset = document.querySelectorAll('ul.level-1')
    if (menuToUse.classList.contains('collapsed')){
      for(var i=0; i < allMenusReset.length; i++){
        allMenusReset[i].style.height = '0px'
        allMenusReset[i].classList.remove('expanded')
        allMenusReset[i].classList.add('collapsed')
        allMenusReset[i].setAttribute('dataIndex', i)
      }
      if(menuToUse.getAttribute('style') !== "height:0px;"){
        indexOfMenu = menuToUse.getAttribute('dataIndex')
        if (menuToUse.classList.contains('collapsed')){
          menuToUse.setAttribute("style", "height: calc("+ values[indexOfMenu] +"px + 15px);")
          menuToUse.classList.remove('collapsed')
          menuToUse.classList.add('expanded')
        }
      }
      else {
        indexOfMenu = menuToUse.getAttribute('dataIndex')
        menuToUse.setAttribute("style", "height: calc("+ values[indexOfMenu] +"px + 15px);")
        menuToUse.classList.remove('collapsed')
        menuToUse.classList.add('expanded')
      }
    }
    else {
      menuToUse.setAttribute("style", "height:0px;")
      menuToUse.classList.remove('expanded')
      menuToUse.classList.add('collapsed')
    }
  }
  // fly-out menus for when the menu is collapsed
  else {
    var temp = document.getElementById('flyout')
    var clickedElement = event.path[1].children[1].cloneNode(true)
    var nextElement = document.getElementById(name).cloneNode(true)
    nextElement.id = '_'+name // alter the id to avoid clashes
    console.log('clickedElement', clickedElement)
    console.log('nextElement', nextElement)
    temp.classList.add('active')
    temp.innerHTML = ''
    temp.appendChild(clickedElement)
    temp.appendChild(nextElement)
  }
}
  
var enterCountdown = function(){
  // console.log('enterCountdown entered')
  setTimeout(function() {
    document.getElementById('flyout').classList.remove('active')
    return true
  }, 3000);
}
var countdown = function(){
  console.log('countdown entered')
  setTimeout(function() {
    document.getElementById('flyout').classList.remove('active')
    return true
  }, 500);
}

function hideflyout(event){
  var x = event.clientX;
  var y = event.clientY;
  var temp = document.getElementById('flyout')
  console.log('x : temp.clientWidth', x, ' : ' , temp.clientWidth)
  if(x > 36) {
    if(enterCountdown()) {
      temp.innerHTML = ''
      clearTimeout(enterCountdown)
    }
  }
  if(x > temp.clientWidth) {
    if(countdown()) {
      temp.innerHTML = ''
      clearTimeout(countdown)
    }
  }
  else{
    console.log('false')
  }
  

}

