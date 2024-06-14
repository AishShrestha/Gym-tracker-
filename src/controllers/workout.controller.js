const prisma = require("../../prisma/prismaClient");

const getAllWorkouts = async (req, res) => {
  try {
    const allWorkouts = await prisma.workout.findMany({
      include: {
        bodyPart:true
      }
    });

    if (allWorkouts.length === 0) {
      return res.status(404).json({
        message: "No workouts found",
      });
    }
    res.status(200).json({
      message: "success",
      data: {
        Workouts: allWorkouts,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching workouts");
  }
};

const getWorkout = async (req, res) => {
  const { bodyPart } = req.query;

  try {
    // Find the bodyPart by name
    const part = await prisma.bodyPart.findUnique({
      where: {
        name: bodyPart,
      },
    });

    if (!part) {
      return res.status(404).json({ message: "Body part not found" });
    }

    // Find all workouts associated with the given bodyPart
    const workouts = await prisma.workout.findMany({
      where: {
        bodyPartId: part.id,
      },
    });

    res.json({
      status: "success",
      data: {
        workout: workouts,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const addWorkout = async (req, res) => {

  const { name, bodyPartId } = req.body;
  try {
    const workout = await prisma.workout.create({
      data: {
        name,
        bodyPartId: parseInt(bodyPartId, 10),
      },
      
    });
    res.json({
      status: "success",
      data: {
        workout,
      },
    })
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};


const deleteWorkout = async (req, res) => {
  const { id } = req.params;
  try {
    const workout = await prisma.workout.delete({
      where: {
        id: parseInt(id, 10),
      },
    });
    res.json({
      status: "success",
      data: null,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
}


module.exports = {
  getAllWorkouts,
  getWorkout,
  addWorkout,
  deleteWorkout
};
