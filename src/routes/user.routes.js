const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/jwtAuth.middleware");
const {
  getAllUsers,
  registerUser,
  login,
  checkOtp,
  deleteUser,
  getMe,

} = require("../controllers/user.controller");

router.get("/me",authMiddleware,getMe);
router.get("/get-all-users", authMiddleware, getAllUsers);
router.post("/register-user", registerUser);
router.post("/check-otp", checkOtp);
router.post("/login", login);
router.delete("/delete-user/:id", deleteUser);

module.exports = router;
