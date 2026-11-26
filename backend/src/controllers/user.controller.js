// Import the User model from the "user.model.js" file
import { User } from "../models/user.model.js";

// Define a controller function to handle user registration
const registerUser = async (req, res) => {
  try {
    // Extract user data from the request body
    const { username, email, password } = req.body;

    // Basic validation to check if all required fields are provided
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if a user with the same email already exists in the database
    const existingUser = await User.findOne({ email: email.toLowerCase() });

    // If a user with the same email exists, return an error
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    // Save the new user to the database
    const user = await User.create({
      username,
      email: email.toLowerCase(),
      password,
      loggedIn: false, // Set the loggedIn field to false by default
    });

    // Send a success response0
    res.status(201).json({
      message: "User registered successfully",
      user: { id: user._id, email: user.email, username: user.username },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
};

// Export functions and variables to be used in other parts of the application
export { registerUser };
