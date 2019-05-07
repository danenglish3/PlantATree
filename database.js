var mysql = require('mysql');

// Change this info to what your local DB connection info is
var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'password',
    database: 'plantatree',
});

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

