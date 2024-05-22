const express = require("express");
const router = express.Router();
const {
  getAllWorkouts,
  getWorkout,
  addWorkout,
} = require("../controllers/workout.controller");
const { authMiddleware } = require("../middleware/auth.middleware");

router.get("/getAllWorkouts", authMiddleware, getAllWorkouts);
router.get("/getWorkout", authMiddleware, getWorkout);
router.post("/addWorkout", authMiddleware, addWorkout);
module.exports = router;
