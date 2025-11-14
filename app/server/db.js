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
    var id = await pool.query('SELECT MAX(id) FROM orderhistoryce');
    id = id.rows[0].max;
    const res = await pool.query('SELECT name, ingredients FROM menuce');
    console.log('Row 0:', id);

}

/**
 * Validates users
 * @param {*} username inputted username/email
 * @param {*} password inputted password
 * @returns usertype of verified user or FAIL in case of invalid validation
 */
async function validateEmployee(username, password){
    const res = await pool.query('SELECT * FROM usersce');

    flag = false;
    var userType = 'FAIL';
    res.rows.forEach(row => {
        if(!flag)
        {
            if((row.name.localeCompare(username) == 0 || row.email.localeCompare(username)) && usersArray.rows[i].password.localeCompare(password) == 0)
            {
                userType = row.usertype;
                flag = true;
            }
        }
    });

    return userType;
}

async function validateCustomer(username, password){
    const res = await pool.query('SELECT * FROM customersce');

    flag = false;
    res.rows.forEach(row => {
        if(!flag)
        {
            if((row.name.localeCompare(username) == 0 || row.email.localeCompare(username)) && usersArray.rows[i].password.localeCompare(password) == 0)
            {
                flag = true;
            }
        }
    });

    return flag;
}

async function addCustomer(name, email, password){
    try{
        var id = await pool.query('SELECT MAX(id) FROM customersce');
        id = id.rows[0].max;
        
        pool.query('INSERT INTO customersce (id, email, password, name) VALUES ($1, $2, $3, $4)', [id+1, email, password, name]);
    }catch(err){
        console.log(err);
    }
}

async function addUser(username, password, usertype, email){
    try{
        pool.query('INSERT INTO  (username, password, usertype, email) VALUES ($1, $2, $3, $4)', [username, password, usertype, email]);
    }catch(err){
        console.log(err);
    }
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
async function addOrders(orderArray){
    var id = await pool.query('SELECT MAX(id) FROM orderhistoryce');
    id = id.rows[0].max;
    const now = new Date();
    
    var date = now.getFullYear() + '-' + now.getMonth() + '-' + now.getDay();
    var time = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();

    orderArray.forEach(async (order) => {
        var price = await pool.query('SELECT price FROM menuce WHERE name = $1', [order.name]);
        pool.query('INSERT INTO orderhistoryce (id, date, time, item, qty, price) VALUES ($1, $2, $3, $4, $5, $6)',
            [id+i, date, time, order.name, order.quantity, price]
        );
    });
}

async function updateInventory(usedIngrMap,inventoryMap){
    usedIngrMap.forEach((key, value, map) => {
        pool.query('UPDATE inventoryce SET quantity = $1 WHERE name = $2', [inventoryMap.get(key) - value, key]);
    });
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

async function addEmployee(name = '', employeetype = '', email = '', phonenum = '')
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

async function updateEmployeeName(targetName, name = '')
{
    pool.query('UPDATE employeesce SET name = $1 WHERE name = $2', [name, targetName]);
}

async function updateEmployeeType(targetName, employeetype = '')
{
    pool.query('UPDATE employeesce SET employeetype = $1 WHERE name = $2', [employeetype, targetName]);
}

async function updateEmployeeEmail(targetName, email = '', phonenum = '')
{
    pool.query('UPDATE employeesce SET email = $1 WHERE name = $2', [email, targetName]);
}

async function updateEmployeePhoneNum(targetName, phonenum)
{
    pool.query('UPDATE employeesce SET phonenum = $1 WHERE name = $2', [phonenum, targetName]);
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
    addOrders,
    addUser,
    addCustomer,
    validateCustomer,
    validateEmployee,
    deleteMenuItem,
    getMenuItems,
    addMenuItem,
    updateMenuItem,
    addEmployee,
    addInventoryItem,
    updateInventoryItem,
    getReport,
    filterOrderHistory, 
    testQuery,
    deleteEmployee,
    getIngredients,
    checkStock,
    getStock,
    updateEmployeeEmail,
    updateEmployeeName,
    updateEmployeePhoneNum,
    updateEmployeeType
};