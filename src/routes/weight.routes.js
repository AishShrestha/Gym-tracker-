const express = require("express");
const router = express.Router();
const {
  addWeight,
  getWeight,
  deleteWeight,
} = require("../controllers/weight.controller");
const { authMiddleware } = require("../middleware/auth.middleware");

router.post("/add-weight", authMiddleware, addWeight);
router.get("/get-weight/:id", authMiddleware, getWeight);
router.delete("/delete-weight/:id", authMiddleware, deleteWeight);

module.exports = router;
