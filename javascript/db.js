//Dedicated file for database connection and functions related to pulling or calling from database

// db.js
const { Pool } = require('pg');
require('dotenv').config({path: require('path').resolve(__dirname, '../.env')});

// Replace with your remote database credentials
const pool = new Pool({
    host: 'csce-315-db.engr.tamu.edu',
    port: 5432, // default PostgreSQL port
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: 'CSCE315Database',
    ssl: { rejectUnauthorized: false } // often needed for remote servers
});

//Async essentially breaks a thread off and allows it to run as long as it needs to
//In this case, if it take like 5 minutes to connect for some reason, everything in test.js won't be held up by it
//Allows the use of "await", which seems to force the thread to wait until the action is complete before proceeding
async function connectDB() {
    try {
        console.log('✅ Connected to PostgreSQL database');
        // Example query
        //Logic: each row is literally 1 entry in the table
        //KeyValue Pairs. Or just output the row directly I guess
        const res = await pool.query('SELECT * FROM menuce');
        console.log('Row 1:', res.rows[0]);
        //From rows, map each element "row" and apply the transform "row.name" (getting row name)
        //Might be missing a thing, but this method can be used for a lot of things it seems
        const extractedData = res.rows.map(row => row.name);
        console.log('Extracted name only: ', extractedData[0]);
    } catch (err) {
        console.error('❌ Connection error:', err.stack);
    } finally {
        await pool.end();
    }
}

function validateUser(username, password){
    const res = pool.query('SELECT * FROM usersce');
    const names = res.rows.map(row => row.name);
    const passwords = res.rows.map(row => row.password);
    
    //Force convert since no way to be sure?
    username = toString(username);
    password = toString(password);

    for(i = 0; i < names.length; i++)
    {
        //Return "usertype" eventually
        if(names[i].localeCompare(username) == 0 && passwords[i].localeCompare(password) == 0)
        {
            return true;
        }
    }
    return false;
}


module.exports = {
    query: (text, params) => pool.query(text, params), // generic helper
    connectDB
};