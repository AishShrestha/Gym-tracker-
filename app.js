const express = require("express");
const app = express();

require("./src/routes/router")(app);

module.exports = app;
