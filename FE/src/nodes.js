const express = require('express');
//const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
//app.use(cors());


// Open/connect to disk file database (sequitur_accounts)
let db = new sqlite3.Database('sequitur_accounts.db', (err) => {
	if (err) {
		console.error(err.message);
	}
	console.log('Connected to database');
});

app.get('/accounts', (req, res) => {
	const SELECT_ALL_ACCOUNTS_QUERY = `SELECT * FROM Account`;
	db.all(SELECT_ALL_ACCOUNTS_QUERY, function(err, results) {
        if (err) {
                return console.log(err.message);
        }
        else{
                console.log(results);
                return res.send(results);
        }
        // get the last insert id
        console.log(`A row has been selected`);
        });
});

app.get('/accounts/exists', (req, res) => {
	const {username, password} = req.query;
	const SELECT_ACCOUNT_QUERY = `SELECT EXISTS (SELECT * FROM Account WHERE username='${username}' AND password='${password}')`;
	db.get(SELECT_ACCOUNT_QUERY, function(err, results) {
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

app.get('/accounts/select', (req, res) => {
	const {username, password} = req.query;
	const SELECT_ACCOUNT_QUERY = `SELECT * FROM Account WHERE username='${username}' AND password='${password}'`;
	db.get(SELECT_ACCOUNT_QUERY, function(err, results) {
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
 
app.get('/accounts/insert', (req, res) => {
	const {username, password} = req.query;
	const INSERT_ACCOUNT_QUERY = `INSERT INTO Account(username, password) VALUES('${username}', '${password}')`;
	db.run(INSERT_ACCOUNT_QUERY, function(err) {
   	 if (err) {
      		return console.log(err.message);
   	 }
    	// get the last insert id
   		console.log(`A row has been inserted`);
  	});
});

app.get('/accounts/delete', (req, res) => {
	const {username} = req.query;
	const DELETE_ACCOUNT_QUERY = `DELETE FROM Account WHERE username='${username}'`;
	db.run(DELETE_ACCOUNT_QUERY, function(err) {
	    if (err) {
		return console.error(err.message);
	    }
	    console.log(`Row(s) deleted`);
	});
});

app.get('/accounts/update', (req, res) => {
	const {username, new_password} = req.query;
	const UPDATE_ACCOUNT_QUERY = `UPDATE Account SET password='${new_password}' WHERE username='${username}'`;
	db.run(UPDATE_ACCOUNT_QUERY, function(err) {
	    if (err) {
		return console.error(err.message);
	    }
	    console.log(`Row changed`);
	});
});

	    
app.get('/write/follows', (req, res) => {
	const {author_id} = req.query;
	const FOLLOW_COUNT_QUERY = `SELECT count(*) FROM Follows NATURAL JOIN Authors GROUP BY author_id='${author_id}' HAVING author_id=author_id`;
	db.run(FOLLOW_COUNT_QUERY, function(err) {
	    if (err) {
		return console.error(err.message);
	    }
	    console.log(`Natural Join successful`);
	});
});

app.get('/', (req, res) => {
	res.send('hello from the sequitur server')
});

app.listen(3001, () => {
	console.log('listening on server');
});

// Close the database connection
/*
db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Close the database connection.');
});
*/
