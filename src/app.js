const express = require("express");
const app = express();
const globalErrorHandler = require("./controller/errorController");
const CustomeError = require("./utiles/customeError");
const morgan = require("morgan")

const cors = require("cors")
const routes = require("./routes");

app.use(express.json());
app.use(cors());
app.use(morgan(':response-time ms'))

app.use("/api", routes);
app.all("*", (req, res, next) => {
  const err = new CustomeError(`cant find url ${req.originalUrl}`, 404);
  next(err);
});


app.use(globalErrorHandler);

module.exports = app;
