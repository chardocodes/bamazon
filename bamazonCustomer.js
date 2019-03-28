var mysql = require("mysql");
var inquirer = require("inquirer");

var amountOwed;
var currentDepartment;
var updateSales;

var connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'password',
	database: 'Bamazon_db'
});

//Establish Connection
connection.connect(function (err) {
	if (err) throw err;
	console.log('connected as id: ' + connection.threadId)
});

//My functions 
//Displays all items available in store and then calls their function
function showProducts() {
	connection.query('SELECT * FROM products', function (err, res) {
		if (err) throw err;
		console.log('__________________________________________________');
		console.log('_________________Items in Store___________________');
		console.log('__________________________________________________');

		for (i = 0; i < res.length; i++) {
			console.log('Item ID:' + res[i].id + ' Product Name: ' + res[i].Product_Name + ' Price: ' + '$' + res[i].Price + '(Quantity left: ' + res[i].In_Stock + ')')
		}
		console.log('___________________________________________________');
		placeOrder();
	})
}

//Prompts the user to place an order, fulfills the order, and then calls the new order function
function placeOrder() {
	inquirer.prompt([{
		name: 'selectId',
		message: 'Please enter the ID of the product you wish to purchase',
		validate: function (value) {
			var valid = value.match(/^[0-9]+$/)
			if (valid) {
				return true
			}
			return 'Please enter a valid Product ID'
		}
	}, {
		name: 'selectQuantity',
		message: 'How many of this product would you like to order?',
		validate: function (value) {
			var valid = value.match(/^[0-9]+$/)
			if (valid) {
				return true
			}
			return 'Please enter a numerical value'
		}
	}]).then(function (answer) {
		connection.query('SELECT * FROM products WHERE id = ?', [answer.selectId], function (err, res) {
			if (answer.selectQuantity > res[0].In_Stock) {
				console.log('Insufficient Quantity');
				console.log('This order has been cancelled');
				console.log('');
				newOrder();
			}
			else {
				amountOwed = res[0].Price * answer.selectQuantity;
				currentDepartment = res[0].Department_Name;
				console.log('Thanks for your order');
				console.log('You owe $' + amountOwed);
				console.log('');
				//update products table
				connection.query('UPDATE products SET ? Where ?', [{
					In_Stock: res[0].In_Stock - answer.selectQuantity
				}, {
					id: answer.selectId
				}], function (err, res) { });
				//update departments table
				logSaleToDepartment();
				newOrder();
			}
		})

	}, function (err, res) { })
};


//functions to push the sales to the executive table
function logSaleToDepartment() {
	connection.query('SELECT * FROM departments WHERE DepartmentName = ?', [currentDepartment], function (err, res) {
		updateSales = res[0].Total_Sales + amountOwed;
		updateDepartmentTable();
	})
};

function updateDepartmentTable() {
	connection.query('UPDATE departments SET ? WHERE ?', [{
		Total_Sales: updateSales
	}, {
		Department_Name: currentDepartment
	}], function (err, res) { });
};

//Allows the user to place a new order or end the connection
function newOrder() {
	inquirer.prompt([{
		type: 'confirm',
		name: 'choice',
		message: 'Would you like to order something else?'
	}]).then(function (answer) {
		if (answer.choice) {
			placeOrder();
		}
		else {
			console.log('Thank you for shopping Bamazon Bikes, come again!');
			
		} connection.end();
	})
}
function newOrder(){
	inquirer.prompt([{
		type: 'confirm',
		name: 'choice',
		message: 'Would you like another transaction?'
	}]).then(function(answer){
		if(answer.choice){
			placeOrder();
		}
		else{
			console.log('Thank you, come again!');
			connection.end();
		}
	})
}

showProducts();
