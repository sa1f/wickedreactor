var express = require('express');
var csvParse = require('csv-parse');
var bodyParser = require('body-parser')
var realtor = require('realtorca');
var fs = require('fs');
var geodist = require('geodist');

var app = express();
app.use( bodyParser.json() );


const bcrypt = require('bcrypt');
const saltRounds = 10;
const defaultUsername = 'test';
const defaultPassword = 'test';
const Sequelize = require('sequelize');
const sequelize = new Sequelize('database', 'testuser', 'testpassword', {
  dialect: 'sqlite',
  storage: 'database.sqlite',
  logging: false,
  operatorsAliases: false
});

const User = sequelize.define('user', {
  username: Sequelize.STRING,
  password: Sequelize.STRING
});

const Session = sequelize.define('session', {
  username: Sequelize.STRING,
  token: Sequelize.STRING,
  valid: Sequelize.BOOLEAN
});

const FavHouse = sequelize.define('favhouse', {
  username: Sequelize.STRING,
  mlsid: Sequelize.STRING,
  houseJson: Sequelize.STRING
});

sequelize.sync().then(() => User.findOrCreate({
    where: {
        username: defaultUsername
    },
    defaults: {
        password: generatePassword(defaultPassword)
    }
}));

var randString = function() {
    return Math.random().toString(36).substr(2);
};

function generatePassword(password) {
    return bcrypt.hashSync(password, saltRounds);
}


var getOrGenerateToken = function(username) {
    return Session.findOne({where: {username: username, valid: true}}).then(session => {
        if (!session) {
            return Session.create({
                username: username,
                token: randString(),
                valid: true
            }).then(session => {
                return session.token;
            })
        }
        else {
            return session.token;
        }
    });
}

var loginUser = function(username, password) {
    if (!username || !password)
        return Promise.resolve(false);
    return User.findOne({where: {username: username}}).then(user => {
        if (!user) {
            return false;
        }
        else {
            return bcrypt.compareSync(password, user.dataValues.password);
        }
    });
}

var registerUser = function(username, password) {
    if (!username || !password)
        return Promise.resolve(false);
    return User.findOne({where: {username: username}}).then(user => {
        if (!user) {
            return User.create({
                username: username,
                password: generatePassword(password)
            })
        }
        else {
            return false;
        }
    });
}

var authenticate = function(token) {
    if (!token)
        return Promise.resolve(false);
    return Session.findOne({where: {token: token, valid: true}}).then(session =>{
        if (session)
            return session;
        else
            return false;
    });
}

var storeHouse = function(mlsid, houseJson, username) {
    return FavHouse.findOrCreate({ where: {
        username: username,
        mlsid: mlsid,
        houseJson: houseJson},
        defaults: {
        }
    })
}

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

app.post('/login', function(req, res) {
    console.log("Login received from " + req.body.username);
    loginUser(req.body.username, req.body.password).then(authenticated => {
        if (authenticated) {
            getOrGenerateToken(req.body.username).then(token => {
                res.send(token);
            });
        }
        else {
            res.status(404).send('Username/Password incorrect');
        }
    })
});

app.post('/logout', function(req, res) {
    console.log("Logout request received from " + req.body.token);
    authenticate(req.body.token).then(session => {
        if (session) {
            Session.findOne({where: {token: req.body.token}}).then(session => {
                session.updateAttributes({
                    valid: false
                });
                res.send("logged out");
            });
        }
        else {
            res.status(401).send("Not logged in");
        }
    })
});

app.post('/register', function(req, res) {
    console.log("Register request received from " + req.body.username);
    registerUser(req.body.username, req.body.password).then(authenticated => {
        if (authenticated != null) {
            getOrGenerateToken(req.body.username).then(token => {
                res.send(token);
            });
        }
        else {
            res.status(401).send('Couldn\'t register that account');
        }
    })
});

app.post('/storeFavourite', function(req, res) {
    console.log("Store fav request received from " + req.body.token);
    authenticate(req.body.token).then(session => {
        if (session) {
            storeHouse(req.body.mlsid, JSON.stringify(req.body.houseJson), session.username).then(stored => {
                res.send("stored");
            });
        }
        else {
            res.status(401).send("not authenticated");
        }
    })
});

app.post('/getFavourites', function(req, res) {
    console.log("Get favs request received from " + req.body.token);
    authenticate(req.body.token).then(session => {
        if (session) {
            FavHouse.findAll({where: {username: session.username}}).then(result => {
                var response = [];
                for (var i = 0; i < result.length; i++) {
                    var respObj = {
                        mlsid: result[i].mlsid,
                        houseJson: JSON.parse(result[i].houseJson)
                    }
                    response.push(respObj);
                }
                res.send(response);
            });
        }
        else {
            res.status(401).send("not authenticated");
        }
    })
});


app.delete('/deleteFavourite', function(req, res) {
    console.log("Delete fav request received from " + req.body.token + " for mlsid " + req.body.mlsid);
    authenticate(req.body.token).then(session => {
        if (session) {
            FavHouse.findAll({where: {username: session.username, mlsid: req.body.mlsid}}).then(result => {
                console.log(result);
                if (!result.length) {
                    res.status(400).send("Nothing to delete");
                    return;
                }
                for (var i = 0; i < result.length; i++) {
                    result[i].destroy();
                }
                res.send("done");
            });
        }
        else {
            res.status(401).send("not authenticated");
        }
    })
});

app.post('/filter', function (request, response) {

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
          "busStopRange": 9,
          "bathMin" : 2,
          "bedMin" : 3
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
        BedRange: request.body.bed + "-" + request.body.bed,
        BathRange: request.body.bath + "-" + request.body.bath,
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
            console.log("Retrieved " + results.length + " results");
            for(var i = 0; i < results.length; i++) {
                var result = results[i].Property;

                var addressText = result.Address.AddressText.split("|");
                addressText = addressText ? addressText[0] : "";

                var Property = {
                    "latitude" : result.Address.Latitude,
                    "longitude" : result.Address.Longitude,
                    "address" : addressText,
                    "price" : result.Price,
                    "photo" : result.Photo ? result.Photo[0].HighResPath : "",
                    "mlsid" : results[i].MlsNumber,
                    "schools" : [],
                    "libraries" : [],
                    "culturalSpaces" : [],
                    "parks" : [],
                    "recreationalCenters" : [],
                    "chargingStations" : [],
                    "schoolDistances" : [],
                    "libraryDistances" : [],
                    "culturalSpaceDistances" : [],
                    "parkDistances" : [],
                    "recreationalCenterDistances" : [],
                    "chargingStationDistances" : [],
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

                    // check if school is within the 'schoolRange' of the house
                    var dist = geodist(houseCoords, schoolCoords, {unit: 'meters'});

                    if (dist <= schoolRange*1000) {
                        Property["schoolDistances"].push(dist/1000);
                        Property["schools"].push(schools[j]);
                    }
                }

                for (var j = 1; j < libraries.length; j++) {
                    var libraryCoords = {
                        lat: libraries[j][1],
                        lon: libraries[j][2]
                    }

                    var dist = geodist(houseCoords, libraryCoords, {unit: 'meters'});
                    if (dist <= libraryRange*1000) {
                        Property["libraryDistances"].push(dist/1000);
                        Property["libraries"].push(libraries[j]);
                    }
                }

                for (var j = 1; j < culturalSpaces.length; j++) {
                    var culturalSpaceCoords = {
                        lat: culturalSpaces[j][11],
                        lon: culturalSpaces[j][10]
                    }

                    var dist = geodist(houseCoords, culturalSpaceCoords, {unit: 'meters'});
                    if (dist <= culturalSpaceRange*1000) {
                        Property["culturalSpaceDistances"].push(dist/1000);
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

                    var dist = geodist(houseCoords, parkCoords, {unit: 'meters'});
                    if (dist <= parkRange*1000) {
                        Property["parkDistances"].push(dist/1000);
                        Property["parks"].push(parks[j]);
                    }
                }

                for (var j = 1; j < recreationalCenters.length; j++) {
                    var recreationalCenterCoords = {
                        lat: recreationalCenters[j][1],
                        lon: recreationalCenters[j][2]
                    }

                    var dist = geodist(houseCoords, recreationalCenterCoords, {unit: 'meters'});
                    if (dist <= recreationalCenterRange*1000) {
                        Property["recreationalCenterDistances"].push(dist/1000);
                        Property["recreationalCenters"].push(recreationalCenters[j]);
                    }
                }

                for (var j = 1; j < chargingStations.length; j++) {
                    var chargingStationCoords = {
                        lat: chargingStations[j][0],
                        lon: chargingStations[j][1]
                    }

                    var dist = geodist(houseCoords, chargingStationCoords, {unit: 'meters'});
                    if (dist <= chargingStationRange*1000) {
                        Property["chargingStationDistances"].push(dist/1000);
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
