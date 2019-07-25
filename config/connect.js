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

module.exports = connection;

// module.exports = connection.connect(err => {
//   if (err) {
//     console.log("Error connecting to Database");
//     return;
//   }
//   console.log("You are connected");
// });

// connection.end(err => {
//   console.log(err);
// });
