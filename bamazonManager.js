const cTable = require('console.table');
var inquirer = require("inquirer");
var Database = require("./database/database");

var viewProductsForSale = () => {
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
        showMenu();
    });
}

var getAllDepartments = (callback) => {
    var db = new Database();
    var sql = [
        'SELECT department_id as value, department_name as name',
        'FROM departments',
        'ORDER BY department_name'
    ].join(" ");

    db.read(sql, res => {
        callback(res);
    });
    
}

var viewLowInventory = () => {
    var db = new Database();
    var sql = [
        'SELECT item_id as ID, department_name as DEPARTMENT, product_name as PRODUCT, price as PRICE, stock_quantity as STOCK',
        'FROM products p',
        'INNER JOIN departments d ON d.department_id = p.department_id',
        'WHERE stock_quantity < 5',
        'ORDER BY department_name, product_name'
    ].join(" ");

    db.read(sql, res => {
        console.log();
        console.table(res);
        showMenu();
    });
}

var updateProduct = (id, quantity) => {
    var db = new Database();
    var sql = [
        `UPDATE products SET`,
        `stock_quantity = stock_quantity + ${quantity}`,
        `WHERE item_id = ${id}`
    ].join(" ");
    
    db.exec(sql, res => {
        console.log(`${res.affectedRows} product updated!`);
        showMenu();
    });
}

var insertProduct = (name, department_id, price, quantity) => {
    var db = new Database();
    
    var fields = {
        product_name: name,
        department_id: department_id,
        price: price,
        stock_quantity: quantity
    }

    db.insert("products", fields, res => {
        console.log("\nItem added!\n");
        showMenu();
    });
}

var addToInventory = () => {

    inquirer.prompt([
        {
            type: "input",
            name: "product_id",
            message: "Type the Product ID you wish to add items:",
            validate: input => {
                return (!isNaN(input));
            }
        },
        {
            type: "input",
            name: "quantity",
            message: "How many items would you like to add?",
            validate: input => {
                return (!isNaN(input));
            }
        }
    ]).then(res => {
        updateProduct(res.product_id, res.quantity);
    });
}

var addNewProduct = () => {

    getAllDepartments(res => {
    
        inquirer.prompt([
            {
                type: "input",
                name: "name",
                message: "Product name:"
            },
            {
                type: "list",
                name: "department_id",
                message: "Select an department:",
                choices: res
            },     
            {
                type: "input",
                name: "price",
                message: "Price:",
                validate: input => {
                    return (!isNaN(input));
                }
            },
            {
                type: "input",
                name: "quantity",
                message: "Stock quantity:",
                validate: input => {
                    return (!isNaN(input));
                }
            }
        ]).then(res => {
            insertProduct(res.name, res.department_id, res.price, res.quantity);
        });        
    });
    

}

var showMenu = () => {
    inquirer.prompt([
        {
            type: "list",
            name: "choice",
            message: "Select an option:",
            choices: [
                {
                    name:"View Products for Sale",
                    value: 1
                },
                {
                    name:"View Low Inventory",
                    value: 2
                },
                {
                    name:"Add to Inventory",
                    value: 3
                },
                {
                    name:"Add New Product",
                    value: 4
                },
                {
                    name:"Exit",
                    value: 5
                },
            ]
        },
    ]).then(res => {
        switch (res.choice) {
            case 1:
                viewProductsForSale();
                break;
            case 2:
                viewLowInventory();
                break;
            case 3:
                addToInventory();
                break;
            case 4:
                addNewProduct();
                break;
            case 5:
                process.exit();
                break;
            default:
                console.log("Choice Invalid!");
                break;
        }
    });
}

showMenu();