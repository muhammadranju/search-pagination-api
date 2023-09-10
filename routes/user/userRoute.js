const user = require("express").Router();
const authController = require("../../controller/user/userController");
user.post("/auth/login", authController.userLoginPostController);
user.post("/auth/signup", authController.userSignupPostController);

module.exports = user;
