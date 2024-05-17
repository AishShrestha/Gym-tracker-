const express = require("express");
const cors = require("cors");
const userRouter = require("./user.routes");
const trackRouter = require("./track.routes");
const bodyPartRouter = require("./bodypart.routes");
const workoutRouter = require("./workout.routes");

module.exports = (app) => {
  app.use(cors());
  app.use(express.json());
  app.use("/api/v1/user", userRouter);
  app.use("/api/v1/track", trackRouter);
  app.use("/api/v1/bodyPart", bodyPartRouter);
  app.use("/api/v1/workout", workoutRouter);
};
