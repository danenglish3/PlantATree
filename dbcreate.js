var connection = require('./database');

module.exports = {

    createTables: function () {

        var add = `CREATE TABLE address (
        idaddress int(11) NOT NULL AUTO_INCREMENT,
        unit varchar(45) DEFAULT NULL,
        street_number varchar(45) DEFAULT NULL,
        suburb varchar(45) DEFAULT NULL,
        city varchar(45) DEFAULT NULL,
        postcode varchar(45) DEFAULT NULL,
        PRIMARY KEY (idaddress));`;

        connection.query(add, (err, res) => {
            console.log("added address table");
        });

        var product = `CREATE TABLE product (
        idProduct int(11) NOT NULL AUTO_INCREMENT,
        product_name varchar(45) NOT NULL,
        product_type varchar(45) NOT NULL,
        product_price float NOT NULL,
        product_description longtext,
        PRIMARY KEY (idProduct));`;

        connection.query(product, (err, res) => {
            console.log("added product table");
        });

        var image = `CREATE TABLE images(
        idimages int(11) NOT NULL AUTO_INCREMENT,
        name varchar(45) DEFAULT NULL,
        img longblob,
        product_id int(11) DEFAULT NULL,
        PRIMARY KEY (idimages),
        KEY product_id_idx (product_id),
        CONSTRAINT product_id FOREIGN KEY (product_id) REFERENCES product (idProduct));`;

        connection.query(image, (err, res) => {
            console.log("added image table");
        });

        var transaction = `CREATE TABLE transaction (
        idtransactions int(11) NOT NULL AUTO_INCREMENT,
        email_address varchar(45) DEFAULT NULL,
        product_id int(11) DEFAULT NULL,
        transaction_date datetime DEFAULT NULL,
        user_id int(11) DEFAULT NULL,
        PRIMARY KEY (idtransactions),
        KEY product_id_idx (product_id));`;

        connection.query(transaction, (err, res) => {
            console.log("added transaction table");
        });

        var store = `CREATE TABLE store (
            idstore int(11) NOT NULL AUTO_INCREMENT,
            store_name varchar(45) DEFAULT NULL,
            store_address_id int(11) DEFAULT NULL,
            PRIMARY KEY (idstore),
            CONSTRAINT store_address_id FOREIGN KEY (idstore) REFERENCES address (idaddress));`;

        connection.query(store, (err, res) => {
            console.log("added store table");
        });

        var user = `CREATE TABLE users (
                user_ID int(11) NOT NULL AUTO_INCREMENT,
                firstname varchar(60) DEFAULT NULL,
                lastname varchar(60) DEFAULT NULL,
                password varchar(60) NOT NULL,
                email_address varchar(45) NOT NULL,
                address_ID int(11) DEFAULT NULL,
                wholesaler tinyint(1) DEFAULT NULL,
                PRIMARY KEY (user_ID),
                  KEY address_ID_idx (address_ID),
                CONSTRAINT address_ID FOREIGN KEY (address_ID) REFERENCES address (idaddress));`;

        connection.query(user, (err, res) => {
            console.log("added user table");
        });

        var email = `CREATE TABLE email (
                email_ID int(11) NOT NULL AUTO_INCREMENT,
                email_address varchar(50) NOT NULL,
                UNIQUE(email_address),
                PRIMARY KEY(email_ID));`;

        connection.query(email, (err, res) => {
            console.log("added email table");
        });
    }
}