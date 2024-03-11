const { runQuery } = require("../../connection.sql");

async function validateEmail(email) {
  var validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (!email.match(validRegex)) {
    
    return false;
  }

  try {
    queryResult = await runQuery(
      `SELECT * FROM User WHERE email = '${email}';`
    );

    if (queryResult[0]) {
      return false;
    }

    return true;
  } catch (error) {
    console.log(err);
    return -1;
  }
}

const readUserByPhone = async (phone) => {
  try {
    queryResult = await runQuery(
      `SELECT * FROM User WHERE phone= '${phone}';`
    );
    console.log({queryResult})
    return queryResult[0];
  } catch (error) {
    console.log(err);
    return -1;
  }
};

const readUserByUId = async (user_id) => {
  try {
    queryResult = await runQuery(
      `SELECT * FROM User WHERE user_id='${user_id}'; `
    );
    console.log({queryResult})
    return queryResult[0];
  } catch (error) {
    console.log(err);
    return -1;
  }
};

const existUser = async (uItem) => {
  if (uItem.phone) {
    try {
      var userExists = 0;
  
      const queryResult = await runQuery(
        `SELECT count(*) FROM User WHERE phone= "${uItem.phone}"`
      ).then((result) => {
        userExists = result[0]["count(*)"] > 0 ? 1 : 2;
      });
      if (userExists != 0) {
        return userExists;
      }
      return -1;
    }
    catch (err) {
      console.log(err);
      return -2;
    }  
  }

  else if (uItem.user_id) {
    try {
      var userExists = 0;
  
      const queryResult = await runQuery(
        `SELECT count(*) FROM User WHERE user_id= "${uItem.user_id}"`
      ).then((result) => {
        userExists = result[0]["count(*)"] > 0 ? 1 : 2;
      });
      if (userExists != 0) {
        return userExists;
      }
      return -1;
    }
    catch (err) {
      console.log(err);
      return -2;
    }
  }

  else {
    return 0;
  }
};

const validateUser = async (uItem) => {
  if (
    !uItem.user_id ||
    !uItem.firstName ||
    !uItem.lastName ||
    !uItem.phone ||
    !(
      uItem.phone.match(
        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
      ) && uItem.phone[0] == "+"
    )
  ) {
    return 0;
  }
  if (uItem.email && !(await validateEmail(uItem.email))) {
    return 0;
  }
  let existUser = await readUserByPhone(uItem.phone);
  let existUser2 = await readUserByUId(uItem.user_id);
  if (existUser == -1 || existUser2 == -1) {
    return -1;
  } else if (existUser || existUser2) {
    return -2;
  }

  return 1;
};

const createUser = async (uItem) => {
  const {
    user_id,
    firstName,
    lastName,
    middleName,
    email,
    phone,
  } = uItem;
  let sql_middle_name = middleName ? ", middle_name" : "";
  let main_middle_name = middleName ? `, '${middleName}' ` : "";

  try {
    const queryResult = await runQuery(
      `INSERT INTO User
      (user_id, first_name, last_name ${sql_middle_name}, email, phone) 
      VALUES 
      ('${user_id}', '${firstName}', '${lastName}' ${main_middle_name} , '${email}', '${phone}');
       `
    );
    return uItem;
  } catch (err) {
    console.log(err);
    return -1;
  }
};

module.exports = {
  createUser,
  validateUser,
  readUserByPhone,
  readUserByUId,
  existUser,
};
