const express = require("express");
const router = new express.Router();
const User = require("../models/user");

//Signup user
router.post("/users", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.send(400).send(error);
  }
});

module.exports = router;
