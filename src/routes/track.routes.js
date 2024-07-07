const express = require("express");
const router = express.Router();
const {
  addTrack,
  getAllTracks,
  deleteTrack,
  createManyTracks
} = require("../controllers/track.controller");
const { authMiddleware } = require("../middleware/jwtAuth.middleware");

router.post("/add-track", authMiddleware, addTrack);
router.get("/get-all-tracks", authMiddleware, getAllTracks);
router.get("/delete-track/:id", authMiddleware, deleteTrack);
router.post("/add-track/many",authMiddleware, createManyTracks);
module.exports = router;
