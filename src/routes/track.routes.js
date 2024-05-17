const express = require("express");
const router = express.Router();
const { addTrack, getAllTracks } = require("../controllers/track.controller");

router.post("/addTrack", addTrack);
router.get("/getAllTracks", getAllTracks);
module.exports = router;
