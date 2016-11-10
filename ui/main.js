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

/*
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
*/


var submit=document.getElementById("submit_btn");
submit.onclick=function(){
    // make a request to the server and send the name
   //create a request object
    var request= new XMLHttpRequest();
    
    //capture response and store it
    request.onreadystatechange=function(){
        if(request.readyState===XMLHttpRequest.DONE){
            //take some action
            if(request.status===200){
                console.log("user logged in");
                alert("Logged in Succesfully");
            }else if(request.status===403) {
                alert("The Username?password is incorrect");
            }else if(request.status===500) {
                alert("Something Went Wrong on the Server");
            }
        }
        // not done yet
    };
    var username=document.getElementById("username").value;
    var password=document.getElementById("password").value;
    console.log(username);
    console.log(password);
    //Make a request
    request.open("POST","http://kshitijsrivastava.imad.hasura-app.io/login",true);
    request.setRequestHeader('Content-Type','application/json');
    request.send(JSON.stringify({username:"username",password:"password"}));
};

/*
var submit=document.getElementById("submit_btn");
submit.onclick=function(){
    // make a request to the server and send the name
   //create a request object
    var request= new XMLHttpRequest();
    
    //capture response and store it
    request.onreadystatechange=function(){
        if(request.readyState===XMLHttpRequest.DONE){
            //take some action
            if(request.status===200){
                //capture a list of names and render as a list 
               var names=request.responseText;
               names=JSON.parse(names);
                var list="";
                for(var i=0;i<names.length;i++)
                {
                 list+="<li>"+names[i]+"</li>";
                }
                 var ul=document.getElementById("namelist");
                ul.innerHTML=list;
            }
        }
        // not done yet
    };
    var nameInput=document.getElementById("name");
    var name=nameInput.value;
    //Make a request
    request.open("GET","http://kshitijsrivastava.imad.hasura-app.io/submit-name?name="+ name,true);
    request.send(null);
};
*/



