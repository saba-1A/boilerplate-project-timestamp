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


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

function unixToUTC(unixTime) {
  const convertedDate = new Date(unixTime)
  return convertedDate.toUTCString()
}

function getCurrentUnixTime() {
    const currentUnixTime = Date.now()
    return {"unix": Number(currentUnixTime), "utc": unixToUTC(currentUnixTime)}
}

function returnJson(date) {
  if (!date) {
    return getCurrentUnixTime()
  } else {
    let requestedDate = ""
    if (date > 0) {
      requestedDate = new Date(Number(date))
    } else {
      requestedDate = new Date(date)
    }
    const requestedUnixDate = requestedDate.getTime()
    const requestedUtcDate = requestedDate.toUTCString()
    if (!requestedUnixDate) {return { error : "Invalid Date" }}
    return {"unix": Number(requestedDate.getTime()), "utc": requestedUtcDate}
  }
}

app.get('/api/:date?', (req, res) => {
  res.json(returnJson(req.params.date))
})
