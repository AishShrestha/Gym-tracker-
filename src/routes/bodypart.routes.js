const express = require("express");
const router = express.Router();
const { getAllBodyParts } = require("../controllers/bodypart.controller");
const { authMiddleware } = require("../middleware/auth.middleware");

router.get("/getAllBodyParts", authMiddleware, getAllBodyParts);

module.exports = router;
