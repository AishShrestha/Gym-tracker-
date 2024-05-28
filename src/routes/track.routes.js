const express = require("express");
const router = express.Router();
const {
  addTrack,
  getAllTracks,
  deleteTrack,
} = require("../controllers/track.controller");
const { authMiddleware } = require("../middleware/jwtAuth.middleware");

router.post("/add-track", authMiddleware, addTrack);
router.get("/get-all-tracks", authMiddleware, getAllTracks);
router.get("/delete-track/:id", authMiddleware, deleteTrack);
module.exports = router;
