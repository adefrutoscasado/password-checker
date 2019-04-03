var express = require("express");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static("build", { root: "." }));

app.get("/", function(req, res) {
  res.sendFile("/build/index.html", { root: "." });
});

const auth = require('./routes/unauthenticatedRoutes/auth')
app.use('/auth', auth)

module.exports = app;
