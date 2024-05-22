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
const deleteBodyPart = async (req, res) => {
  const id = req.params.id * 1;

  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }

  try {
    const deletedPart = await prisma.bodyPart.delete({
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
      res.status(404).json({ error: "BodyPart not found" });
    } else {
      res
        .status(500)
        .json({ error: "Internal server error", details: error.message });
    }
  }
};

module.exports = {
  getAllBodyParts,
  addBodyPart,
  deleteBodyPart,
};
