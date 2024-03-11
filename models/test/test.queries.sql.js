const { runQuery } = require("../../connection.sql");
var mysql = require("mysql");

const testSQL = async () => {
  try {
    const queryResult = await runQuery(`SELECT * FROM Test;`);
    return queryResult;
  } catch (err) {
    console.log(err);
    return err;
  }
};

// module.exports = { createUser, getMId, validateUser, readUser };
module.exports = { testSQL };
