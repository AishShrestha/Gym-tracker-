const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/auth.middleware");
const {
  getAllUsers,
  registerUser,
  login,
  checkOtp,
} = require("../controllers/user.controller");

router.get("/getAllUsers", authMiddleware, getAllUsers);
router.post("/registerUser", registerUser);
router.post("/checkOtp", checkOtp);
router.post("/login", login);

module.exports = router;
