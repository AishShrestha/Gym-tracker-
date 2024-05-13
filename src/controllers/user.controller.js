const {
  jwtAuthMiddleware,
  generateToken,
  generateOTP,
} = require("../middleware/auth.middleware");
const prisma = require("../prisma/prismaClient");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const { sendEmail } = require("../util/mailer");

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
  const { name, username, email, password, profilePicture } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        username: username,
        name: name,
        email: email,
        password: hashedPassword,
        profilePicture: profilePicture,
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
    // Generates otp code
    const expectedOTP = generateOTP().toString();
    const currentDate = new Date();
    currentDate.setMinutes(currentDate.getMinutes() + 30);
    const formattedExpiryDate = currentDate.toISOString(); // ISO-8601 DateTime format

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
    //  Respond with a success message
    res.status(200).json({
      data: {
        user: newUser,
      },
      message: "OTP sent to your email address. Please check your inbox.",
    });

    // const payload = {
    //   id: newUser.id,
    //   username: newUser.username,
    //   email: newUser.email,
    // };
    // console.log(payload);
    // // console.log(newUser.password);
    // const token = generateToken(payload);

    // res.status(201).json({ user: newUser, token: token }); // Respond with the created user
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating user"); // Respond with an error status
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

    // generate token
    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
    };
    const token = generateToken(payload);
    res.status(200).json({ token: token }); // Respond with the created user
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error"); // Respond with an error status
  }
};

module.exports = {
  getAllUsers,
  registerUser,
  login,
  checkOtp,
};
