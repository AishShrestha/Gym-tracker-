const express = require("express");
const router = express.Router();
const {
  getAllWorkouts,
  getWorkout,
  addWorkout,
} = require("../controllers/workout.controller");
const { authMiddleware } = require("../middleware/auth.middleware");

router.get("/get-all-workouts", authMiddleware, getAllWorkouts);
router.get("/get-workout", authMiddleware, getWorkout);
router.post("/add-workout", authMiddleware, addWorkout);
module.exports = router;
