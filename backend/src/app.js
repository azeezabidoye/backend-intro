// Import the express module from "express";
import express from "express";

// Create an instance of the express application
const app = express();

// Import the routes in to Express application
import userRoutes from "./routes/user.route.js";

// Use the imported user routes for handling requests to "/api/v1/users"
app.use("/api/v1/users", userRoutes);

export default app;
