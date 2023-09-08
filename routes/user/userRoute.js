const user = require("express").Router();
const authCon = require("../../controller/user/userController");
user.post("/auth/login", authCon.userLoginPostController);
user.post("/auth/signup", authCon.userSignupPostController);

module.exports = user;
