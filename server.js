var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');
var bodyParser = require('body-parser');
var session = require('express-session');

var config={
    user:"kshitijsrivastava",
    database:"kshitijsrivastava",
    host:"db.imad.hasura-app.io",
    port:"5432",
    password:process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(session({
    secret:"someRandomSecretValue",
    cookie:{ maxAge:1000*60*60*24*30}
})); 

function createTemplate(data)
{
    var title=data.title;
    var date=data.date;
    var heading=data.heading;
    var content=data.content;
    
  var HTMLtemplate=`
<html>
    <head>
        <title>
             ${title}
        </title>
        <link href="/ui/style.css" rel="stylesheet" />
       
        
    </head>
    <body>
        <div class="container">
            <div>
            <a href="/">Home</a>
            </div>
            <hr/>
            <h3>${heading}</h3>
            <div>
            ${date.toDateString()}
            </div>
            <div>
                ${content}
            </div>
            <hr/>
            <div>
            <input type="text" id="comments" placeholder="Your Comments" size="100" />
            </div>
            <div>
            <button id="comment_btn" type="button">Click to Enter Comments</button>
            </div>
        </div>
        <script>
        var comment_btn=document.getElementById("comment_btn");
        comment_btn.onclick()=function(){
            
        };
        </script>
    </body>
</html>
`  ;
return HTMLtemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

function hash(input,salt){
    //How do we create a hash?
    var hashed=crypto.pbkdf2Sync(input,salt,10000,512,'sha512');
    return ["pbkdf2","10000",salt,hashed.toString('hex')].join('$');
    
    //"password-this-is-some-random-string"->eljhfsefhasejkn
    //"password"->"password-salt"-> <hash> -> <hash>  iterations done 10000 times
}

app.get('/hash/:input',function(req,res){
    var hashedString=hash(req.params.input,'this-is-some-random-string');
    res.send(hashedString);
});

app.post('/create-user',function(req,res){
    //username,password
    //{"username":"Kshitij","password":"password"}
    //JSON
    var username=req.body.username;
    var password=req.body.password;
    
    var salt=crypto.randomBytes(128).toString('hex');
    var dbString=hash(password,salt);
    pool.query('INSERT INTO "user" (username,password) VALUES($1,$2)',[username,dbString],function(err,result){
         if(err){
           res.status(500).send(err.toString());
       }else{
           res.send("User Sucessfully Created "+username);
       }
    });
});

app.post('/login',function(req,res){
    var username=req.body.username;
    var password=req.body.password;
    
    pool.query('SELECT * FROM "user" WHERE username=$1',[username],function(err,result){
         if(err){
           res.status(500).send(err.toString());
       }else{
           if(result.rows.length===0){
               res.send(403).send("Username/Password is invalid");
           }else{
               //match the password
               var dbString=result.rows[0].password;
               var salt=dbString.split('$')[2];
               var hashedPassword=hash(password,salt);//Creating a hash based on the password submitted and the original salt
               if(hashedPassword===dbString){
                   
                      //Set a session
                     req.session.auth={userId:result.rows[0].id};
                      //set a cookie with a session id
                      //internally on the server side,it maps the session id to an object
                      //{auth:{userId}}
                      
                    res.send("Credentials are correct!");
               }else{
                    res.send(403).send("Username/Password is invalid");
               }
           }
       }
    });
});

app.get('/check-login',function(req,res){
    if(req.session && req.session.auth && req.session.auth.userId) {
        res.send("You are Logged In "+req.session.auth.userId.toString());
    }else{
        res.send("You are Not Logged In");
    }
}); 

app.get('/logout',function(req,res){
    delete req.session.auth;
    res.send('Logged Out');
});


var pool = new Pool(config);
app.get('/test-db',function(req,res){
   //make a select response
   ////return a response with results
   pool.query("SELECT * FROM test",function(err,result){
       if(err){
           res.status(500).send(err.toString());
       }else{
           res.send(JSON.stringify(result.rows));
       }
       
   });
});

app.get('/get-articles',function(req,res){
    pool.query('SELECT "title" FROM "article" ',function(err,result){
         if(err){
           res.status(500).send(err.toString());
       } else{
                res.send(JSON.stringify(result.rows));
               }
       });
});


var counter=0;
app.get('/counter',function(req,res){
   counter=counter+1; 
   res.send(counter.toString());
});

var names=[];
app.get('/submit-name/',function(req,res){ //URL: /submit-name?name=xxxx
    //get the name from the request
    var name=req.query.name;
    
    names.push(name);
    //JSON Javascript Object Notation
    res.send(JSON.stringify(result));
});

app.get('/articles/:articleName',function(req,res)
{
    //articleName==article-one
    //articles[articleName]=article-one
   // var articleName=req.params.articleName; //extracting a parameter
    
//SELECT * FROM article WHERE title='article-one'    (thinking as minus operator)
 pool.query("SELECT * FROM article WHERE title= $1",[req.params.articleName],function(err,result){
     if(err)
     {
         res.status(500).send(err.toString());
     }
     else{
         if(result.rows.length===0){
             res.status(404).send('Article Not Found');
         }
         else{
             var articleData=result.rows[0];
              res.send(createTemplate(articleData));
         }
     }
 });
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
