const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerController = async (req, res) => {
  const { name, email, password, isAdmin } = req.body;
  const userAvatar = req.file.path; // This is the Cloudinary URL

  if (!name) {
    return res.status(400).json({ message: "Name Is Required" });
  }
  if (!password) {
    return res.status(400).json({ message: "Password Is Required" });
  }

  const userExist = await UserModel.findOne({ email });

  if (userExist) {
    return res
      .status(400)
      .json({ message: "This email has already been registered" });
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
  });
};

const loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(200).send({
        success: false,
        message: "Email is not registered",
      });
    }

    const camparePass = await bcrypt.compare(password, user.password);

    if (!camparePass) {
      errors.push("Invalid Password");
      return res.status(200).send({
        success: false,
        message: "Invalid login credentials",
      });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      // secure: true,
    });

    res.status(200).json({ message: "Login Successfuly" });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Login Failed!",
    });
  }
};

module.exports = { registerController, loginController };
