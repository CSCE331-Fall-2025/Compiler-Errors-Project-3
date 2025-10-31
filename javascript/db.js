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

async function connectDB() {
    try {
        console.log('✅ Connected to PostgreSQL database');
        // Example query
        const res = await pool.query('SELECT NOW()');
        console.log('Server time:', res.rows[0]);
    } catch (err) {
        console.error('❌ Connection error:', err.stack);
    } finally {
        await pool.end();
    }
}


module.exports = {
    query: (text, params) => pool.query(text, params), // generic helper
    connectDB
};