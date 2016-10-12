//console.log('Loaded!');
//changes the text of main-text div
//var element= document.getElementById("main-text");
//element.innerHTML="New Value";

//move the image
//var img=document.getElementById("madi");
//var marginLeft=0;
//function moveRight(){
  //  marginLeft=marginLeft+1;
    //img.style.marginLeft=marginLeft+"px";
//}

//img.onclick=function() {
  //  var interval=setInterval(moveRight,50);
//}

//counter code
var button=document.getElementById("counter"); 
var counter=0;

button.onclick=function(){
    //make a request to counter endpoint
   
    //capture response and store it
    
    //render the variable in correct span
    counter=counter+1;
    var span = document.getElementById("span");
    span.innerHTML = counter.toString();
};