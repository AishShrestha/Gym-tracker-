const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/auth.middleware");
const {
  getAllUsers,
  registerUser,
  login,
  checkOtp,
} = require("../controllers/user.controller");

router.get("/get-all-users", authMiddleware, getAllUsers);
router.post("/register-user", registerUser);
router.post("/check-otp", checkOtp);
router.post("/login", login);

module.exports = router;
