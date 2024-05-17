const express = require("express");
const router = express.Router();
const {
  getAllWorkouts,
  getWorkout,
} = require("../controllers/workout.controller");

router.get("/getAllWorkouts", getAllWorkouts);
router.get("/getWorkout", getWorkout);
module.exports = router;
