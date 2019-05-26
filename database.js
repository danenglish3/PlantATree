var mysql = require('mysql');

// Change this info to what your local DB connection info is
/*var connection = mysql.createConnection({
    host: 'us-cdbr-iron-east-02.cleardb.net',
    user: 'b88f5293251354',
    password: 'cd74d17e',
    database: 'heroku_92d94b814b5bd78',
});*/

var connection = mysql.createConnection(proces.env.JAWSDB_URL);


// Establishing connection to database using relevant information
connection.connect((err) => {
    if (err) throw err;
    console.log('Successfully connected to MySQL DB');
});

module.exports = connection;

var dbCheck = `SHOW TABLES`;
connection.query(dbCheck, (err, res) => {
    if (res.length === 0){
        var tables = require('./dbcreate');
        tables.createTables();        
    }
});

