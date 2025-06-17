const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// ✅ Single route to handle both /api and /api/:date
app.get("/api/:date?", (req, res) => {
  let dateString = req.params.date;

  let date = !dateString ? new Date() :
             !isNaN(dateString) ? new Date(parseInt(dateString)) :
             new Date(dateString);

  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

const listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
