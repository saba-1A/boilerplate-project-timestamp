const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

function unixToUTC(unixTime) {
  const convertedDate = new Date(unixTime);
  return convertedDate.toUTCString();
}

function getCurrentUnixTime() {
  const currentUnixTime = Date.now();
  return { "unix": currentUnixTime, "utc": unixToUTC(currentUnixTime) };
}

function returnJson(date) {
  if (!date) {
    return getCurrentUnixTime();
  } else {
    let requestedDate;

    if (/^\d+$/.test(date)) {
      requestedDate = new Date(Number(date)); // Handle Unix timestamp
    } else {
      requestedDate = new Date(date); // Handle ISO or other string date
    }

    if (requestedDate.toString() === "Invalid Date") {
      return { error: "Invalid Date" };
    }

    return {
      unix: requestedDate.getTime(),
      utc: requestedDate.toUTCString()
    };
  }
}

app.get('/api/:date?', (req, res) => {
  res.json(returnJson(req.params.date));
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
