const express = require("express");
const {
  registerController,
  loginController,
} = require("../controllers/AuthControllers");
const upload = require("../middleware/uploadsMiddleware");
const router = express.Router();

router.post("/register", upload.single("userAvatar"), registerController);
router.post("/login", loginController);

module.exports = router;
