const express = require("express");
const app = express();
const globalErrorHandler = require("./controller/errorController");
const CustomeError = require("./utiles/customeError");
const ratelimit = require("express-rate-limit");
const cors = require("cors")
const bodyParser = require("body-parser");

const routes = require("./routes");

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

const limiter = ratelimit({
  max: 1000,
  windowMs: 60 * 60 * 1000, // one hour
  message:
    "To many request recieved from this ip address please try again in an hour letter",
});
app.use("/api", limiter);

app.use("/api", routes);
app.all("*", (req, res, next) => {
  const err = new CustomeError(`cant find url ${req.originalUrl}`, 404);
  next(err);
});
app.use(globalErrorHandler);

module.exports = app;
