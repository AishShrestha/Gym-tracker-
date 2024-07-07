const express = require("express");
const router = express.Router();
const {
  getAllRoutines,
  addRoutine,
  getRoutine,
  deleteRoutine,
  getRoutineByDay,
 
} = require("../controllers/routine.controller");
const { authMiddleware } = require("../middleware/jwtAuth.middleware");

router.get("/get-all-routines", authMiddleware, getAllRoutines);
router.post("/add-routine", authMiddleware, addRoutine);
router.get("/get-routine/user/:id", authMiddleware, getRoutine);
router.delete("/delete-routine", authMiddleware, deleteRoutine);
router.get("/get-routine/day/:id",authMiddleware, getRoutineByDay)

module.exports = router;
