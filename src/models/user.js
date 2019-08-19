// Create the user model.

const mongoose = require("mongoose");
onst validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
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
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
