const express = require("express");
const router = express.Router();
const {
  getAllWorkouts,
  getWorkout,
} = require("../controllers/workout.controller");
const { authMiddleware } = require("../middleware/auth.middleware");

router.get("/getAllWorkouts", authMiddleware, getAllWorkouts);
router.get("/getWorkout", authMiddleware, getWorkout);
module.exports = router;
