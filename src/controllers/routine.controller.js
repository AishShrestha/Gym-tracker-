const prisma = require("../../prisma/prismaClient");

const getAllRoutines = async (req, res) => {
  try {
    const allRoutines = await prisma.routine.findMany();

    if (!allRoutines.length) {
      return res.status(404).json({
        message: "No routines found",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        routines: allRoutines,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching routines");
  }
};

const addRoutine = async (req, res) => {
  let { userId, dayId, workoutId } = req.body;

  userId = parseInt(userId, 10);
  dayId = parseInt(dayId, 10);
  workoutId = parseInt(workoutId, 10);

  // Validate that all IDs are valid integers
  if (isNaN(userId) || isNaN(dayId) || isNaN(workoutId)) {
    return res.status(400).json({
      error:
        "Invalid request data: userId, dayId, and workoutId must be valid integers",
    });
  }

  try {
    // Checking if userId, dayId, workoutId exist
    const [user, day, workout] = await Promise.all([
      prisma.user.findUnique({ where: { id: userId } }),
      prisma.day.findUnique({ where: { id: dayId } }),
      prisma.workout.findUnique({ where: { id: workoutId } }),
    ]);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (!day) {
      return res.status(404).json({ error: "Day not found" });
    }
    if (!workout) {
      return res.status(404).json({ error: "Workout not found" });
    }

    // Creating new routine
    const newRoutine = await prisma.routine.create({
      data: {
        userId: userId,
        dayId: dayId,
        workoutId: workoutId,
      },
    });

    res.status(200).json({
      status: "success",
      data: {
        routine: newRoutine,
      },
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
    console.error("Error creating routine:", err);
  }
};
const getRoutine = async (req, res) => {
  
  const userId = req.params.id * 1;

  if (isNaN(userId)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }
  try {
    const routine = await prisma.routine.findMany({
      where: {
        userId: userId,
      },
      include: {
        workout: {
          select: {
            name: true,
          },
        },
        day: {
          select: {
            name: true,
          },
        },
      },
    });
    if (routine.length === 0) {
      return res.status(404).json({ error: "Routine not found" });
    }
    res.status(200).json({
      status: "success",
      data: {
        routine,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching routine");
  }
};

const deleteRoutine = async (req, res) => {
  const routineIds = req.body.routineIds;

  if (!Array.isArray(routineIds) || routineIds.length === 0) {
    return res
      .status(400)
      .json({ error: "Please provide an array of routine IDs" });
  }

  try {
    const deletedRoutines = await prisma.routine.deleteMany({
      where: {
        id: {
          in: routineIds,
        },
      },
    });

    if (deletedRoutines.count === 0) {
      return res.status(404).json({ error: "No routines found to delete" });
    }

    res.status(200).json({
      status: "success",
      data: {
        count: deletedRoutines.count,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error deleting routines" });
  }
};

module.exports = {
  getAllRoutines,
  addRoutine,
  getRoutine,
  deleteRoutine,
};
