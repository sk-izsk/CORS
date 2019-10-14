const express = require("express");
const cors = require("cors");
const app = express();
// app.use(cors());

var whitelist = [
  "localhost:8080",
  "http://example1.com",
  "http://example2.com"
];
var configurationOptions = {
  //   origin: function(origin, callback) {
  //     if (whitelist.indexOf(origin) !== -1 || !origin) {
  //       callback(null, true);
  //     } else {
  //       callback(new Error("Not allowed by CORS"));
  //     }
  //   },
  origin: "example.com",
  methods: ["POST"],
  credentials: true,
  maxAge: 3600
};
app.options("/user", cors(configurationOptions));
app.get("/user", cors(configurationOptions), (req, res) => {
  res.json({ msg: "This is CORS-enabled for all origins!" });
});

app.listen(8080);
