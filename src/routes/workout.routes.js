const express = require("express");
const router = express.Router();
const {
  getAllWorkouts,
  getWorkout,
  addWorkout,
  deleteWorkout,
  getWorkoutWithBodyPart
} = require("../controllers/workout.controller");
const { authMiddleware } = require("../middleware/jwtAuth.middleware");

router.get("/get-all-workouts", authMiddleware, getAllWorkouts);
router.get("/get-workout", authMiddleware, getWorkout);
router.post("/add-workout", authMiddleware, addWorkout);
router.delete("/delete-workout/:id",authMiddleware, deleteWorkout);
router.get("/get-all-workouts/body-part",authMiddleware, getWorkoutWithBodyPart);
module.exports = router;
