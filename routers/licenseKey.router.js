const express = require("express");
const {
  licenseKeyCreateController,
  licenseKeyAuthController,
} = require("./../controllers/licenseKey.controller");
const licenseKeyRouter = express.Router();

// @route Post /api/key/create
// @desc Create License Key
// @access Signed Up User
licenseKeyRouter.post("/create", licenseKeyCreateController);

// @route Post /api/key/read
// @desc Authenticate License Key
// @access
licenseKeyRouter.get("/auth", licenseKeyAuthController);

module.exports = licenseKeyRouter;
