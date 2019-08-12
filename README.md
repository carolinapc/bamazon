# bamazon

An CLI Amazon-like storefront using Node.js. The app will take in orders from customers and delete stock from the store's inventory, track product sales across the store's departments and provide a summary of the highest-grossing departments in the store.

## Instalation

Node.js is required! Download here: https://nodejs.org/en/

Run the following command on your terminal
```
npm install
```

Rename the *.env-sample* file to *.env* and change its contents with your data
```
DB_HOST=your_db_server
DB_PORT=3306
DB_USER=your_user
DB_PWD=your_password
DB_DATABASE=your_db_name
```

## Usage

*Customer View*

````
node bamazonCustomer.js
````
[Watch the video](https://drive.google.com/file/d/1wPah1upJYLPDdZr_5wjIhaX2oLu_sowd/view)

*Manager View*

````
node bamazonManager.js
````
[Watch the video](https://drive.google.com/file/d/15uc0LnRrKWkXpHqhvekWHuf63obRmsNE/view)

*Supervisor View*

````
node bamazonSupervisor.js
````
[Watch the video](https://drive.google.com/file/d/1L1PwZP9wdbu9ixY5POpJbcVPxne3vYrk/view)
