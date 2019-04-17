const hbs = require('hbs');
const express = require('express');
var app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 8080;

app.set('view engine','hbs');
app.use(express.static(__dirname+'/views'));



app.get('/',(request,response)=>{
    response.render('form.hbs')
});

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(bodyParser.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(bodyParser.json());

// Access the parse results as request.body
app.post('/', function(request, response){
    console.log(request.body.Username);
    console.log(request.body.Password);
    //response.redirect("/api",request)
});

app.listen(port,() =>{
   console.log((`server is up and listing on port ${port}`))
});