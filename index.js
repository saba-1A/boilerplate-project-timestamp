const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// ✅ /api → Returns today's date
app.get("/api", (req, res) => {
  const now = new Date(); // current moment
  res.json({
    unix: now.getTime(),           // current time in milliseconds
    utc: now.toUTCString()         // current time in UTC string
  });
});

// ✅ /api/:date → Returns given date or error
app.get("/api/:date", (req, res) => {
  const { date } = req.params;

  let parsedDate;

  // If numeric (timestamp), parse as integer
  if (/^\d+$/.test(date)) {
    parsedDate = new Date(parseInt(date));
  } else {
    parsedDate = new Date(date);
  }

  // Handle invalid date
  if (parsedDate.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  res.json({
    unix: parsedDate.getTime(),
    utc: parsedDate.toUTCString()
  });
});

// Listener
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
