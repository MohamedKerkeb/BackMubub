require("dotenv").config();
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: "mubub",
  multipleStatements: true,
  connectlimit: 0
});

connection.connect(() => {
  if (err) {
    throw err;
  }
  console.log("Connected");
});
