const hbs = require('hbs');
var app = express();
const port = process.env.PORT || 8080;


app.get('/',(request,response)=>{
    response.render('form.hbs')
});


app.listen(port,() =>{
   console.log((`server is up and listing on port ${port}`))
});