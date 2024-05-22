const express = require("express");
const router = express.Router();
const {
  getAllBodyParts,
  addBodyPart,
} = require("../controllers/bodypart.controller");
const { authMiddleware } = require("../middleware/auth.middleware");

router.get("/getAllBodyParts", authMiddleware, getAllBodyParts);
router.post("/addBodyPart", authMiddleware, addBodyPart);

module.exports = router;
