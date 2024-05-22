const prisma = require("../../prisma/prismaClient");
const getAllTracks = async (req, res) => {
  try {
    const allTracks = await prisma.track.findMany();

    //if no users
    if (allTracks.length === 0) {
      return res.status(404).json({
        message: "No track found",
      });
    }

    res.status(200).json({
      message: "success",
      data: {
        allTracks,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching tracks"); // Respond with an error status
  }
};

const addTrack = async (req, res) => {
  const { set, rep, weight, workoutId, userId } = req.body;

  // Validate request data
  if (
    set == null ||
    rep == null ||
    weight == null ||
    workoutId == null ||
    userId == null
  ) {
    return res.status(400).json({ error: "Invalid request data" });
  }
  try {
    const newTrack = await prisma.track.create({
      data: {
        set,
        rep,
        weight,
        workoutId,
        userId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    res.status(201).json({ newTrack });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
    console.log(err);
  }
};
const deleteTrack = async (req, res) => {
  const id = req.params.id * 1;
  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }
  try {
    const deletedTrack = await prisma.track.delete({
      where: {
        id: id,
      },
    });
    res.status(200).json({
      status: "success",
      data: {
        user: null,
      },
    });
  } catch (error) {
    if (error.code === "P2025") {
      res.status(404).json({ error: "Track not found" });
    } else {
      res
        .status(500)
        .json({ error: "Internal server error", details: error.message });
    }
  }
};

module.exports = {
  addTrack,
  getAllTracks,
  deleteTrack,
};
