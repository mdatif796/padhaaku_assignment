const express = require("express");
const bodyParser = require("body-parser");

const app = express(); // creating app of express server
const port = 8000;

const db = require("./config/databaseConnection"); // setting up the connection with database

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", require("./routes"));

app.listen(process.env.PORT || port, function (err) {
  return err
    ? console.log("Error in listening on port ", port)
    : console.log("Express server is running on the port ", port);
});
