const hbs = require('hbs');
const express = require('express');
var app = express();
const port = process.env.PORT || 8080;

app.set('view engine','hbs');
app.use(express.static(__dirname+'/views'));



app.get('/',(request,response)=>{
    response.render('form.hbs')
});


app.listen(port,() =>{
   console.log((`server is up and listing on port ${port}`))
});