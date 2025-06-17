// index.js
// where your node app starts

// init project
const express = require('express');
const cors = require('cors');
const app = express();

// Enable CORS so FCC can test it
app.use(cors({ optionsSuccessStatus: 200 }));

// Serve static files
app.use(express.static('public'));

// Root route
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// Sample endpoint
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

// ✅ Timestamp API endpoint
app.get("/api/:date?", function (req, res) {
  let dateString = req.params.date;
  let date;

  if (!dateString) {
    date = new Date();
  } else if (!isNaN(dateString)) {
    // Handle unix timestamp in milliseconds
    date = new Date(parseInt(dateString));
  } else {
    date = new Date(dateString);
  }

  if (date.toString() === "Invalid Date") {
    res.json({ error: "Invalid Date" });
  } else {
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString()
    });
  }
});

// Listen on environment-defined port
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
