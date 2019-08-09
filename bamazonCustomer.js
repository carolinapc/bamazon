const cTable = require('console.table');
var inquirer = require("inquirer");
var Database = require("./database/database");

var listAllProducts = () => {
    var db = new Database();
    var sql = 'SELECT item_id as ID, department_name as DEPARTMENT, product_name as PRODUCT, price as PRICE, stock_quantity as STOCK ';
    sql += 'FROM products p ';
    sql += 'INNER JOIN departments d ON d.department_id = p.department_id ';
    sql += 'ORDER BY department_name, product_name';

    db.read(sql, res => {
        console.log();
        console.table(res);
    });
}

listAllProducts();