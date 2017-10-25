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
  response.send("hello world");
});

// listen for requests :)
var listener = app.listen("8888", function () {
  console.log('Your app is listening on http://localhost:' +  "8888");
});
