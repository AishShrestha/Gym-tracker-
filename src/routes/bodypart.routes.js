const express = require("express");
const router = express.Router();
const {
  getAllBodyParts,
  addBodyPart,
  deleteBodyPart,
} = require("../controllers/bodypart.controller");
const { authMiddleware } = require("../middleware/auth.middleware");

router.get("/get-all-body-parts", authMiddleware, getAllBodyParts);
router.post("/add-body-part", authMiddleware, addBodyPart);
router.delete("/delete-body-part/:id", authMiddleware, deleteBodyPart);

module.exports = router;
