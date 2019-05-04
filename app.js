const express = require('express');
const mysql = require ('mysql');

//create Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'usercart'        //Remove this line to create DB and re-add to make the table
});

//connect to DB
db.connect((err) =>{
    if(err)
    {
        console.log('Error: '+ err);
    }
    console.log('My SQL connected!');
})

const app = express();

//Create DB
app.get('/createdb', (req, res) => //localhost:(your port)/createdb to execute this
{
    let sql = 'CREATE DATABASE usercart';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);    //Writes into console
        res.send('Database created!');   //Shows in browser page
    });
});

//create table
app.get('/createposttable', (req,res) =>{   //localhost:(your port)/createposttable to execute this
    let sql = 'CREATE TABLE cartid(id int AUTO_INCREMENT, productname VARCHAR(100), price INT(10), PRIMARY KEY (id))';
    db.query(sql, (err, result) =>{
        if(err) throw err;
        console.log(result);    //Writes into console
        res.send('Table created!');  //Shows in browser page
    });
})

//Insert into table
app.get('/addpost2', (req,res) =>{
    let post = {productname:'Orange tree', price:'35'};
    let sql = 'INSERT INTO cartid SET ?';     //? allows you to put the "post" var into query function
    let query = db.query(sql, post, (err, result) =>{
        if(err) throw err; // Error handling
        console.log(result);    //Writes into console
        res.send('Post 1 added!'); //Shows in browser page
    });
});

//Select posts
app.get('/getposts', (req,res) => {
    let sql = 'SELECT * FROM cartid';
    let query = db.query(sql, (err, results) =>{
        if (err) throw err;
        console.log(results); //Writes into console
        res.send('Post fetched!'); //Shows in browser page
    });
});

//get single post with id (PK)
app.get('/getpost/:id', (req, res) => {
    let sql = `SELECT * FROM cartid WHERE id = ${req.params.id}`;   // must use backticks(tilda key) when using variable info in queries
    let query = db.query(sql, (err, result) =>{
        if (err) console.log(err);
        console.log(result); //Writes into console
        res.send('Post fetched!'); //Shows in browser page
    });
});

//Updating a row in table
app.get('/updatepost/:id', (req, res) => {
    let newTree = 'Lemon tree';
    let sql = `UPDATE cartid SET productname = '${newTree}' WHERE id = ${req.params.id}`;   // must use backticks(tilda key) when using variable info in queries
    let query = db.query(sql, (err, result) => {
        if (err) throw err; //error handling
        console.log(result);
        res.send("cartid table updated!");
    })
})

//Delete data in a row
app.get('/deletepost/:id', (req, res) => {
    let sql = `DELETE FROM cartid WHERE id = ${req.params.id}`; // must use backticks(tilda key) when using variable info in queries
    let query = db.query(sql, (err, result) =>
    {
        if (err) throw err;
        console.log(result);
        res.send('Post deleted!');
    })
})




app.listen('3500', (req ,res) => {
    console.log('Server started on port 3500')
});

