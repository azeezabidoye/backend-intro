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
   This file stores and shares the important values of your project
