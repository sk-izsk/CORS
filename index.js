const express = require("express");
const cors = require("cors");
const app = express();

app.get("/no-cors", (req, res) => {
  console.info("GET /no-cors");
  res.json({
    text: "Cors is not using here"
  });
});

// -----------------------------------------------------------
app.head("/simple-cors", cors(), (req, res) => {
  console.info("HEAD /simple-cors");
  res.sendStatus(204);
});
app.get("/simple-cors", cors(), (req, res) => {
  console.info("GET /simple-cors");
  res.json({
    text: "CORS requests are working with GET"
  });
});
app.post("/simple-cors", cors(), (req, res) => {
  console.info("POST /simple-cors");
  res.json({
    text: "CORS requests are working with POST"
  });
});
//-----------------------------------------------
app.options("/complex-cors", cors());
app.delete("/complex-cors", cors(), (req, res) => {
  console.info("DELETE /complex-cors");
  res.json({
    text: "CORS requests are working with DELETE"
  });
});
//----------------------------------------------------
const issue2options = {
  origin: true,
  methods: ["POST"],
  credentials: true,
  maxAge: 3600
};
app.options("/issue-2", cors(issue2options));
app.post("/issue-2", cors(issue2options), (req, res) => {
  console.info("POST /issue-2");
  res.json({
    text: "Issue #2 is fixed."
  });
});
//--------------------------------------------------------

var whitelist = [
  "localhost:8080",
  "http://example1.com",
  "http://example2.com"
];
var configurationOptions = {
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  maxAge: 3600,
  optionsSuccessStatus: 200,
  methods: ["POST,GET"]
};
app.options("/user", cors(configurationOptions));
app.get("/user", cors(configurationOptions), (req, res) => {
  res.json({ msg: "This is CORS-enabled for all origins!" });
});
//should not work

app.delete("/user", cors(configurationOptions), (req, res) => {
  res.json({ msg: "This is CORS-enabled for all origins!" });
});

app.listen(8080);
