var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));


var articles={ 
"article-one":{
    title:"Article One | Kshitij Srivastava",
    heading:"Article One",
    date:"5th October 2016",
    content:`
    <p>
        This is content for my 1st article. This is content for my 1st article. This is content for my 1st article. This is content for my 1st article. This is content for my 1st article. This is content for my 1st article
     </p>
    <p>
        This is content for my 1st article. This is content for my 1st article. This is content for my 1st article. This is content for my 1st article. This is content for my 1st article. This is content for my 1st article
    </p>`
},
"article-two":{
    title:"Article Two | Kshitij Srivastava",
    heading:"Article Two",
    date:"5th October 2016",
    content:`
    <p>
        This is content for my 2nd article. 
     </p>`
    
},
"article-three":{
    title:"Article Three | Kshitij Srivastava",
    heading:"Article Three",
    date:"5th October 2016",
    content:`
    <p>
        This is content for my 3rd article.
     </p>`
}

};

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
            ${date}
            </div>
            <div>
                ${content}
            </div>
        </div>
    </body>
</html>
`  ;
return HTMLtemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var counter=0;
app.get('/counter',function(req,res){
   counter=counter+1; 
   res.send(counter.toString());
});

app.get('/:articleName',function(req,res)
{
    //articleName==article-one
    //articles[articleName]=article-one
    var articleName=req.params.articleName; //extracting a parameter
    res.send(createTemplate(articles[articleName]));
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

var names=[];
app.get('/submit-name/:name',function(req,res){
    //get the name from the request
    var name=req.params.name;
    
    names.push(name);
    //JSON Javascript Object Notation
    res.send(JSON.stringify(names));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
