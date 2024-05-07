const db = require("../config/db"); 
async function storeOTP(email, otp) {
  try {
    await db.saveOTP(email, otp);
  } catch (error) {
    console.error("Error storing OTP:", error);
    throw error;
  }
}
async function validateOTP(email, enteredOTP) {
  try {
    const storedOTP = await db.getOTP(email);
    if (enteredOTP === storedOTP) {
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error validating OTP:", error);
    throw error;
  }
}

module.exports = {
  storeOTP,
  validateOTP,
};
