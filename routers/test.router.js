const express = require("express");
const {
  testController,
  testServerController,
} = require("./../controllers/test.controller");
const userRouter = express.Router();

// @route Post /api/test/sql
// @desc Testing My SQL Connection
// @access Everyone
userRouter.get("/sql", testController);

// @route Post /api/test/server
// @desc Testing My Server Connection
// @access Everyone
userRouter.get("/server", testServerController);

module.exports = userRouter;
