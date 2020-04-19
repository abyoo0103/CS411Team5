const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();

//app.use(cors());

let db = new sqlite3.Database('sequitur_accounts.db', (err) => {
	if (err) {
		console.error(err.message);
	}
	console.log('Connected to database');
});

app.get('/write/read', (req, res) => {
	db.all(`SELECT * FROM Account`, function(err, results) {
   	 if (err) {
      		return console.log(err.message);
   	 }
    else{
      console.log(results)
      return res.send(results)
    }
    	// get the last insert id
   		console.log(`A row has been selected`);
  });
});
 

app.get('/register/read', (req, res) => {
	const {username, password} = req.query;
	db.get(`SELECT * FROM Account WHERE username=? AND password=?`, [username, password], function(err, results) {
    console.log(password)
   	 if (err) {
      		return console.log(err.message);
   	 }
    else{
      console.log(results)
      return res.send(results)
    }
    	// get the last insert id
   		console.log(`A row has been selected`);
  });
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

app.get('/write/update', (req, res) => {
const {username, password} = req.query;
let data = [password, username]
db.run(`UPDATE Account SET password=? WHERE username=?`, data, function(err) {
    if (err) {
        return console.error(err.message);
    }
    console.log(`Row changed`);
});
});

app.listen(3001, () => {
	console.log('listening on server');
});
