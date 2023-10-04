const express = require("express");
const {
  register,
  login,
  getUserProfile,
  updateUserProfile,
  logout,
} = require("../controllers/AuthControllers");
const { verify, isAdmin } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadsMiddleware");
const router = express.Router();

router.post("/register", upload.single("userAvatar"), register);
router.post("/login", login);
router.get("/get-user", verify, getUserProfile);
router.put(
  "/profile-update",
  verify,
  upload.single("userAvatar"),
  updateUserProfile
);
router.get("/logout", verify, logout);
module.exports = router;
