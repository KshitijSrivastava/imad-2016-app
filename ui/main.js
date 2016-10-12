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

button.onclick=function(){
    //create a request object
    var request= new XMLHttpRequest();
    
    //capture response and store it
    request.onreadystatechange=function(){
        if(request.readyState===XMLHttpRequest.DONE){
            //take some action
            if(request.status===200){
                var counter=request.responseText;
                var span = document.getElementById("count");
                span.innerHTML = counter.toString();
            }
        }
        // not done yet
    };
    //Make a request
    request.open("GET","http://kshitijsrivastava.imad.hasura-app.io/counter/",true);
    request.send(null);
};

var nameInput=document.getElementById("name");
var name=nameInput.value;
var submit=document.getElementById("submit_btn");

submit.onclick=function(){
    // make a request to the server and send the name
    
    //capture a list of names and render as a list 
    var names=["name1","name2","name3","name4"];
    var list="";
    for(var i=0;i<names.length;i++)
    {
        list+="<li>"+names[i]+"</li>";
    }
    var ul=document.getElementById("namelist");
    ul.innerHTML=list;
};




