const cTable = require('console.table');
var inquirer = require("inquirer");
var Database = require("./database/database");

var listAllProducts = () => {
    var db = new Database();
    var sql = [
        'SELECT item_id as ID, department_name as DEPARTMENT, product_name as PRODUCT, price as PRICE, stock_quantity as STOCK',
        'FROM products p',
        'INNER JOIN departments d ON d.department_id = p.department_id',
        'ORDER BY department_name, product_name'
    ].join(" ");
    
    db.read(sql, res => {
        console.log();
        console.table(res);
        promptCustomer();
    });
}

var updateStock = (id, quantity, sales) => {
    var db = new Database();
    var sql = [
        `UPDATE products SET`,
        `stock_quantity = stock_quantity - ${quantity},`,
        `product_sales = product_sales + ${sales}`,
        `WHERE item_id = ${id}`
    ].join(" ");
    
    db.exec(sql, res=>console.log(`Thank you!`));
}

var buyProduct = (id, quantity) => {
    var db = new Database();
    var sql = `SELECT price, stock_quantity FROM products WHERE item_id = ${id}`;
    
    db.read(sql, res => {
        if (Object.entries(res).length !== 0) {
            if (res[0].stock_quantity >= quantity) {
                let cost = res[0].price * quantity;
                console.log(`Total purchase cost: $${cost}`);
                updateStock(id, quantity, cost);
            }
            else {
                console.log("Sorry... Insufficient quantity!");
                listAllProducts();
            }
            
        }
        else {
            console.log("This item does not exists. Please type a valid ID.");
            promptCustomer();
        }
            
    });
}

var promptCustomer = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "product_id",
            message: "Type the Product ID you wish to buy:",
            validate: input => {
                return (!isNaN(input));
            }
        },
        {
            type: "input",
            name: "quantity",
            message: "How many units would you like to buy?",
            validate: input => {
                return (!isNaN(input));
            }
        }
    ]).then(res => {
        buyProduct(res.product_id, res.quantity);
    });
}

listAllProducts();