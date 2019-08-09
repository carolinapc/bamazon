require('dotenv').config();
var mysql = require("mysql");


function Database() {
    this.connection = mysql.createConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PWD,
        database: process.env.DB_DATABASE    
    });

    this.read = (query, callback) => {
        this.connection.connect(err => {
            if (err) throw err;
            var qry = this.connection.query(query, (err, res) => {
                if (err) throw err;
                callback(res);
                this.connection.end();
            });
            //console.log(qry.sql);
        });
    }

    this.insert = (table, fields, callback) => {
        this.connection.connect(err => {
            if (err) throw err;
            this.connection.query(`INSERT INTO ${table} SET ?`, fields, (err, res) => {
                if (err) throw err;
                callback(res);
                this.connection.end();
            });
        })
    }

    this.update = (table, fields, conditions, callback) => {
        this.connection.connect(err => {
            if (err) throw err;
            this.connection.query(`UPDATE ${table} SET ? WHERE ?`, [fields, conditions], (err, res) => {
                if (err) throw err;
                callback(res);
                this.connection.end();
            });
        });
    }

    this.delete = (table, conditions, callback) => {
        this.connection.connect(err => {
            if (err) throw err;
            this.connection.query(`DELETE FROM ${table} WHERE ?`, conditions, (err, res) => {
                if (err) throw err;
                callback(res);
                this.connection.end();
            });
        })
    }
}

module.exports = Database;