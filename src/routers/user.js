const express = require("express");
const router = new express.Router();
const User = require("../models/user");

//Create user
router.post("/users", async (req, res) => {
  const user = new User(req.body);

  try {
    const response = await user.save();

    res.status(201).send(response);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
