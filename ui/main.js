console.log('Loaded!');
//changes the text of main-text div
var element= document.getElementById("main-text");
element.innerHTML="New Value";

//move the image
var img=document.getElementById("madi");

function moveRight(){
    marginLeft=marginLeft+1;
    img.style.marginLeft=marginLeft+"px";
}

img.onclick=function() {
    var interval=setInterval(moveRight,50);
}