const express = require("express");
const {
  registerController,
  loginController,
  getUserController,
  updatePasswordController,
} = require("../controllers/AuthControllers");
const { verify, isAdmin } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadsMiddleware");
const router = express.Router();

router.post("/register", upload.single("userAvatar"), registerController);
router.post("/login", loginController);
router.get("/get-user/:id", verify, getUserController);
router.put("/update-password/:id", verify, updatePasswordController);
module.exports = router;
