const { runQuery } = require("../../connection.sql");

const testSQL = async () => {
  try {
    const queryResult = await runQuery(`SELECT NOW() AS current_timestamp;`);
    return queryResult;
  } catch (err) {
    console.log(err);
    return err;
  }
};

// module.exports = { createUser, getMId, validateUser, readUser };
module.exports = { testSQL };
