const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please enter your name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "please enter your email"],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "please add password minimum 6 Letter"],
      trim: true,
      min: 6,
      max: 64,
    },
    phone: {
      type: String,
      required: [true, "please add password minimum 11 Letter"],
      trim: true,
    },
  },
  {timestamps: true}
);
module.exports = mongoose.model("User", userSchema);
