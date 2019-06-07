/*eslint linebreak-style: ["error", "windows"]*/
// Set up MySQL connection.
require("dotenv").config();
var mysql = require("mysql");
var keys = require("../keys");
var event = keys.event;

if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: event.password,
    database: "events_db"
  });
}
// Make connection.
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// Export connection for our ORM to use.
module.exports = connection;
