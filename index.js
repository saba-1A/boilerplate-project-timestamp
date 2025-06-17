const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static('public'));

// Homepage
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

// ✅ This handles empty date: /api
app.get("/api", (req, res) => {
  const now = new Date();
  res.json({
    unix: now.valueOf(),       // or now.getTime()
    utc: now.toUTCString()
  });
});

// ✅ This handles valid date/timestamp inputs: /api/:date
app.get("/api/:date", (req, res) => {
  const dateParam = req.params.date;

  // Check if it's a number (timestamp)
  let date = !isNaN(dateParam)
    ? new Date(parseInt(dateParam))
    : new Date(dateParam);

  // Handle invalid dates
  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  res.json({
    unix: date.valueOf(),
    utc: date.toUTCString()
  });
});

// Server start
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
