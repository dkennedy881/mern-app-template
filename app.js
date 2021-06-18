var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

// !NOTE routes go here - before app = express
// !exp)
// const user = require("./routes/user");
// const userLog = require("./routes/userLog");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "client/build")));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// !NOTE get/connet to db
// !exp)
// const db = require("./config/keys").mongoURI;
// mongoose
//   .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("connected to db"))
//   .catch((err) => {
//     "failed-" + console.log(err);
//   });

// !NOTE use routes
// app.use("/api/user", user);
// app.use("/api/user-log", userLog);

// !NOTE This serves up client/build/index.html for all git requests
app.use(express.static(path.join(__dirname, "client/build")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
