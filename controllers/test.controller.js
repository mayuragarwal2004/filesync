const { testSQL } = require("../models/test/test.queries.sql");

const testController = async (req, res) => {
  const data = await testSQL();
  return res.status(200).send(data);
};

const testServerController = async (req, res) => {
  return res.status(200).send("Serve is running");
};

module.exports = {
  testController,
  testServerController
};
