const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
var pyshell = require('python-shell');
var fs = require('fs');

const app = express();
app.use(cors());
app.options('*', cors());

// Open/connect to disk file database (sequitur_accounts)
let db = new sqlite3.Database('sequitur_accounts.db', (err) => {
	if (err) {
		console.error(err.message);
	}
	console.log('Connected to database');
});

//Displays all accounts (usernames and passwords)
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

//app.get('recommendations/select', (req, res) => {
//  RUN PYTHON SCRIPT
//}
//
//Checks if username exists
app.get('/accounts/exists', (req, res) => {
	const {username} = req.query;
	const SELECT_ACCOUNT_BY_USERNAME_QUERY = `SELECT * FROM Account WHERE username='${username}'`;
	db.get(SELECT_ACCOUNT_BY_USERNAME_QUERY, function(err, results) {
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

//Selects account (returns username and password)
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
 
//Insert row into Account table (register account)
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

//Delete account from Account table
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

//Update password
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

//Update survey results
app.get('/accounts/survey', (req, res) => {
	const {username, medicine, science, math, engineering} = req.query;
	const UPDATE_ACCOUNT_QUERY = `UPDATE Account SET medicine='${medicine}', science='${science}', math='${math}', engineering='${engineering}' WHERE username='${username}'`;
	db.run(UPDATE_ACCOUNT_QUERY, function(err) {
	    if (err) {
		return console.error(err.message);
	    }
	    console.log(`Row changed`);
	});
});

//Display followed authors for user (join with Account and Follows)
app.get('/accounts/following', (req, res) => {
    const {username} = req.query;
    //const SELECT_FOLLOWING_QUERY = `SELECT author_id FROM Follows NATURAL JOIN Account GROUP BY author_id HAVING username='${username}'`;
    const SELECT_FOLLOWING_QUERY = `SELECT author_id, name FROM Author WHERE author_id IN (SELECT author_id FROM Follows NATURAL JOIN Account GROUP BY author_id HAVING username='${username}')`;

    db.all(SELECT_FOLLOWING_QUERY, function(err, results) {
        //Write to a file using f.writeFile(filename, results)
        if (err) {
      		return console.log(err.message);
   	    }
        else{
            console.log(results)
            author_ids = res.send(results)
        }
   	    console.log(`A row has been selected`);
    });
});

//Displays all authors (author_id and author name)
app.get('/authors', (req, res) => {
	const SELECT_ALL_AUTHORS_QUERY = `SELECT * FROM Author`;
	db.all(SELECT_ALL_AUTHORS_QUERY, function(err, results) {
        if (err) {
                return console.log(err.message);
        }
        else{
                console.log(results);
                return res.send(results);
        }
    });
});

//Add author row into Author table
app.get('/authors/insert', (req, res) => {
	const {author_id, author_name} = req.query;
	const INSERT_AUTHOR_QUERY = `INSERT INTO Author(username, author_name) VALUES('${username}', '${author_name}')`;
	db.run(INSERT_AUTHOR_QUERY, function(err) {
   	if (err) {
        return console.log(err.message);
   	}
    // get the last insert id
   	console.log(`A row has been inserted`);
  	});
});

//Displays all follows (username and author_id)
app.get('/follows', (req, res) => {
	const SELECT_ALL_FOLLOWS_QUERY = `SELECT * FROM Follows`;
	db.all(SELECT_ALL_FOLLOWS_QUERY, function(err, results) {
        if (err) {
                return console.log(err.message);
        }
        else{
                console.log(results);
                return res.send(results);
        }
    });
});

//Add follow row into Follows table (user follows author)
app.get('/follows/insert', (req, res) => {
	const {username, author_id} = req.query;
	const INSERT_FOLLOW_QUERY = `INSERT INTO Follows(username, author_id) VALUES('${username}', '${author_id}')`;
	db.run(INSERT_FOLLOW_QUERY, function(err) {
   	if (err) {
        return console.log(err.message);
   	}
    // get the last insert id
   	console.log(`A row has been inserted`);
  	});
});

//Delete row in Follows table (user unfollows author)
app.get('/follows/delete', (req, res) => {
	const {username, author_id} = req.query;
	const DELETE_FOLLOW_QUERY = `DELETE FROM Folllows WHERE username='${username}' AND author_id='${author_id}'`;
	db.run(DELETE_FOLLOW_QUERY, function(err) {
	    if (err) {
		return console.error(err.message);
	    }
	    console.log(`Row(s) deleted`);
	});
});

//Runs Python script with input (author_id)
app.get('/recommendations/insert', (req, res) => {
    const {username} = req.query;
    const SELECT_FOLLOWING_QUERY = `SELECT author_id, name FROM Author WHERE author_id IN (SELECT author_id FROM Follows NATURAL JOIN Account GROUP BY author_id HAVING username='${username}')`;
    const SELECT_SURVEY_QUERY = `SELECT medicine, science, math, engineering FROM Account WHERE username='${username}'`;
    const DELETE_QUERY = `DELETE FROM Recommendation WHERE username='${username}'`;
    var author_ids = [];
    var surveyResults = [];
    var test = 'hello';

    db.get(DELETE_QUERY, function(err, results) {
      if(err){
        return console.log(err.message);
      }
      else{
        console.log('Recommendation cleared');
      }
    });
    db.get(SELECT_FOLLOWING_QUERY, function(err, results) {
        //Write to a file using f.writeFile(filename, results)
        if (err) {
      		return console.log(err.message);
   	    }
        else{
            console.log(results);
            fs.writeFile('following.json', JSON.stringify(results), function(err, result) {
              if(err) console.log(err.message)
            });
        }
   	    console.log(`A row has been selected1`);
    });

    db.get(SELECT_SURVEY_QUERY, function(err, results) {
        //Write to a file using f.writeFile(filename, results)
        if (err) {
      		return console.log(err.message);
   	    }
        else{
            console.log(results);
            fs.writeFile('survey.json', JSON.stringify(results), function(err, result) {
              if(err) console.log(err.message)
            });
        }
   	    console.log(`A row has been selected2`);
    });
    console.log(test);

    //RUN PYTHON SCRIPT
    var options = {
        scriptPath: '.',
    };
    pyshell.PythonShell.run('recommender.py', options, function (err, results) {
        if (err) {
            return console.log(err.message);
        }
        console.log('results: %j', results);
        for(i=0; i<10; i++){
          INSERT_QUERY = `INSERT INTO Recommendation(paper_id, title, username) VALUES('${results[i*3]}','${results[i*3+1]}','${username}')`;
          db.get(INSERT_QUERY, function(err1, results1){
            if(err1) {
              return console.log(err1.message);
            }
            else{
              console.log('inserted baby');
            }
          });
        }
    });

});

app.get('/recommendations/select', (req, res) => {
  const {username} = req.query;
  SELECT_QUERY = `SELECT * FROM Recommendation WHERE username='${username}'`;
  db.all(SELECT_QUERY, function(err1, results1){
    if(err1){
      return console.log(err1.message);
    }
    else{
      console.log(results1)
    }
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
