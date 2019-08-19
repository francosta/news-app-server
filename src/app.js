// This file sets up the express application

// We do not want to have all of this in the same file as what is in index.js because we want to be able to export app.js without the listen method (which is in index.js).
// Otherwise we would not be able to set up tests that made requests without them actually being 'heard' by the server.

const express = require("express");
require("./db/mongoose");
// const userRouter = require("./routers/user");
// const taskRouter = require("./routers/task");

const app = express();

// Middleware functions

// These funtions are middleware that comes with Express.
app.use(express.json());
// app.use(userRouter);
// app.use(taskRouter);

module.exports = app;
