const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async (res, req) => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `Connected to DataBase ${mongoose.connection.host}`.bgBlue.white
    );
  } catch (error) {
    console.log(`error in connection DB ${error}`.bgCyan.white);
  }
};

module.exports = connectDB;
