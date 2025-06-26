// index.js
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
//
app.get("/api", function (req, res){
  const date = new Date()
  const UTC_date = date.toUTCString();
  const Unix_date = date.valueOf()
  res.json({unix: Unix_date, utc: UTC_date});
});

app.get("/api/:date?", function (req, res){
  let date = new Date(req.params.date);
  if (isNaN(date.getTime())){
    date = new Date(req.params.date * 1);
    if (isNaN(date.getTime())){
      return res.json({ error : "Invalid Date" });
    };
  };
  const UTC_date = date.toUTCString();
  const Unix_date = date.valueOf()
  res.json({unix: Unix_date, utc: UTC_date});
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
