const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerController = async (req, res) => {
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
    if (errors) {
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

const loginController = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(200).send({
        success: false,
        message: "Email is not registered",
      });
    }

    const camparePass = await bcrypt.compare(req.body.password, user.password);

    if (!camparePass) {
      errors.push("Invalid Password");
      return res.status(200).send({
        success: false,
        message: "Invalid login credentials",
      });
    }

    const token = jwt.sign(
      {
        _id: user._id,
        username: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        userAvatar: user.userAvatar,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.cookie("token", token, {
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      sameSite: "none",
      // secure: true,
    });

    res.status(200).json({ message: "Login Successfuly", userId: user._id });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Login Failed!",
    });
  }
};

const getUserController = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await UserModel.findById({ id });
    const { password, ...userInfo } = user._doc;

    res.status(200).json({ message: "Getting user successfuly", userInfo });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Get User Failed!",
    });
  }
};

const updatePasswordController = async (req, res) => {
  const { id } = req.params;
  const { newPassword } = req.body;

  if (!newPassword || newPassword.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "New password is required",
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await UserModel.findByIdAndUpdate(id, {
      password: hashedPassword,
    });

    res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Failed to update password",
    });
  }
};

module.exports = {
  registerController,
  loginController,
  getUserController,
  updatePasswordController,
};
