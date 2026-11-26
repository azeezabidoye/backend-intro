// Import the User model from the "user.model.js" file
import { User } from "../models/user.model.js";

// Define a controller function to handle user registration
export const registerUser = async (req, res) => {
  try {
    // Extract user data from the request body
    const { username, email, password } = req.body;

    // Basic validation to check if all required fields are provided
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Save the new user to the database
    const user = await User.create({ username, email, password });

    // Send a success response
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Error registering user" });
  }
};
