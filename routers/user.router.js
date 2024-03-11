const express = require("express");
const {
  userCreateController,
  userReadController,
  userExistController,
} = require("./../controllers/user.controller");
const userRouter = express.Router();

// @route Post /api/user/create
// @desc Create user
// @access Everyone
userRouter.post("/create", userCreateController);

// @route Post /api/user/read
// @desc Read user
// @access
userRouter.post("/read", userReadController);

// @route Post /api/user/userexist
// @desc Exist user
// @access
userRouter.post("/userexist", userExistController);

module.exports = userRouter;
