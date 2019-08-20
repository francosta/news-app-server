const express = require("express");
const router = new express.Router();
const User = require("../models/user");
const auth = require("../middleware/auth");

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

//Login user
router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();

    res.send({ user, token });
  } catch (error) {
    res.status(400).send();
  }
});

//Logout user
router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      token => token.token !== req.token
    );
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send(error);
  }
});

//Get user
router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});

//Update user
router.patch("/users/me", auth, async (req, res) => {
  const user = req.user;
  const updates = Object.keys(req.body);
  const allowedUpdates = ["firstName", "lastName", "email", "age", "password"];
  const isAllowedUpdate = updates.every(update =>
    allowedUpdates.includes(update)
  );

  if (!isAllowedUpdate) {
    return res
      .status(400)
      .send({ error: "The property updated cannot be changed." });
  }

  try {
    updates.forEach(update => (user[update] = req.body[update]));
    await user.save();
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

//Delete user
router.delete("/users/me", auth, async (req, res) => {
  try {
    await req.user.remove();
    res.status(200).send(req.user);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
