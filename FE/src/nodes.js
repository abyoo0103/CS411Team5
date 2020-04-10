const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();

app.use(cors());

let db = new sqlite3.Database('sequitur_accounts.db', (err) => {
	if (err) {
		console.error(err.message);
	}
	console.log('Connected to database');
});


 
app.get('/register/add', (req, res) => {
	const {username, password} = req.query;
	db.run(`INSERT INTO Account(username, password) VALUES(?,?)`, [username, password], function(err) {
   	 if (err) {
      		return console.log(err.message);
   	 }
    	// get the last insert id
   		console.log(`A row has been inserted`);
  	});
});

app.get('/write/delete', (req, res) => {
const {username} = req.query;
db.run(`DELETE FROM Account WHERE username=?`, username, function(err) {
    if (err) {
        return console.error(err.message);
    }
    console.log(`Row(s) deleted`);
});
});

apt.get('/write/update', (req, res) => {
const {the_username, new_password} = req.query;
let data = [the_username, new_password]
db.run(`UPDATE Account SET password=? WHERE username=?`, data, function(err) {
    if (err) {
        return console.error(err.message);
    }
    console.log(`Row changed`);
});
});

app.listen(3000, () => {
	console.log('listening on server');
});
