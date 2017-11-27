var express = require('express');
var csvParse = require('csv-parse');
var bodyParser = require('body-parser')
var realtor = require('realtorca');
var fs = require('fs');
var geodist = require('geodist');

var app = express();
app.use( bodyParser.json() );

// Storage variables
var schools, libraries, parks, chargingStations, culturalSpaces, recreationalCenters;

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
    chargingStations = data;
});

var spacesParser = csvParse({delimiter: ','}, function(err, data) {
    culturalSpaces = data;
});

var centresParser = csvParse({delimiter: ','}, function(err, data) {
    recreationalCenters = data;
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
          "minimumPrice": 1000000 ,
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

    // Get props from the POST request
    var opts = {
        LongitudeMin: request.body.minimumLongitude,
        LongitudeMax: request.body.maximumLongitude,
        LatitudeMin: request.body.minimumLatitude,
        LatitudeMax: request.body.maximumLatitude,
        PriceMin: request.body.minimumPrice,
        PriceMax: request.body.maximumPrice,
        RecordsPerPage: 5,
        CurrentPage: 1
    };

    var schoolRange = request.body.schoolRange;
    var libraryRange = request.body.libraryRange;
    var culturalSpaceRange = request.body.culturalSpaceRange;
    var parkRange = request.body.parkRange;
    var recreationalCenterRange = request.body.recreationalCenterRange;
    var chargingStationRange = request.body.chargingStationRange;

    realtor.post(opts)
        .then((data) => {
            var results = data.Results;
            var properties = [];
            for(var i = 0; i < results.length; i++) {
                var result = results[i].Property;

                var addressText = result.Address.AddressText.split("|");
                addressText = addressText ? addressText[0] : "";

                var Property = {
                    "latitude" : result.Address.Latitude,
                    "longitude" : result.Address.Longitude,
                    "address" : addressText,
                    "price" : result.Price,
                    "photo" : result.Photo ? result.Photo[0].LowResPath : "",
                    "schools" : [],
                    "libraries" : [],
                    "culturalSpaces" : [],
                    "parks" : [],
                    "recreationalCenters" : [],
                    "chargingStations" : [],
                }

                console.log(result);
                var houseCoords = {
                    lat: Property.latitude,
                    lon: Property.longitude
                }

                for (var j = 1; j < schools.length; j++) {
                    var schoolCoords = {
                        lat: schools[j][1],
                        lon: schools[j][2]
                    }

                    // check if school is within the 'schoolRange' of the house
                    if (geodist(houseCoords, schoolCoords, {limit: 1, unit: 'km'})) {
                        Property["schools"].push(schools[j]);
                    }
                }

                for (var j = 1; j < libraries.length; j++) {
                    var libraryCoords = {
                        lat: libraries[j][1],
                        lon: libraries[j][2]
                    }

                    if (geodist(houseCoords, libraryCoords, {limit: libraryRange, unit: 'km'})) {
                        Property["libraries"].push(libraries[j]);
                    }
                }

                for (var j = 1; j < culturalSpaces.length; j++) {
                    var culturalSpaceCoords = {
                        lat: culturalSpaces[j][11],
                        lon: culturalSpaces[j][10]
                    }

                    if (geodist(houseCoords, culturalSpaceCoords, {limit: culturalSpaceRange, unit: 'km'})) {
                        Property["culturalSpaces"].push(culturalSpaces[j]);
                    }
                }
                for (var j = 1; j < parks.length; j++) {
                	//The parks csv has latitude and longitude together in a single column
                	var latLong = parks[j][7].split(',');
                    var parkCoords = {
                        lat: latLong[0],
                        lon: latLong[1]
                    }

                    if (geodist(houseCoords, parkCoords, {limit: parkRange, unit: 'km'})) {
                        Property["parks"].push(parks[j]);
                    }
                }

                for (var j = 1; j < recreationalCenters.length; j++) {
                    var recreationalCenterCoords = {
                        lat: recreationalCenters[j][1],
                        lon: recreationalCenters[j][2]
                    }

                    if (geodist(houseCoords, recreationalCenterCoords, {limit: recreationalCenterRange, unit: 'km'})) {
                        Property["recreationalCenters"].push(recreationalCenters[j]);
                    }
                }

                for (var j = 1; j < chargingStations.length; j++) {
                    var chargingStationCoords = {
                        lat: chargingStations[j][0],
                        lon: chargingStations[j][1]
                    }

                    if (geodist(houseCoords, chargingStationCoords, {limit: chargingStationRange, unit: 'km'})) {
                        Property["chargingStations"].push(chargingStations[j]);
                    }
                }

                properties.push(Property);
            }

            console.log("Sending response");
            response.send(properties);
        })

        .catch((err) => {
            console.log(err);
        });

});

module.exports = app;
