// Import the mongoose module from "mongoose";
import mongoose from "mongoose";

// Create a function to connect the database using the provided URI
const connectDatabase = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}`,
    );
    console.log(
      `MongoDB connected successfully: ${connectionInstance.connection.host}`,
    );
  } catch (error) {
    console.error(`Error connecting to the database: ${error.message}`);
    process.exit(1); // Exit the process with an error code
  }
};

// Export the connectDatabase function for use in other parts of the application
export default connectDatabase;
