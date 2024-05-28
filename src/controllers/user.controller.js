const {
  jwtAuthMiddleware,
  generateToken,
  generateOTP,
} = require("../middleware/jwtAuth.middleware");
const prisma = require("../../prisma/prismaClient");
const bcrypt = require("bcrypt");
const { sendEmail } = require("../util/mailer");
const { genericUploadFiles } = require("../util/UploadLocal");

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        name: true,
        email: true,
        profilePicture: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    //if no users
    if (allUsers.length === 0) {
      return res.status(404).json({
        message: "No user found",
      });
    }

    res.status(200).json({
      message: "success",
      data: {
        allUsers,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching users"); // Respond with an error status
  }
};
const registerUser = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;
    let profilePictureUrl = null;
    if (req.files && req.files.profilePicture) {
      profilePictureUrl = await genericUploadFiles(
        req.files.profilePicture,
        "profile-pictures"
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        username: username,
        name: name,
        email: email,
        password: hashedPassword,
        profilePicture: profilePictureUrl,
      },
      select: {
        id: true,
        username: true,
        name: true,
        email: true,
        profilePicture: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    const expectedOTP = generateOTP().toString();
    const currentDate = new Date();
    currentDate.setMinutes(currentDate.getMinutes() + 30);
    const formattedExpiryDate = currentDate.toISOString();

    await prisma.oTP.create({
      data: {
        userId: newUser.id,
        code: expectedOTP,
        expiresAt: formattedExpiryDate,
      },
    });

    console.log("user email", newUser.email);

    await sendEmail({
      to: newUser.email,
      subject: "Your OTP for Login",
      text: `Your OTP for login is ${expectedOTP}`,
    });

    res.status(200).json({
      data: {
        user: newUser,
      },
      message: "OTP sent to your email address. Please check your inbox.",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating user");
  }
};

const checkOtp = async (req, res) => {
  const { otp, id } = req.body;
  try {
    const userOtp = await prisma.oTP.findFirst({
      where: {
        userId: parseInt(id),
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    if (!userOtp) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    console.log("user:", userOtp);
    if (parseInt(otp) !== parseInt(userOtp.code)) {
      return res.status(400).json({
        message: "Invalid OTP",
      });
    }
    await prisma.user.update({
      where: {
        id: parseInt(userOtp.userId),
      },
      data: {
        status: true,
      },
    });
    res.status(200).json({
      message: "OTP verified",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error"); // Respond with an error status
  }
};
const login = async (req, res) => {
  const { usernameOrEmail, password } = req.body;
  try {
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          {
            username: usernameOrEmail,
          },
          {
            email: usernameOrEmail,
          },
        ],
      },
    });
    // Check if user exists
    if (!user) {
      return res.status(401).json({
        message: "Invalid Credentials",
      });
    }
    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      res.status(401).json({
        message: "Invalid Credentials",
      });
    }

    if (!user.status) {
      delete user.password;

      return res.status(403).json({
        message: "Account is not verified",
        data: { user: user },
      });
    }

    // generate token
    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
    };
    const token = generateToken(payload);
    delete user.password;
    res.status(200).json({ token: token, user: user }); // Respond with the created user
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error"); // Respond with an error status
  }
};
const deleteUser = async (req, res) => {
  const id = req.params.id * 1;
  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }
  try {
    const deletedUser = await prisma.user.delete({
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
      res.status(404).json({ error: "User not found" });
    } else {
      res.status(500).json({ error: "Internal server error" });
      console.log(error.message);
    }
  }
};

module.exports = {
  getAllUsers,
  registerUser,
  login,
  checkOtp,
  deleteUser,
};
