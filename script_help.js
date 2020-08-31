window.onload= function(){
  var lis = document.getElementsByTagName('li');
  var H = document.getElementsByTagName('h2');
  lis[0].onclick = function(){H[0].parentNode.nextElementSibling.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});};
  lis[1].onclick = function(){H[1].parentNode.nextElementSibling.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});};
  lis[2].onclick = function(){H[2].parentNode.nextElementSibling.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});};
  lis[3].onclick = function(){H[3].parentNode.nextElementSibling.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});};
  lis[4].onclick = function(){H[4].parentNode.nextElementSibling.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});};
  lis[5].onclick = function(){H[5].parentNode.nextElementSibling.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});};
  setTimeout(headerA, 1000);
};
function headerA(){
    var Header = document.getElementsByTagName('header')[0];
    Header.firstElementChild.style.transition = "1s";
    Header.lastElementChild.style.transition = "1s";
};
