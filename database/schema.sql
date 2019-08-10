DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE departments(
    department_id INTEGER NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(50) NOT NULL,
    over_head_costs FLOAT NOT NULL DEFAULT 0,
    PRIMARY KEY (department_id)
);

CREATE TABLE products(
    item_id INTEGER NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(50) NOT NULL,
    department_id INTEGER NOT NULL,
    price FLOAT NOT NULL,
    stock_quantity INTEGER NOT NULL,
    product_sales FLOAT NOT NULL DEFAULT 0,
    PRIMARY KEY (item_id)
);

INSERT INTO departments (department_name, over_head_costs)
VALUES  ('Appliances', 50000),
        ('Electronics',40000),
        ('Musical Instruments',30000);

INSERT INTO products (product_name, department_id, price, stock_quantity)
VALUES  ('Refrigerator Brastemp', 1, 2500, 30),
        ('Refrigerator Frigidaire', 1, 890, 20),
        ('Smart TV Samsung 40"', 2, 850, 10),
        ('Digital Camera', 2, 300, 5),
        ('Laptop Sony', 2, 2100, 2),
        ('Headphone Sony', 2, 400, 30),
        ('Guitar', 3, 2000, 12),
        ('Bass', 3, 1800, 8),
        ('Keyboards', 3, 2300, 4),
        ('Microphones', 3, 120, 3);
        
