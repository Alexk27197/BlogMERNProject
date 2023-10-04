const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const generateToken = require("../generateToken");
const cloudinary = require("cloudinary").v2;
//@desc Register a new user
//route POST /api/auth/register
//@access Public

const register = async (req, res) => {
  const { name, email, password, isAdmin } = req.body;
  const userAvatar = req.file ? req.file.path : null;
  let errors = {};
  try {
    if (!email || email.trim() === "") {
      errors.emailError = "Email Is Required";
    }
    if (!name || name.trim() === "") {
      errors.nameError = "Name Is Required";
    }
    if (!password || password.trim() === "" || password.length < 6) {
      errors.passwordError = "Password Is Required";
    }
    if (errors.emailError || errors.nameError || errors.passwordError) {
      return res.status(400).json({ errors });
    }
    const userExist = await UserModel.findOne({ email });

    if (userExist) {
      return res.status(400).json({
        message: "This email has already been registered",
        success: false,
      });
    }

    const hashPass = await bcrypt.hash(password, 10); // Added await here

    const user = new UserModel({
      name,
      email,
      password: hashPass,
      isAdmin,
      userAvatar,
    });

    await user.save();

    res.status(201).json({
      message: "User Created Successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "User Create Failed",
      success: false,
    });
  }
};

//@desc Login user/set token
//route POST /api/auth/login
//@access Public
const login = async (req, res) => {
  const { email } = req.body;

  let errors = {};
  try {
    if (!email || email.trim() === "") {
      errors.emailError = "Email Is Required";
    }
    if (
      !req.body.password ||
      req.body.password.trim() === "" ||
      req.body.password.length < 6
    ) {
      errors.passwordError = "Password Is Required";
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      errors.wrongEmail = "Password or Email not correct";
    }

    const camparePass = await bcrypt.compare(req.body.password, user.password);

    if (!camparePass) {
      errors.wrongPassword = "Password or Email not correct";
    }

    if (
      errors.emailError ||
      errors.wrongEmail ||
      errors.passwordError ||
      errors.wrongPassword
    ) {
      return res.status(400).json({ errors });
    }

    const { password, ...userInfo } = user._doc;
    generateToken(res, user._id);

    res
      .status(200)
      .json({ message: "Login Successfuly", success: true, userInfo });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Login Failed!",
    });
  }
};

const updateUserProfile = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await UserModel.findById(req.user._id);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    if (req.file) {
      const cloudinaryURL = user.userAvatar;
      const parts = cloudinaryURL.split("/");
      const filename = parts[parts.length - 1];
      const publicIdWithVersion =
        parts[parts.length - 2] + "/" + filename.split(".")[0];
      const publicId = publicIdWithVersion.replace(/^v\d+\//, "");

      await cloudinary.uploader.destroy(publicId);

      user.userAvatar = req.file.path;
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }
    user.name = name;
    user.email = email;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Failed to update profile",
    });
  }
};

//@desc Logout logged out user
//route POST /api/auth/logout-user
//@access Public
const getUserProfile = async (req, res) => {
  try {
    const userInfo = req.user;
    res.status(200).json({
      message: "Getting user details successfuly!",
      success: true,
      userInfo,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Getting user info Failed!",
    });
  }
};

//@desc Logout logged out user
//route POST /api/auth/logout-user
//@access Public
const logout = async (req, res) => {
  try {
    res.cookie("token", {
      httpOnly: true,
      expires: new Date(0),
    });

    res
      .status(200)
      .json({ message: "User logged out successfuly!", success: true });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "User logged out Failed!",
    });
  }
};

module.exports = {
  register,
  login,
  getUserProfile,
  updateUserProfile,
  logout,
};
