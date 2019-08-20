const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = async (req, res, next) => {
  try {
    //Get token, if it exists in the request header. If so, it means that the user was logged in previously.
    console.log(req);
    const token = req.header("Authorization").replace("Bearer ", "");
    //Decode the token in the header - Remember that this token will include the user's ID as well.
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Find a user that has the id provided by the token and also verify that that token is still part of that user's token array.
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token
    });

    // If there is no user or the user hasn't been authenticated by the token provided, throw error and the catch strand will run.
    if (!user) {
      throw new Error();
    }
    // Store the user and token in the request
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate" });
  }
};

module.exports = auth;
