// Created the user model.

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String
  },
  lastname: {
    type: String
  },
  email: {
    type: String
  },
  age: {
    type: Number
  },
  password: {
    type: String
  },
  profilePicture: {
    type: Buffer
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
