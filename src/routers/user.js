const express = require("express");
const router = new express.Router();
const User = require("../models/user");

//Create user
router.post("/users", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    const token = await user.generateAuthToken();

    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

// //Get user
// router.get("/users/me", async(req, res) => {
//   const user = await User.findById()
// })

module.exports = router;
