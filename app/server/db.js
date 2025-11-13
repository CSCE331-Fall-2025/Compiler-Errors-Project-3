import { Pool } from 'pg';
import dotenv from 'dotenv';
import findConfig from 'find-config';
dotenv.config({ path: findConfig('.env') });

//Dedicated file for all database connections (until further notice)

var pool = new Pool({
    user: process.env.DBUSER,
    host: process.env.DBHOST,
    database: process.env.DBNAME,
    password: process.env.DBPASSWORD,
    port: process.env.DBPORT,
    ssl: false,
});
var usersArray;

//Async makes something into a Promise. Now I have to double check how to run asynchronous programming stuff again :/
/**
 * Establishes connection to the database
 */
function connectDB() {
    try
    {
        //Try to connect
        pool = new Pool({
            user: process.env.DBUSER,
            host: process.env.DBHOST,
            database: process.env.DBNAME,
            password: process.env.DBPASSWORD,
            port: process.env.DBPORT,
            ssl: false,
        });
        console.log('Pool created. Testing connection');
        pool.query('SELECT 1');
        console.log('✅ Connected to PostgreSQL database');
    } 
    catch(err)
    {
        console.error('❌ Connection error:', err.stack);
    }
}

//Not to be actually used. Use this as a test site for all connections
async function testQuery()
{
    const res = await pool.query('SELECT name, ingredients FROM menuce');
    console.log('Row 0:', res.rows[0]);

}

/**
 * Validates users
 * @param {*} username inputted username
 * @param {*} password inputted password
 * @returns usertype of verified user or FAIL in case of invalid validation
 */
function validateUser(username, password){
    if(usersArray.length == 0)
    {
        usersArray = pool.query('SELECT * FROM usersce');
    }
    //Force convert since no way to be sure?
    username = toString(username);
    password = toString(password);

    for(i = 0; i < names.length; i++)
    {
        //Return "usertype" eventually
        if(usersArray.rows[i].name.localeCompare(username) == 0 && usersArray.rows[i].password.localeCompare(password) == 0)
        {
            return usersArray.rows[i].usertype;
        }
    }
    return 'FAIL';
}

/**
 * Adds orders to orderhistoryce
 * 
 * Each order must have the 6 following fields:
 * 
 * id, date, time, item, qty, price
 * 
 * @param {*} orderArray Array of orders
 */
function addOrders(orderArray)
{
    for(i = 0; i < orderArray.length; i++)
    {
        pool.query('INSERT INTO orderhistoryce (id, date, time, item, qty, price) VALUES ($1, $2, $3, $4, $5, $6)',
            [orderArray[i].id, orderArray[i].date, orderArray[i].time, orderArray[i].item, orderArray[i].qty, orderArray[i].price]
        );
    }
}

/**
 * Delete an item from the menu table
 * 
 * @param {*} authKey Required to prevent unauthorized users from deleting
 * @param {*} itemName Name of item to be deleted
 */
function deleteMenuItem(itemName)
{
    pool.query('DELETE FROM menuce WHERE name = $1', [itemName]);
}

function deleteEmployee(name)
{
    pool.query('DELETE FROM employeesce WHERE name = $1', [name]);
}

async function getMenuItems()
{
    try
    {
        return await pool.query('SELECT * FROM menuce');
    }
    catch(err)
    {
        console.log(err);
    }
}

async function addEmployee(name, employeetype, email, phonenum)
{
    try
    {
        return pool.query('INSERT INTO employeesce (name, employeetype, email, phonenum) VALUES ($1, $2, $3, $4)', [name, employeetype, email, phonenum]);
    }
    catch(err)
    {
        console.log(err);
    }
}

async function updateEmployee(targetName, name = '', employeetype = '', email = '', phonenum = '')
{
    if(name.localeCompare('') != 0)
    {
        pool.query('UPDATE employeesce SET name = $1 WHERE name = $2', [name, targetName]);
    }
    if(employeetype.localeCompare('') != 0)
    {
        pool.query('UPDATE employeesce SET employeetype = $1 WHERE name = $2', [employeetype, targetName]);
    }
    if(email.localeCompare('') != 0)
    {
        pool.query('UPDATE employeesce SET email = $1 WHERE name = $2', [email, targetName]);
    }
    if(phonenum.localeCompare('') != 0)
    {
        pool.query('UPDATE employeesce SET phonenum = $1 WHERE name = $2', [phonenum, targetName]);
    }
}

function addInventoryItem(name, qty, unit_price)
{
    pool.query('INSERT INTO inventoryce (name, quantity, unit_price) VALUES ($1, $2, $3)', [name, qty, unit_price]);
}

function addMenuItem(name, price, ingredients)
{
    pool.query('INSERT INTO menuce (name, price, ingredients) VALUES ($1, $2, $3)', [name, price, ingredients]);
}

function updateMenuItem(name, newName, price, ingredients)
{
    if(newName.localeCompare('') != 0)
    {
        pool.query('UPDATE menuce SET name = $1 WHERE name = $2', [newName, name]);
    }
    if(typeof price !== 'string')
    {
        pool.query('UPDATE menuce SET price = $1 WHERE name = $2', [price, name]);
    }
    if(ingredients.localeCompare('') != 0)
    {
        pool.query('UPDATE menuce SET ingredients = $1 WHERE name = $2', [ingredients, name]);
    }
}

function updateInventoryItem(name, newName, qty, uprice)
{
    if(newName.localeCompare('') != 0)
    {
        pool.query('UPDATE inventoryce SET name = $1 WHERE name = $2', [newName, name]);
    }
    if(typeof qty !== 'string')
    {
        pool.query('UPDATE inventoryce SET quantity = $1 WHERE name = $2', [qty, name]);
    }
    if(typeof uprice !== 'string')
    {
        pool.query('UPDATE inventoryce SET unit_price = $1 WHERE name = $2', [uprice, name]);
    }
}

function getReport(reportName)
{
    var qry;
    if(reportName.localeCompare('Top 5 Menu items')) 
    {
        qry = "SELECT item, COUNT(*) AS sales FROM orderhistoryce GROUP BY item ORDER BY sales DESC LIMIT 5";
    }
    if(reportName.localeCompare("Top 10 Sales Days"))
    {
        qry = "SELECT date, COUNT(*) AS sales FROM orderhistoryce GROUP BY date ORDER BY sales DESC LIMIT 10";
    }
    if(reportName.localeCompare("All time profit")) {
        qry = "SELECT SUM(price * qty) AS profit FROM orderhistoryce";
    }
    try{
        return pool.query(qry);
    }
    catch(err)
    {
        console.log(err);
    }
}

function filterOrderHistory(startDate, endDate)
{
    try
    {
        return pool.query('SELECT item, SUM(qty) AS total_sales FROM orderhistoryce WHERE date BETWEEN $1 AND $2 GROUP BY item', [startDate, endDate]);
    }
    catch(err)
    {
        console.log(err);
    }
}

async function getIngredients(name)
{
    try
    {
        return pool.query('SELECT ingredients FROM menuce WHERE name = $1', [name]);
    }
    catch(err)
    {
        console.log(err);
    }
}

async function checkStock(name)
{
    try
    {
        return pool.query('SELECT qty FROM inventoryce WHERE name = $1', [name]);
    }
    catch(err)
    {
        console.log(err);
    }
}

async function getStock()
{
    try
    {
        return pool.query('SELECT name, qty FROM inventoryce');
    }
    catch(err)
    {
        console.log(err);
    }
}

export default {
    query: (text, params) => pool.query(text, params), // generic helper
    connectDB,
    validateUser,
    addOrders,
    deleteMenuItem,
    getMenuItems,
    addMenuItem,
    updateMenuItem,
    addEmployee,
    updateEmployee,
    addInventoryItem,
    updateInventoryItem,
    getReport,
    filterOrderHistory, 
    testQuery,
    deleteEmployee,
    getIngredients,
    checkStock,
    getStock
};