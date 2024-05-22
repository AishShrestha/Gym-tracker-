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
const addBodyPart = async (req, res) => {
  const { name } = req.body;
  try {
    const bodyPart = await prisma.bodyPart.create({
      data: {
        name,
      },
    });
    res.status(201).json({
      status: "success",
      data: {
        bodyPart: bodyPart,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding body part"); // Respond with an error status
  }
};

module.exports = {
  getAllBodyParts,
  addBodyPart,
};
