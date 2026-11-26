// Import Mongoose module & Schema constructor from the "mongoose" package
import mongoose, { Schema } from "mongoose";

// Define the User schema with fields for name, email, and password
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minlength: 1,
    maxlength: 30,
  },
});
