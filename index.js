// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/:date", function (req, res) {
  // res.json({greeting: 'hello API'});
  const inputDate = req.params.date;
  if (inputDate > 0) {
    // "+047950-05-31T00:00:00.000Z"
    // "Fri, 25 Dec 2015 00:00:00 GMT"
    const standardDate = new Date(+inputDate).toUTCString();
    res.json({ unix: inputDate, utc: standardDate });
  } else if (
    new Date(inputDate) !== "Invalid Date" &&
    !isNaN(new Date(inputDate))
  ) {
    const unixDate = Math.floor(new Date(inputDate).getTime());
    const standardDate = new Date(inputDate).toUTCString();
    res.json({ unix: unixDate, utc: standardDate });
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
