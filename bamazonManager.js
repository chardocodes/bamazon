var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'password',
	database: 'Bamazon_db'
});

//Establish Connection to call the Manager Input function
connection.connect(function(err){
	if (err) throw err;
	console.log('connected as id: ' + connection.threadId)
	managerInput();
});


//Functions
//Prompt the user for the action they would like to perform and then call the new transaction function
function managerInput(){
	inquirer.prompt([{
		type: 'list',
		name: 'input',
		message: 'What would you like to do today?',
		choices: ['1) View Products for sale', '2) View low inventory', '3) Add to inventory', '4) Add new product']
	}]).then(function(answer){
		if(answer.input === '1) View Products for sale'){
			connection.query('SELECT * FROM products', function(err, res){
			if (err) throw err;
			console.log('');
			console.table('______________________ITEMS IN STORE________________________');
			for(i=0;i<res.length;i++){
				console.log('Item ID:' + res[i].id);
				console.log('Product Name: ' + res[i].Product_Name);
				console.log('Price: ' + '$' + res[i].Price);
				console.log('Quantity in Stock: ' + res[i].In_Stock);
				console.log('---------------------');
			}
			console.log('')
			newTransaction();
			})
		}
		else if(answer.input === '2) View low inventory'){
			connection.query('SELECT * FROM products WHERE StockQuantity < 5', function(err, res){
				if (err) throw err;
				console.log('')
				console.log('______________________LOW INVENTORY______________________');
				for(i=0;i<res.length;i++){
					console.log('Name: ' + res[i].Product_Name);
					console.log('Product ID: ' + res[i].id);
					console.log('Quantity in Stock: ' + res[i].In_Stock);
					console.log('---------------------');
				}
				newTransaction();
			})
		}
		else if(answer.input === '3) Add to inventory'){
			inquirer.prompt([{
				name: 'item',
				message: 'Enter the ID of the item you wish to update:',
				validate: function(value){
					var valid = value.match(/^[0-9]+$/)
					if(valid){
						return true
					}
						return 'Please enter a numerical value'
					}
			},{
				name: 'number',
				message: 'How many items would you like to add to the current supply?',
				validate: function(value){
					var valid = value.match(/^[0-9]+$/)
					if(valid){
						return true
					}
						return 'Please enter a numerical value'
					}
			}]).then(function(answer){
				connection.query('SELECT * FROM products WHERE id = ?', [answer.item], function(err, res){
						connection.query('UPDATE products SET ? Where ?', [{
							In_Stock: res[0].In_Stock + parseInt(answer.number)
						},{
							id: answer.item
						}], function(err, res){});
				})
				console.log('Inventory updated');
				newTransaction();
			})
		}
		else if(answer.input === '4) Add new product'){
			inquirer.prompt([{
				name: 'product',
				message: 'Enter name of product:'
			},{
				name: 'department',
				message: 'Enter a department for this product'
			},{
				name: 'price',
				message: 'Enter a price for this product',
				validate: function(value){
					var valid = value.match(/^[0-9]+$/)
					if(valid){
						return true
					}
						return 'Please enter a numerical value'
					}
			},{
				name: 'stock',
				message: 'Please enter a stock quantity for this product',
				validate: function(value){
					var valid = value.match(/^[0-9]+$/)
					if(valid){
						return true
					}
						return 'Please enter a numerical value'
					}
			}]).then(function(answer){
				connection.query('INSERT into products SET ?', {
					Product_Name: answer.product,
					Department_Name: answer.department,
					Price: answer.price,
					In_Stock: answer.stock
				}, function(err, res){});
				console.log('Product Added');
				newTransaction();
			})
		}
	})
};

//Prompt to ask the user if they would like another transaction or to end the connection
function newTransaction(){
	inquirer.prompt([{
		type: 'confirm',
		name: 'choice',
		message: 'Would you like another transaction?'
	}]).then(function(answer){
		if(answer.choice){
			managerInput();
		}
		else{
			console.log('Thank you, come again!');
			connection.end();
		}
	})
}