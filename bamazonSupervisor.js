const cTable = require('console.table');
var inquirer = require("inquirer");
var Database = require("./database/database");


var viewProductsSaleByDepartment = () => {
    var db = new Database();
    var sql = [
        `SELECT d.department_id as ID, department_name as DEPARTMENT, over_head_costs as 'OVER HEAD COSTS', sum(ifnull(product_sales,0)) as 'PRODUCT SALES',  sum(ifnull(product_sales,0)) - over_head_costs as 'TOTAL PROFIT'`,
        `FROM departments d`,
        `LEFT JOIN products p ON p.department_id = d.department_id`,
        `GROUP BY d.department_id, department_name, over_head_costs`,
        `ORDER BY department_name`
    ].join(" ");

    db.read(sql, res => {
        console.log();
        console.table(res);
        showMenu();
    });
}


var insertDepartment = (name, costs) => {
    var db = new Database();
    
    var fields = {
        department_name: name,
        over_head_costs: costs
    }

    db.insert("departments", fields, res => {
        console.log("\nDepartment added!\n");
        showMenu();
    });
}

var addDepartment = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Department name"
        },
        {
            type: "input",
            name: "costs",
            message: "Over load costs",
            validate: input => {
                return (!isNaN(input));
            }
        }
    ]).then(res => {
        insertDepartment(res.name, res.costs);
    });        

}

var showMenu = () => {
    inquirer.prompt([
        {
            type: "list",
            name: "choice",
            message: "Select an option",
            choices: [
                {
                    name:"View Product Sales by Department",
                    value: 1
                },
                {
                    name:"Create New Department",
                    value: 2
                },
                {
                    name:"Exit",
                    value: 3
                },
            ]
        },
    ]).then(res => {
        switch (res.choice) {
            case 1:
                viewProductsSaleByDepartment();
                break;
            case 2:
                addDepartment();
                break;
            case 3:
                process.exit();
                break;
            default:
                console.log("Choice Invalid!");
                break;
        }
    });
}

showMenu();