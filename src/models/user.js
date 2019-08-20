// Create the user model.

const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true
    },
    lastName: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid.");
        }
      }
    },
    age: {
      type: Number
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 7,
      validate(value) {
        if (validator.contains(value, "password")) {
          throw new Error("The password cannot contain the word 'password'");
        }
      },
      tokens: [
        {
          token: {
            type: String,
            required: true
          }
        }
      ]
    },
    profilePicture: {
      type: Buffer
    }
  },
  { timestamps: true }
);

// Hash password before saving user
userSchema.pre("save", async function(next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});


const User = mongoose.model("User", userSchema);

module.exports = User;
