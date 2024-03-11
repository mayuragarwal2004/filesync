const {
  createUser,
  validateUser,
  readUserByUId,
  readUserByPhone,
  existUser,
} = require("../models/users/user.queries.sql");

const userReadController = async (req, res) => {
  console.log(req.body);
  let { user_id, phone } = req.body;
  if (!user_id && !phone) {
    return res.status(400).send("Insufficient inputs");
  }
  if (user_id) {
    userObj = await readUserByUId(user_id);
  } else if (phone) {
    userObj = await readUserByPhone(phone);
  }

  if (userObj == -1) {
    return res.status(500).send("Error fetching user");
  }
  if (!userObj) {
    return res.status(404).send("User not found");
  }
  return res.status(200).send(userObj);
};

const userCreateController = async (req, res) => {
  let uItem = req.body;
  let vU = await validateUser(uItem);
  if (!uItem || vU == 0) {
    return res.status(400).send("Insufficient / Incorrect inputs");
  }
  switch (vU) {
    case -1:
      return res.status(500).send("Error validating User");
    case -2:
      return res.status(409).send("User already Exists");
  }
  let uObj = await createUser(uItem);
  if (uObj == -1) {
    return res.status(500).send("Error creating User");
  }
  return res.status(200).send(uObj);
};

const userExistController = async (req, res) => {
  let uItem = req.body;
  let vU = await existUser(uItem);
  if (!uItem || vU == 0) {
    return res.status(400).send("Insufficient inputs");
  }

  switch (vU) {
    case 1:
      return res.status(200).send({ exists: true }); // User exists
    case 2:
      return res.status(200).send({ exists: false }); // User does not exists
    case -2:
      return res.status(500).send("Error finding User 1");
    case -1:
      return res.status(500).send("Internal Server Error");
  }
  return res.status(500).send("Error finding User 2");
};

module.exports = {
  userCreateController,
  userReadController,
  userExistController,
};
