const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const userRouter = require("./user.routes");
const trackRouter = require("./track.routes");
const bodyPartRouter = require("./bodypart.routes");
const workoutRouter = require("./workout.routes");
const dayRouter = require("./day.routes");
const authRouter = require("./auth.routes");
const path = require("path");

module.exports = (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use(fileUpload());

  app.use(
    "/files",
    express.static(path.join(__dirname, "../../storage", "profile-pictures"))
  );
  app.use("/api/v1/user", userRouter);
  app.use("/api/v1/track", trackRouter);
  app.use("/api/v1/body-part", bodyPartRouter);
  app.use("/api/v1/workout", workoutRouter);
  app.use("/api/v1/day", dayRouter);
  app.use("/auth/google", authRouter);
};
