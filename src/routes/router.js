const express = require("express");
const userRouter = require("./user.routes");

module.exports = (app) => {
  app.use(express.json());
  app.use("/api/v1/user", userRouter);
};
