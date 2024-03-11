const { runQuery } = require("../../connection.sql");
var mysql = require("mysql");

const testSQL = async () => {
  try {
    const queryResult = await runQuery(`CREATE TABLE filesync.User (
      user_id VARCHAR(255) PRIMARY KEY,
      first_name VARCHAR(255) NOT NULL,
      last_name VARCHAR(255) NOT NULL,
      middle_name VARCHAR(255),
      email VARCHAR(255) NOT NULL UNIQUE,
      phone VARCHAR(20) NOT NULL UNIQUE,
      created_datetime DATETIME DEFAULT CURRENT_TIMESTAMP,
      last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      last_active_datetime DATETIME
    );`);
    await runQuery(`
    CREATE TABLE filesync.License_keys (
      license_key VARCHAR(255) PRIMARY KEY,
      key_name VARCHAR(255) NOT NULL,
      user_id VARCHAR(255) NOT NULL,
      expiry_date DATETIME NOT NULL,
      created_datetime DATETIME DEFAULT CURRENT_TIMESTAMP,
      last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES User(user_id)
    );`);
    return queryResult;
  } catch (err) {
    console.log(err);
    return err;
  }
};

// module.exports = { createUser, getMId, validateUser, readUser };
module.exports = { testSQL };
