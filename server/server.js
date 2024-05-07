// Import dependencies
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

// Initialize `app` variable
const app = express();

// Use middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Set up routes
app.use("/api/v1/auth", require("./routes/userRoutes"));

// Define a Mongoose schema for the data
const mongoose = require("mongoose");
const userDataSchema = new mongoose.Schema({
  items: [
    {
      itemName: {
        type: String,
        required: true,
      },
      totalCalories: {
        type: Number,
        required: true,
      },
      totalMacros: {
        type: Number,
        required: true,
      },
    },
  ],
});

// Create a Mongoose model based on the schema
const UserData = mongoose.model("UserData", userDataSchema);

// Route to handle POST requests to save user data
app.post("/api/v1/userdata", async (req, res) => {
  try {
    const { items } = req.body;

    // Check if items array is empty
    if (!items || items.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter at least one item" });
    }

    // Create a new document using the UserData model
    const userData = new UserData({ items });

    // Save the document to the database
    await userData.save();

    // Respond with success message
    res
      .status(201)
      .json({ success: true, message: "User data saved successfully" });
  } catch (error) {
    // If an error occurs, respond with an error message
    console.error("Error saving user data:", error);
    res.status(500).json({ success: false, message: "Error saving user data" });
  }
});

// Start the server
const PORT = process.env.PORT || 4848;
app.listen(PORT, () => {
  console.log(`Server running successfully on port ${PORT}`.bgGreen.white);
});
