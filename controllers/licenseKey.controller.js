const {
  readLicenseKey,
  createLicenseKey,
} = require("../models/licenseKey/licenseKey.queries.sql");
const {
  createUser,
  validateUser,
} = require("../models/users/user.queries.sql");

const licenseKeyAuthController = async (req, res) => {
  let { license_key } = req.query;
  if (!license_key) {
    return res.status(400).send("Insufficient inputs");
  }
  let licenseKeyObj = await readLicenseKey(license_key);
  if (licenseKeyObj == -1) {
    return res.status(500).send("Error validating License Key");
  }
  if (!licenseKeyObj) {
    return res
      .status(401)
      .json({ authenticated: false, error: "Invalid License key" });
  }

  if (
    new Date(licenseKeyObj.expiry_date) < new Date() ||
    !new Date(licenseKeyObj.expiry_date)
  ) {
    return res
      .status(401)
      .json({ authenticated: false, error: "License key expired" });
  }

  return res.status(200).json({ authenticated: true });
};

const licenseKeyCreateController = async (req, res) => {
  let { user_id, expiry_date, key_name } = req.body;

  console.log({ user_id, expiry_date });

  if (!user_id || !expiry_date || !key_name) {
    return res.status(400).send("Insufficient inputs");
  }

  let license_key =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
  console.log({ license_key });
  let licenseKeyObj = await readLicenseKey(license_key);

  console.log({ licenseKeyObj });

  if (licenseKeyObj || licenseKeyObj == -1) {
    return res.status(500).send("Error creating License Key");
  }

  let newLicenseKeyObj = await createLicenseKey({
    license_key,
    user_id,
    expiry_date,
    key_name,
  });
  if (newLicenseKeyObj == -1) {
    return res.status(500).send("Error creating License Key");
  }
  return res.status(200).send(newLicenseKeyObj);
};

module.exports = {
  licenseKeyCreateController,
  licenseKeyAuthController,
};
