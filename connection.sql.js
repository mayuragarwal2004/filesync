const mysql = require("mysql");
require("dotenv").config({ path: "./.env" });

const host = process.env.MYSQL_HOST_NAME;
const port = process.env.MYSQL_PORT; // Define the port from your environment variables
const user = process.env.MYSQL_USER_NAME;
const password = process.env.MYSQL_PASSWORD;
const database = process.env.MYSQL_DB_NAME;

const dbConfig = {
  host,
  user,
  password,
  port,
  database,
  dateStrings: 'date'
};

// Create a MySQL pool
const pool = mysql.createPool(dbConfig);

// Function to handle fatal errors
const handleFatalError = (err) => {
  console.error("Fatal error: ", err.message);
  process.exit(1);
};

// Handle uncaught exceptions
process.on("uncaughtException", handleFatalError);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection: ", err.message);
});

// Function to execute queries
const runQuery = (query, params = []) => {
  return new Promise((resolve, reject) => {
    // Get a connection from the pool
    pool.getConnection((err, connection) => {
      if (err) {
        return reject(err);
      }

      // Execute the query
      connection.query(query, params, (queryErr, results) => {
        // Release the connection back to the pool
        connection.release();

        if (queryErr) {
          return reject(queryErr);
        }

        resolve(results);
      });
    });
  });
};

// Function to run a transaction
const runTransaction = async (queries) => {
  return new Promise(async (resolve, reject) => {
    let connection = await new Promise((resolve, reject) => {
      pool.getConnection((err, conn) => {
        if (err) {
          reject(err);
        } else {
          resolve(conn);
        }
      });
    });

    try {
      // Start the transaction
      await connection.beginTransaction();

      // Execute each query in the transaction
      for (const { query, params } of queries) {
        await new Promise((resolve, reject) => {
          // Execute the query
          connection.query(query, params, (queryErr, results) => {
            if (queryErr) {
              return reject(queryErr);
            }
            resolve(results);
          });
        });
      }

      // Commit the transaction if all queries are successful
      await connection.commit();

      resolve({
        state: "success",
        message: "Transaction successfully committed",
      });

      console.log("Transaction successfully committed");
    } catch (error) {
      // Rollback the transaction if any error occurs
      if (connection) {
        await connection.rollback();
      }
      console.error("Transaction rolled back due to an error:", error);
      reject({
        state: "error",
        message: "Transaction rolled back due to an error",
        error: error,
      });
    } finally {
      // Release the connection back to the pool
      connection.release();
    }
  });
};

// Close the MySQL pool on process exit
process.on("exit", () => {
  pool.end((err) => {
    if (err) {
      console.error("Error closing the MySQL pool: ", err.message);
    }
  });
});

const transactionQueryBuilder = (query, params = []) => {
  return { query, params };
};

module.exports = {
  runQuery,
  runTransaction,
  transactionQueryBuilder,
};
