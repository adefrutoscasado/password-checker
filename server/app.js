const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const helmet = require('helmet')
const cors = require('cors')
process.env.JWT_SECRET = process.env.JWT_SECRET || 'TEMP_SECRET'

var app = express();

app.set('JWT_SECRET', process.env.JWT_SECRET)

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Add some security headers
app.use(helmet())
// Add cors header
app.use(cors({
  origin: false,
  credentials: true
}))

app.use(express.static("build", { root: "." }));

app.get("/", function(req, res) {
  res.sendFile("/build/index.html", { root: "." });
});

const auth = require('./routes/unauthenticatedRoutes/auth')
app.use('/auth', auth)

const unAuth = require('./routes/authenticatedRoutes')
app.use('/', unAuth)

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
