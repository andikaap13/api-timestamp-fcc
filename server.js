// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// current time API endpoint
app.get("/api", function (req, res) {
  var date = new Date();
  
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// time API endpoint... 
app.get("/api/:time", function (req, res) {
  var time = req.params.time;

  if(!isNaN(time)) {
    time = parseInt(time);
  }

  var date = new Date(time);
  var result;

  if (!isNaN(date.getTime())) {
    result = {
      unix: date.getTime(),
      utc: date.toUTCString()
    }
  } else {
    result = {
      error: date.toUTCString()
    }
  }

  res.json(result);
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
