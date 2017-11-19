var express = require('express');
var csvParse = require('csv-parse');
var bodyParser = require('body-parser')
var realtor = require('realtorca');
var fs = require('fs');
var geodist = require('geodist');



var app = express();
app.use( bodyParser.json() ); 

// Storage variables 
var schools, parks, chargers, spaces, centres;

// Parse CSV and throw them into storage variables
var schoolsParser = csvParse({delimiter: ','}, function(err, data) {
    schools = data;    
});

var parksParser = csvParse({delimiter: ','}, function(err, data) {
    parks = data;    
});

var librariesParser = csvParse({delimiter: ','}, function(err, data) {
    libraries = data;
});

var chargerParser = csvParse({delimiter: ','}, function(err, data) {
    chargers = data;
});

var spacesParser = csvParse({delimiter: ','}, function(err, data) {
    spaces = data;
});

var centresParser = csvParse({delimiter: ','}, function(err, data) {
    centres = data;
});

// Pass the files to CSV parsers
fs.createReadStream(__dirname + "/db/schools.csv").pipe(schoolsParser);
fs.createReadStream(__dirname + "/db/parks.csv").pipe(parksParser);
fs.createReadStream(__dirname + "/db/libraries.csv").pipe(librariesParser);
fs.createReadStream(__dirname + "/db/electric_vehicle_charging_stations.csv").pipe(chargerParser);
fs.createReadStream(__dirname + "/db/cultural_spaces.csv").pipe(spacesParser);
fs.createReadStream(__dirname + "/db/community_centres.csv").pipe(centresParser);


app.post('/', function (request, response) {

    /* Example Request:
        {
  	      "minimumLatitude": 49.214268638555204,
          "maximumLatitude": 49.290125554868546,
          "minimumLongitude": -123.2236647605896,
          "maximumLongitude": -123.0343222618103,
          "minimumPrice": 100000 ,
          "maximumPrice": 4100000 ,
          "schoolRange": 3,
          "libraryRange": 4,
          "culturalSpaceRange": 5,
          "parkRange": 6,
          "recreationalCenterRange": 7,
          "chargingStationRange": 8,
          "busStopRange": 9
        }
    */

    var opts = {
        LongitudeMin: request.body.minimumLongitude,
        LongitudeMax: request.body.maximumLongitude,
        LatitudeMin: request.body.minimumLatitude,
        LatitudeMax: request.body.maximumLatitude,
        PriceMin: request.body.minimumPrice,
        PriceMax: request.body.maximumPrice,
        RecordsPerPage: 100,
        CurrentPage: 1
    };

    var schoolRange = request.body.schoolRange;

    realtor.post(opts)
        .then((data) => {
            var results = data.Results;
            var properties = [];
            
            for(var i = 0; i < results.length; i++) {
                var result = results[i].Property;
                var Property = {
                    "latitude" : result.Address.Latitude,
                    "longitude" : result.Address.Longitude,
                    "price" : result.Price,
                    "schools" : [],
                    "libraries" : [], 
                    "culturalSpaces" : [],
                    "parks" : [],
                    "recreationalCenters" : [],
                    "chargingStations" : [],
                    "busStops" : [],
                }

                var houseCoords = {
                    lat: Property.latitude, 
                    lon: Property.longitude
                }

                for (var j = 1; j < schools.length; j++) {
                    var schoolCoords = {
                        lat: schools[j][1],
                        lon: schools[j][2]
                    }

                    if (geodist(houseCoords, schoolCoords, {limit: schoolRange, unit: 'km'})) {
                        Property["schools"].push(schools[j]);
                    }
                }
                properties.push(Property);
            }

            response.send(properties);
        })

        .catch((err) => {
            console.log(err);
        });

});

module.exports = app;
