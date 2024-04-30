const JWT = require("jsonwebtoken");
const {hashPassword, comparePassword} = require("../helpers/authHelper");
const userModel = require("../model/userModel");
const otpMap = new Map();

const signUpController = async (req, res) => {
  try {
    const {name, email, phone, password} = req.body;
    if (!name) {
      return res.status(400).send({
        success: false,
        message: "name is required.",
      });
    }
    if (!email) {
      return res.status(400).send({
        success: false,
        message: "email is required.",
      });
    }
    if (!phone || phone.length < 11) {
      return res.status(400).send({
        success: false,
        message: "Phone number is required and must be at least 11 digits.",
      });
    }
    if (!password || password.length < 6) {
      return res.status(400).send({
        success: false,
        message: "Password is required and must be at least 6 characters long.",
      });
    }
    const exsistingUser = await userModel.findOne({email});
    if (exsistingUser) {
      return res.status(500).send({
        success: false,
        message: "user already Register with this email",
      });
    }
    const exsistingPhoneNumber = await userModel.findOne({phone});
    const hashedPassword = await hashPassword(password);
    if (exsistingPhoneNumber) {
      return res.status(500).send({
        success: false,
        message: "user already Register with this phone number",
      });
    }
    const user = await userModel({
      name,
      email,
      phone,
      password: hashedPassword,
    }).save();
    return res.status(201).send({
      success: true,
      message: "Registeration successfull please login",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error in register api",
      error,
    });
  }
};
const signInController = async (req, res) => {
  try {
    const {email, password} = req.body;
    if (!email || !password) {
      return res.status(500).send({
        success: false,
        message: "Please provide email and password",
      });
    }
    const user = await userModel.findOne({email});
    if (!user) {
      return res.status(500).send({
        success: false,
        message: "User not found!",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(500).send({
        success: false,
        message: "Invalid username or password",
      });
    }
    const token = await JWT.sign({_id: user._id}, process.env.JWT_SECERT, {
      expiresIn: "365d",
    });
    user.password = undefined;
    res.status(200).send({
      success: true,
      message: "login successfully",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error in login api",
      error,
    });
  }
};
const sendEmail = async (req, res) => {
  
};

module.exports = {
  signUpController,
  signInController,
  sendEmail,
};
