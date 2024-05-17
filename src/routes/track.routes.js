const express = require("express");
const router = express.Router();
const { addTrack, getAllTracks } = require("../controllers/track.controller");
const { authMiddleware } = require("../middleware/auth.middleware");

router.post("/addTrack", authMiddleware, addTrack);
router.get("/getAllTracks", authMiddleware, getAllTracks);
module.exports = router;
