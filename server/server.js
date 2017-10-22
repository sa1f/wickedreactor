// server.js
// where your node app starts

// init project with express
// express is the server for node.js
var express = require('express');
var app = express();

// Just telling express to use the public folder for static files 
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  //response.sendFile(__dirname + '/views/index.html');
  response.send("hello world");
});

app.get("/dreams", function (request, response) {
  response.send(dreams);
});

// could also use the POST body instead of query string: http://expressjs.com/en/api.html#req.body
app.post("/dreams", function (request, response) {
  dreams.push(request.query.dream);
  response.sendStatus(200);
});

// Simple in-memory store for now
var dreams = [
  "Find and count some sheep",
  "Climb a really tall mountain",
  "Wash the dishes"
];

// listen for requests :)
var listener = app.listen("8888", function () {
  console.log('Your app is listening on http://localhost:' +  "8888");
});
