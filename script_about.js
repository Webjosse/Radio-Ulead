window.onload= function(){
  setTimeout(headerA, 1000);
};
function headerA(){
    var Header = document.getElementsByTagName('header')[0];
    Header.firstElementChild.style.transition = "1s";
    Header.lastElementChild.style.transition = "1s";
};
