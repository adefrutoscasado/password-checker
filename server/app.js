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

// 404 Not Found Errors
app.use((req, res, next) => {
  const err = new Error('Endpoint not Found')
  err.status = 404
  next(err)
})

// 500 Internal Errors
app.use((err, req, res, next) => {
  console.log(err)
  res.status(err.status || 500)
  res.send({
    message: err.message || 'Undefined error',
    errors: err.errors,
  })
})
module.exports = app;
