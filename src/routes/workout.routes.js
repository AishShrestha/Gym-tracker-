const express = require("express");
const router = express.Router();
const {
  getAllWorkouts,
  getWorkout,
  addWorkout,
  deleteWorkout,
} = require("../controllers/workout.controller");
const { authMiddleware } = require("../middleware/jwtAuth.middleware");

router.get("/get-all-workouts", authMiddleware, getAllWorkouts);
router.get("/get-workout", authMiddleware, getWorkout);
router.post("/add-workout", authMiddleware, addWorkout);
router.delete("/delete-workout/:id",authMiddleware, deleteWorkout);
module.exports = router;
