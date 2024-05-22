const express = require("express");
const router = express.Router();
const { addTrack, getAllTracks } = require("../controllers/track.controller");
const { authMiddleware } = require("../middleware/auth.middleware");

router.post("/add-track", authMiddleware, addTrack);
router.get("/get-all-tracks", authMiddleware, getAllTracks);
module.exports = router;
