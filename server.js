const hbs = require('hbs');
const express = require('express');
var app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 8080;

const apiKey = 'AIzaSyD6Y8H5e9w-hTom55YjelzdNIL_H1oQO0g'

app.set('view engine','hbs');
app.use(express.static(__dirname+'/views'));



app.get('/',(request,response)=>{
    response.render('form.hbs')
});

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(bodyParser.urlencoded({ extended: false }));

// Parse JSON bodies (as sent by API clients)
app.use(bodyParser.json());

// Access the parse results as request.body
app.post('/', function(request, response){
    /*console.log(request.body.Username);
    console.log(request.body.Password);
    response.render('index');
    response.redirect("/api",request)*/
    let city = request.body.Password;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'Error, please try again'});
    } else {
      let weather = JSON.parse(body)
      if(weather.main == undefined){
        res.render('index', {weather: null, error: 'Error, please try again'});
      } else {
        let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
        res.render('index', {weather: weatherText, error: null});
      }
    }
});

app.listen(port,() =>{
   console.log((`server is up and listing on port ${port}`))
});