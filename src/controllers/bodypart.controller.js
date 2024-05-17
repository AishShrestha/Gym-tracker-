const prisma = require("../../prisma/prismaClient");

const getAllBodyParts = async (req, res) => {
  try {
    const allBodyParts = await prisma.bodyPart.findMany();

    if (allBodyParts.length === 0) {
      return res.status(404).json({
        message: "No body parts found",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        bodyParts: allBodyParts,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching body parts"); // Respond with an error status
  }
};

module.exports = {
  getAllBodyParts,
};
