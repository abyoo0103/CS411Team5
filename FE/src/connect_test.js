const sqlite3 = require('sqlite3').verbose();

let dbName = 'sequitur_accounts.db';

// open the database
let db = new sqlite3.Database(dbName, sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the sequitur_accounts database.');
});

sql = `SELECT DISTINCT username FROM Account ORDER BY username`;

db.all(sql, [], (err, rows) => {
  if (err) {
    throw err;
  }
  rows.forEach((row) => {
    console.log(rows.name);
  });
});

// close the database
db.close((err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Closed the database connection.');
});
