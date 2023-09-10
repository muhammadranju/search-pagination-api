const User = require("../../models/userModel/User");

// User signup function (POST method)
const userSignupPostController = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).send({ error: "filled are required" });
    }
    const findEmail = await User.findOne({ email });
    if (findEmail) {
      return res.status(400).send({ error: "email already exists" });
    }
    const userData = new User({ username, email, password });
    await userData.save();
    return res.status(201).send({ userData });
  } catch (error) {
    next(error);
  }
};

//TODO: User signup function (POST method)
const userLoginPostController = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

module.exports = {
  userSignupPostController,
  userLoginPostController,
};
