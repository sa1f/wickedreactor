// server.js
// where your node app starts

// init project with express
// express is the server for node.js
var express = require('express');
var app = express();

// Just telling express to use the public folder for static files 
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
// could also use the POST body instead of query string: http://expressjs.com/en/api.html#req.body
app.get("/", function (request, response) {
  //response.sendFile(__dirname + '/views/index.html');
  //response.sendStatus(200);
  //dreams.push(request.query.dream);

    var realtor = require('realtorca');

    //These values will be passed in by the front-end
    var longitudeMin = -123.2236647605896;
    var longitudeMax = -123.0343222618103;
    var latitudeMin = 49.214268638555204;
    var latitudeMax = 49.290125554868546;
    var priceMin = 100000;
    var priceMax = 4100000;

    var opts = {
        LongitudeMin: longitudeMin,
        LongitudeMax: longitudeMax,
        LatitudeMin: latitudeMin,
        LatitudeMax: latitudeMax,
        PriceMin: priceMin,
        PriceMax: priceMax,
        RecordsPerPage: 100,
        CurrentPage: 1
    };
    console.log( realtor.buildUrl(opts) );
    //builds something like: https://www.realtor.ca/Residential/Map.aspx#LongitudeMin=-79.6758985519409&LongitudeMax=-79.6079635620117&LatitudeMin=43.57601549736786&LatitudeMax=43.602250137362276&PriceMin=100000&PriceMax=425000


    realtor.post(opts)
        .then(data => {
            //json response
            var results = data.Results;
            var properties = [];

            for(var i = 0; i < results.length; i++) {
                properties[i] = results[i].Property;
            }

            response.send(properties);
            console.log(properties.length);
        })

        .catch(err => {
            console.log('error :(');
        });

});

// listen for requests :)
var listener = app.listen("8888", function () {
    console.log('Your app is listening on http://localhost:' +  "8888");
});