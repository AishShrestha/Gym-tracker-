const express = require("express");
const router = express.Router();
const { getAllBodyParts } = require("../controllers/bodypart.controller");

router.get("/getAllBodyParts", getAllBodyParts);

module.exports = router;
