var comment_btn=document.getElementById("comment_btn");
        comment_btn.onclick()=function(){
        
            var request= new XMLHttpRequest();
    
    request.onreadystatechange=function(){
        if(request.readyState===XMLHttpRequest.DONE){
        
            if(request.status===200){
                console.log("user logged in");
                alert("You have commented on the article");
            }else {
                alert("Something Went Wrong on the Server");
            }
        }
        // not done yet
    };
    var comments=document.getElementById("comments").value;
    
    console.log(comments);
    //Make a request
    request.open("POST","http://kshitijsrivastava.imad.hasura-app.io/comment",true);
    request.setRequestHeader('Content-Type','application/json');
    request.send(JSON.stringify({article_id:1,user_id:"kshitij",comment:comments}));
            
        }
