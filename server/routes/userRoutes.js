const express = require("express");
const {
  signUpController,
  signInController,
  sendOTP,
  updateUserController,
} = require("../controllers/userController");

const router = express.Router();

router.post("/signUp", signUpController);
router.post("/signIn", signInController);
router.post("/sendOTP", sendOTP);
router.put("/update-user", updateUserController);

module.exports = router;
