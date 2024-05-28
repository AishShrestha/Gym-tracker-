const express = require("express");
const router = express.Router();
const {
  getAllRoutines,
  addRoutine,
  getRoutine,
  deleteRoutine,
} = require("../controllers/routine.controller");
const { authMiddleware } = require("../middleware/jwtAuth.middleware");

router.get("/get-all-routines", authMiddleware, getAllRoutines);
router.post("/add-routine", authMiddleware, addRoutine);
router.get("/get-routine", authMiddleware, getRoutine);
router.delete("/delete-routine", authMiddleware, deleteRoutine);

module.exports = router;
