## Core Components of Backend Development

1. Programming Language: JavaScript, Python, PHP, GO, C++
2. Database: MongoDB (NoSQL), SQL, PostgreSQL, SQLite
3. Runtime Environment: A runtime environment is the underlying 'engine' that executes your code outside of a browser
4. Framework: Backend frameworks help you build a server faster by giving you ready-made tools and hiding the complex, low-level stuff by handling all the common repititive tasks

**Database** is a storage where website data are stored. The major types of databases are SQL and NoSQL:

- SQL are the most structured ones where data ate stored in tabular form e.g MySQL
- NoSQL databases are the more flexible ones where you keep your data in documents, key-value pairs and in graphs e.g MongoDB

## Backend Architecture Flow

Javascript - Custom Instructions
|
V
Node JS - Engine that runs the code
|
V
Express JS - Prebuilt Structure/Toolkit
|
V
Database - Stores the Data
|
V
Backend Server - Handles API Requests (req --> res)

## How Frontend Connects to Backend

{Browser/User} --(Request)--> {API} --> {Backend Server} --> {Database}

{Browser/User} <-----------------------(Response)----------------------

**Key**

- Client --> Server == Request
- Server --> Client == Response

## Backend Folder Structure

-backend/
|--> src/
| |--> index.js ##starts the server
| |--> app.js ##setup Express & middleware
|
|--> config/
| |--> database.js ##connects to MongoDB Atlas
| |--> constants.js ##store global constants
|
|--> controllers/
| |--> auth.contoller.js #auth related route
|
|--> models/
| |--> user.model.js #mongoose user schema
|
|
|--> .env ##environment variables
|--> .gitignore ##ignore files/folder
|--> package.json ##project metadata & dependencies

## Development

1. **Project Initialization**

- Create & navigate into a new project directory
- Initialize NPM
- (Optional) Configure the ES-module type in the `package.json` file

```javascript
"type": "module"
```

> Another type is "CommonJS"

- Create `.env` and `.gitignore` file and configure it. Search for "gitignore generator" online and copy the config for node

2. ** Connecting to Database**

- Create a MongoDB Atlas Cluster for your project
- Go to [mongodb.com](mongodb.com) and select Atlas
- Click new project to create a new project
- Give the new project a name
- Skip Key-Value and select `Next`
- Skip `Add Member` and select `Create Project`
- Now it's time to create Cluster, select `Create` on the project overview page
- Choose the region closest to you
- Choose plan, give cluster a name and select `Create deployment`
  > This pops-up a window instructing you to copy `username` and `password`
- Copy both and keep them safe
- Click `Choose a connection methd` and select `Compass` method from the pop-up
- Look closely at the window pop-up and copy the mongoDB connection string
- Click `Done` to finalize the step

## Database Confiq & ENV

- Setting up the MongoDB database as an env-variable requires using the MongoDB Connection string
- The connection string provides placeholders for the database `username` & `password`
- Replace the password with the one you copied initially
- Copy URI and paste in the `.env` file

**Better Approach**

- Open MongoDB Atlas and project overview
- Select `Database and Network Access` from the sidebar
- Click `Edit` from the actions and a window with more details will pop-up
- In the `Password Authentication` section, click `Edit Password`
- Insert a new password in the provided field
- Copy the password and keep safe
- Click on `Update User` to save changes and close the modal

> Replace the password placeholder in the connection string configured in the `.env` file with the customized one you just updated

```javascript
MONGODB_URI = [mongodb_connection_string];
```

3. ** Constant Files**
   This file stores and shares the important values of your project e.g database name. So you can use them multiple times in your backend project.

- Create an `src` folder and open it
- Create a folder named `config`
- Open `config` directory and create a new file named `constant.js`
- Configure the database name

```javascript
export const DB_NAME = "backend-intro";
```

4. **App JS File**
   This is where every request comes firstly and it contains all the setup needed for an Express application.

- Create `app.js` file directly in the `src` folder
- Install Express as a dependency

```bash
npm i express
```

- Import Express into `app.js` file

```javascript
import express from "express";
```

- Create an Express application

```javascript
const app = express();
```

- Setup Express app middleware to parse JSON files

```javascript
app.use(express.json());
```

- Export the Express app created

```javascript
export default app;
```

5. **Database File**

This requires using the Mongoose Plugin to connect the project to the database (MongoDB Atlas)

- Open the `constants` directory
- Add a new file named `database.js`
- Install Mongoose plugin

```bash
npm i mongoose
```

- Import Mongoose plugin into `database.js`

```javascript
import mongoose from "mongoose";
```

- Write an async function to create the database connection using `try & catch` method

```javascript
// Create a function to connect the database using the provided URI
const connectDatabase = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}`,
    );
    console.log(
      `\n MongoDB connected successfully: ${connectionInstance.connection.host}`,
    );
  } catch (error) {
    console.error(`Error connecting to the database: ${error.message}`);
    process.exit(1); // Exit the process with an error code
  }
};
```

- Export the `connectDatabase()` function

```javascript
export default connectDatabase();
```

6. **Index/Server File**
   This is an important file that starts your backend services

- Create a new file named `index.js` in `src` directory
- Decalare the PORT for the server as an environment variable, update `.env` with:

```javascript
PORT = 5000;
```

- Install the Dotenv plugin

```bash
npm i dotenv
```

- Configure the environment variable path

```javascript
// Import dotenv to load environment variables from a .env file
import dotenv from "dotenv";

// Configure dotenv to load variables from the .env file
dotenv.config({
  path: "./.env",
});
```

- Configure database connection to the server

```javascript
// Import the connectDatabase function from the database configuration file
import connectDatabase from "./config/database.js";
```

- Import Express App from `app.js`

```javascript
// Import the express application instance from the app.js file
import app from "./app.js";
```

- Store the PORT in a variable

```javascript
// Start the server and listen on the specified port
const PORT = process.env.PORT || 8000;
```

- Create an async function to initialize the server

```javascript
// Create an asynchronous function to initialize the application server and connect to the database
const startServer = async () => {
  try {
    // Connect to the database using the connectDatabase function
    await connectDatabase();

    // Turn on the application for the database
    app.on("error", (error) => {
      console.error("Error starting the server:", error);
      throw error; // Rethrow the error to be caught by the outer try-catch block
    });

    // Start the server and listen on the specified port
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
  }
};
```

- Instantiate/call `startServer()` the function

```javascript
// Call the startServer function to initiate the server and database connection
startServer();
```

## Starting the Server

- Install Nodemon for auto reload of the server

```bash
npm i nodemon
```

- Configure the CLI in the `package.jason` `script` object

```javascript
"dev": "nodemon src/index.js"
"start": "node src/index.js"
```

- RUN: `npm run dev`

## Writing APIs

API means Application Programming Interface, it's a kind of system data with structure such routes, controllers and models.
In this project, there's need to write "authentication" and "CRUD" APIs
The "Login", "Register" and the "Logout" are the basic Auth APIs we need for this project.

**Model**
What is a model? A model is the code version of the data needed on the website.
Model defines "schemas" and schemas are basically structures.

**ER Diagram**
An ER Diagram is a visual map/design showing two things:

1. What kind of data exists in our system
2. How they relate to each other

**Example of a ER Diagram**

- Users Model
- \_id - string // We only configure the `id` cos it's generated by the database
- username - string
- email - string
- password - string
- createdAt - dateTime // Auto generated by the server

- Post Model
- \_id - string
- username - string
- email - string
- password - string
- createdAt - dateTime // Auto generated by the server
- updatedAt - dateTime

- The "Users" and the "Post" models are the only data needed for this project therefore "model" stands for "data"

## Creating a Model

- Created a folder named `model` in the `src` directory
- Create a new file for each data as:
  - users.model.js
  - posts.model.js
- Import the `Mongoose` module and `{Schema}` from `mongoose`

```javascript
import mongoose, { Schema } from "mongoose";
```

- Create the schema as designed in the ER Diagram for users
- Use the `Schema` class and provide the properties needed
  > _Each property is written as an object_
- The Schema is then saved in a variable

```javascript
const userSchema = new Schema{...}
```

> > Each property contains the options that defines it

```javascript
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      minlength: 1,
      maxlength: 30,
    }
```

> \_The `timestamp` object would be the second object in the usser schema

```javascript
const userSchema = new Schema{{data-properties}, {timestamps}};
```

HINT: Write for all the properties except `_id` which will be generated by the database

- Export the structure/schema as a variable

```javascript
export const User = mongoose.model("User", userSchema);
```

## Routes

Routes are like address book, whenever a user requests something on a website - the route request needs a path to go on

- Create `routes` folder in the `src` folder
- Add `user.route.js` file to the `routes` folder for `users`
- Import `{Router}` from `express`

```javascript
import { Router } from "express";
```

- Create an instance of a route and save in a variable

```javascript
const router = Router();
```

- Export the new instance for usablility

```javascript
export default router;
```

## Controllers

Controllers decides what kind of response comes back from a request whenever a request is made through a particular route

- Add a new `controller` folder to the `src` folder
- Create a new file for `users` controller in the `controller` directory as `user.controller.js`
- Import the user-model-schema to design the controller blueprint

```javascript
import { User } from "../models/user.model.js";
```

- Create an async function to "register" users, with both `req` and `res` as the parameters and use `try & catch` for the logics
- Save the essential data as designed in the model in a variable
- Add some basic validation to comfirm if the data is provided correctly:
  - Check if user already exists
- Create a new user
- Send response to the new user
- Catch the error
- Export the `resgisterUser` async function as one of the items

```javascript
export default { registerUser };
```
