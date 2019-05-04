var mysql = require('mysql');
//This file does not interact with the app.js file. But, it shows that the DB connection does not have to be in app.js

// Change this info to what your local DB connection info is
var connection = mysql.createConnection({
    host: '127.0.0.1:3306',
    user: 'root',
    password: '',
    database: 'plantatree',
    connectionLimit: 20,
    multipleStatements: true,
});

// Establishing connection to database using relevant information
connection.connect((err) => {
    if (err) throw err;
    console.log('Successfully connected to MySQL DB');
});

module.exports = connection; //Export the DB connection 
