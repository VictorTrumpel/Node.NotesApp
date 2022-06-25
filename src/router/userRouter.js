const { Router } = require("express");
const bodyParser = require("body-parser");
const userController = require("../controllers/user/userController");

const userRouter = Router();

userRouter.post("/signup", bodyParser.urlencoded({ extended: true }), userController.signup);

userRouter.post("/login", bodyParser.urlencoded({ extended: true }), userController.login);

userRouter.get("/logout", bodyParser.urlencoded({ extended: true }), userController.logout);

module.exports.userRouter = userRouter;
