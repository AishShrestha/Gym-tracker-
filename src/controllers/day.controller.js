const prisma = require("../../prisma/prismaClient");

const getAllDays = async (req, res) => {
  try {
    const allDays = await prisma.day.findMany();

    if (allDays.length === 0) {
      return res.status(404).json({
        message: "No day found",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        days: allDays,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching days");
  }
};

module.exports = {
  getAllDays,
};
