const hbs = require('hbs');
const express = require('express');
var app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 8080;
var request = require('request');

uri = 'https://images-api.nasa.gov/search?q=moon'

app.set('view engine','hbs');
app.use(express.static(__dirname+'/views'));



app.get('/',(request,response)=>{
    response.render('form.hbs')
});

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(bodyParser.urlencoded({ extended: false }));

// Parse JSON bodies (as sent by API clients)
app.use(bodyParser.json());

hbs.registerPartials(__dirname + '/views/partials');


app.post('/', function (req, res) {
  let city = req.body.thing;
  let url = `https://images-api.nasa.gov/search?q=${city}`
  request(url, function (err, response, body) {
    if(err){
      res.render('results.hbs', {weather: null, error: 'Error, please try again'});
    } else {
      let images = JSON.parse(body)
      if(images.collection.items[0].links[0].href == undefined){
        res.render('results.hbs', {images: null, error: 'Error, please try again'});
      } else {
        let image = images.collection.items[0].links[0].href;
        let image2 = images.collection.items[1].links[0].href;
        let image3 = images.collection.items[2].links[0].href;
        let image4 = images.collection.items[3].links[0].href;
        let image5 = images.collection.items[4].links[0].href
        res.render('results.hbs',{ 
        	imagess: image,
        	imagess2:image2,
        	imagess3:image3,
        	imagess4:image4,
        	imagess5:image5,
			error: null});
      }
    }
  });
})

app.listen(port,() =>{
   console.log((`server is up and listing on port ${port}`))
});