const JWT = require("jsonwebtoken");
const { hashPassword, comparePassword } = require("../helpers/authHelper");
const userModel = require("../model/userModel");
const nodemailer = require("nodemailer");
const { storeOTP } = require("../helpers/authHelper");

const signUpController = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
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
    const exsistingUser = await userModel.findOne({ email });
    if (exsistingUser) {
      return res.status(500).send({
        success: false,
        message: "user already Register with this email",
      });
    }
    const exsistingPhoneNumber = await userModel.findOne({ phone });
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
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(500).send({
        success: false,
        message: "Please provide email and password",
      });
    }
    const user = await userModel.findOne({ email });
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
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECERT, {
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

const sendOTP = async (req, res) => {
  try {
    const userEmail = req.body.email;

    if (!validateEmail(userEmail)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email address." });
    }
    const otp = Math.floor(1000 + Math.random() * 9000);
    await storeOTP(userEmail, otp, { expiresIn: "5m" }); // Store OTP with 5 minutes expiration
    const transporter = nodemailer.createTransport({
      host: "smtp.example.com",
      port: 587,
      auth: {
        user: process.env.EMAIL_USER, // Get from environment variables
        pass: process.env.EMAIL_PASS, // Get from environment variables
      },
    });

    const info = await transporter.sendMail({
      from: `"Your App" <${process.env.EMAIL_USER}>`,
      to: userEmail,
      subject: "Your OTP Code",
      text: `Your OTP code is: ${otp}`,
      html: `<b>Your OTP code is: ${otp}</b>`,
    });

    console.log("OTP sent: %s", info.messageId);

    res.status(200).json({ success: true, message: "OTP sent to your email." });
  } catch (error) {
    console.error("Error in sending OTP:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error in sending OTP.", error });
  }
};

function validateEmail(email) {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(email);
}
const updateUserController = async (req, res) => {
  try {
    const { name, password, phone, email } = req.body;

    // Find user by email
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found with the provided email.",
      });
    }

    // Password validation
    if (password && password.length < 6) {
      return res.status(400).send({
        success: false,
        message: "Password must be at least 6 characters long.",
      });
    }

    const hashedPassword = password ? await hashPassword(password) : undefined;

    const updatedUser = await userModel.findOneAndUpdate(
      { email },
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
      },
      { new: true }
    );

    user.password = undefined;
    res.status(200).send({
      success: true,
      message: "Profile updated successfully.",
      updatedUser,
    });
  } catch (error) {
    console.error("Error in update-user API:", error);
    res.status(500).send({
      success: false,
      message: "Error updating user profile.",
      error,
    });
  }
};

module.exports = {
  signUpController,
  signInController,
  sendOTP,
  updateUserController,
};
