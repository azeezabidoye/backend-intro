// Import Mongoose module & Schema constructor from the "mongoose" package
import mongoose, { Schema } from "mongoose";

// Define the User schema with fields for name, email, and password
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      minlength: 1,
      maxlength: 30,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      minlength: 5,
      maxlength: 50,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 50,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  },
);

// Create and export the User model based on the defined schema
export const User = mongoose.model("User", userSchema);
