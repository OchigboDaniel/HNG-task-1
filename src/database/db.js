const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.join(__dirname, "./library.db");

const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, connected);

function connected(err) {
  if (err) {
    console.log(err.message);
    return;
  }
  console.log("connected to Database");
}

let sql = `CREATE TABLE books (
    id VARCHAR(4) PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    author VARCHAR(100) NOT NULL,
    genre VARCHAR(100) NOT NULL,
    publication_date DATE DEFAULT CURRENT_DATE,
    availability_status BOOLEAN DEFAULT TRUE
)`;

db.run(sql, [], (err) => {
  if (err) {
    console.log(err.message);
    return;
  }
  console.log("created table");
});

module.exports = db;
