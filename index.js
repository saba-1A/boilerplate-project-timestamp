const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// ✅ /api with no date returns current time
app.get("/api", (req, res) => {
  const now = new Date();
  res.json({
    unix: now.getTime(),
    utc: now.toUTCString()
  });
});

// ✅ /api/:date route handles valid dates and timestamps
app.get("/api/:date", (req, res) => {
  const { date } = req.params;
  const parsedDate = !isNaN(date) ? new Date(parseInt(date)) : new Date(date);

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
