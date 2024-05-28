const express = require("express");
const router = express.Router();
const { getAllDays } = require("../controllers/day.controller");
const { authMiddleware } = require("../middleware/jwtAuth.middleware");

router.get("/get-all-days", authMiddleware, getAllDays);

module.exports = router;
