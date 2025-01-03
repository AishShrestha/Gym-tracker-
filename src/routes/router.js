const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const userRouter = require("./user.routes");
const trackRouter = require("./track.routes");
const bodyPartRouter = require("./bodypart.routes");
const workoutRouter = require("./workout.routes");
const dayRouter = require("./day.routes");
const weightRouter = require("./weight.routes");
const routineRouter = require("./routine.routes");
const path = require("path");

module.exports = (app) => {

  // Middleware setup
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use(fileUpload());

  // Serve static files
  app.use("/files", express.static(path.join(__dirname, "../../storage")));

  // API routes
  app.use("/api/v1/user", userRouter);
  app.use("/api/v1/track", trackRouter);
  app.use("/api/v1/body-part", bodyPartRouter);
  app.use("/api/v1/workout", workoutRouter);
  app.use("/api/v1/day", dayRouter);
  app.use("/api/v1/weight", weightRouter);
  app.use("/api/v1/routine", routineRouter);

};
