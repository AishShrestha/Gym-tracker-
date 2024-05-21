const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const userRouter = require("./user.routes");
const trackRouter = require("./track.routes");
const bodyPartRouter = require("./bodypart.routes");
const workoutRouter = require("./workout.routes");
const dayRouter = require("./day.routes");

module.exports = (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use(fileUpload());

  // app.use("/files/", userRouter);
  app.use("/api/v1/user", userRouter);
  app.use("/api/v1/track", trackRouter);
  app.use("/api/v1/bodyPart", bodyPartRouter);
  app.use("/api/v1/workout", workoutRouter);
  app.use("/api/v1/day", dayRouter);
};
