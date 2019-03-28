DROP DATABASE IF EXISTS Bamazon_db;

CREATE DATABASE Bamazon_db;

USE Bamazon_db;

CREATE TABLE products(
	id INT NOT NULL AUTO_INCREMENT,
	Product_Name VARCHAR(100) NOT NULL,
	Department_Name VARCHAR(100) NOT NULL,
	Price DECIMAL(10,2) default 0,
	In_Stock INT default 0,
	PRIMARY KEY(id)
);

INSERT INTO products(Product_Name, Department_Name, Price, In_Stock) VALUES ('Banshee Prime', 'Mountain Bikes', 4459.99,  4);
INSERT INTO products(Product_Name, Department_Name, Price, In_Stock) VALUES ('Yeti SB6C', 'Mounatin Bikes', 7459.99, 6);
INSERT INTO products(Product_Name, Department_Name, Price, In_Stock) VALUES ('Santa Cruz Bronson', 'Mountain Bikes', 3449.99, 7);
INSERT INTO products(Product_Name, Department_Name, Price, In_Stock) VALUES ('Transition Bandit', 'Mountain Bikes', 4255.99, 2);
INSERT INTO products(Product_Name, Department_Name, Price, In_Stock) VALUES ('Bell Super 2r', 'Bike Gear', 179.99, 10);
INSERT INTO products(Product_Name, Department_Name, Price, In_Stock) VALUES ('Giro Helmet', 'Bike Gear', 65.99, 10);
INSERT INTO products(Product_Name, Department_Name, Price, In_Stock) VALUES ('Fox Float EVOL', 'Bike Gear', 189, 41);
INSERT INTO products(Product_Name, Department_Name, Price, In_Stock) VALUES ('ODI Locking Grips', 'Bike Gear', 24.99, 39);
INSERT INTO products(Product_Name, Department_Name, Price, In_Stock) VALUES ('Maxxis Minion Tires', 'Bike Tires', 64.99, 16);
INSERT INTO products(Product_Name, Department_Name, Price, In_Stock) VALUES ('Fox Padded Ride Shorts', 'Clothing', 46.99, 12);
INSERT INTO products(Product_Name, Department_Name, Price, In_Stock) VALUES ('Cat-eye Odometer', 'Bike Electronics', 42, 13);

CREATE TABLE departments (
	Department_Id INT NOT NULL AUTO_INCREMENT,
	Department_Name VARCHAR(100) NOT NULL,
	Overhead_Cost DECIMAL(10,2) NOT NULL,
	Total_Sales DECIMAL(10,2),
	PRIMARY KEY(Department_Id)
);

INSERT INTO departments(Department_Name, Overhead_Cost) VALUES('Mounatin Bikes', 10000);
INSERT INTO departments(Department_Name, Overhead_Cost) VALUES('Bike Gear', 10000);
INSERT INTO departments(Department_Name, Overhead_Cost) VALUES('Bike Electronics', 10000);
INSERT INTO departments(Department_Name, Overhead_Cost) VALUES('Clothing', 10000);
INSERT INTO departments(Department_Name, Overhead_Cost) VALUES('Bike Tires', 10000);