const prisma = require("../../prisma/prismaClient");

const addWeight = async (req, res) => {
  const { weight, userId } = req.body;

  if (typeof weight !== "number" || typeof userId !== "number") {
    return res.status(400).json({
      message: "Invalid input",
    });
  }
  try {
    const newWeight = await prisma.weight.create({
      data: {
        weight,
        userId,
      },
    });
    res.status(201).json({
      message: "Weight added successfully",
      weight: newWeight,
    });
  } catch (err) {
    console.error(err);

    if (err.code === "P2002") {
      return res.status(409).json({
        message: "A weight entry for this user already exists",
      });
    }

    res.status(500).json({
      message: "Internal server error",
    });
  }
};
const getWeight = async (req, res) => {
  const userId = req.params.id * 1;
  try {
    const weight = await prisma.weight.findUnique({
      where: {
        userId,
      },
    });
    if (!weight) {
      return res.status(404).json({
        message: "Weight record not found",
      });
    }

    res.status(200).json({
      message: "success",
      data: {
        weight,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching weight");
  }
};
const deleteWeight = async (req, res) => {
  const userId = req.params.id * 1;
  try {
    const weight = await prisma.weight.delete({
      where: {
        userId,
      },
    });
    res.status(200).json({
      message: "success",
      data: {
        weight: null,
      },
    });
  } catch (err) {
    console.error(err);
    if (err.code === "P2025") {
      return res.status(404).json({
        message: "Weight record not found",
      });
    }

    res.status(500).json({
      message: "Internal server error",
    });
  }
};
module.exports = {
  addWeight,
  getWeight,
  deleteWeight,
};
