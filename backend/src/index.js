// Import dotenv to load environment variables from a .env file
import dotenv from "dotenv";

// Import the express application instance from the app.js file
import app from "./app.js";

// Configure dotenv to load variables from the .env file
dotenv.config({
  path: "./.env",
});

// Import the connectDatabase function from the database configuration file
import connectDatabase from "./config/database.js";

// Start the server and listen on the specified port
const PORT = process.env.PORT || 8000;

// Create an asynchronous function to initialize the application server and connect to the database
const startServer = async () => {
  try {
    // Connect to the database using the connectDatabase function
    await connectDatabase();

    // Turn on the application for the database
    app.on("error", (error) => {
      console.error("Error starting the server:", error);
      // throw error; // Rethrow the error to be caught by the outer try-catch block
    });

    // Start the server and listen on the specified port
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
  }
};

// Call the startServer function to initiate the server and database connection
startServer();
