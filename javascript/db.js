const { Pool } = require('pg');
require('dotenv').config({path: require('path').resolve(__dirname, '../.env')});

//Dedicated file for all database connections (until further notice)

var pool;
var usersArray;
var isConnected = false;

//Async makes something into a Promise. Now I have to double check how to run asynchronous programming stuff again :/
/**
 * Establishes connection to the database
 */
async function connectDB() {
    try {
        //Try to connect
        pool = new Pool({
            host: 'csce-315-db.engr.tamu.edu',
            port: 5432, // default PostgreSQL port
            user: process.env.DBUSER,
            password: process.env.DBPASSWORD,
            database: 'CSCE315Database',
            ssl: { rejectUnauthorized: false }
        });
        console.log('Pool created. Testing connection');
        await pool.query('SELECT 1');
        console.log('✅ Connected to PostgreSQL database');
        isConnected = true;
    } catch (err) {
        console.error('❌ Connection error:', err.stack);
    } finally {
        await pool.end();
    }
}

//Not to be actually used. Use this as a test site for all connections
async function testQuery()
{
    if(!isConnected)
    {
        connectDB();
    }
    // Example query
    //Logic: each row is literally 1 entry in the table
    //KeyValue Pairs. Or just output the row directly I guess
    const res = await pool.query('SELECT * FROM menuce');
    console.log('Row 1:', res.rows[0]);
    //From rows, map each element "row" and apply the transform "row.name" (getting row name)
    //Might be missing a thing, but this method can be used for a lot of things it seems
    //Unneccessary. Can directly access the attribute name it seems
    const extractedData = res.rows.map(row => row.name);
    console.log('Extracted names only: ', extractedData[0]);
    //Works
    console.log('Directedly extracted name: ', res.rows[0].name);
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
        pool.query('INSERT INTO orderhistoryce (id, date, time, item, qty, price) VALUES (',
            orderArray[i].id,
            orderArray[i].date,
            orderArray[i].time,
            orderArray[i].item,
            orderArray[i].qty,
            orderArray[i].price,
            ')'
        );
    }
}

/**
 * Delete an item from the menu table
 * 
 * @param {*} authKey Required to prevent unauthorized users from deleting
 * @param {*} itemName Name of item to be deleted
 */
function deleteMenuItem(authKey, itemName)
{
    if(authKey.localeCompare('MANAGER') != 0)
    {
        console.log("Error: Unauthorized user attempted to delete menu item");
    }
    else
    {
        pool.query('DELETE FROM menuce WHERE name == ', itemName);
    }
}







module.exports = {
    query: (text, params) => pool.query(text, params), // generic helper
    connectDB,
    validateUser,
    addOrders,
    deleteMenuItem
};