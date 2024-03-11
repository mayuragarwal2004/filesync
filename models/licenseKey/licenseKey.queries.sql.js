const { runQuery } = require("../../connection.sql");

async function readLicenseKey(license_key) {
  try {
    queryResult = await runQuery(
      `SELECT * FROM License_keys WHERE license_key= '${license_key}';`
    );
    return queryResult[0];
  } catch (error) {
    console.log(error);
    return -1;
  }
}

const createLicenseKey = async (obj) => {
  const {user_id, expiry_date, license_key, key_name} = obj;
  console.log({user_id, expiry_date, license_key});

  try {
    const queryResult = await runQuery(
      `INSERT INTO License_keys
      (license_key, user_id, key_name, expiry_date) 
      VALUES 
      ('${license_key}', '${user_id}', '${key_name}', '${expiry_date}');
       `
    );
    console.log(queryResult);
    return queryResult[0];
  } catch (error) {
    console.log(error);
    return -1;
  }
};

module.exports = {
  createLicenseKey,
  readLicenseKey,
};
