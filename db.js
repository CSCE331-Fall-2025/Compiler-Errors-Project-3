//Dedicated file for database connection and functions related to pulling or calling from database

// db.js
const { Client } = require('pg');
require('dotenv').config();

// Replace with your remote database credentials
const client = new Client({
    host: 'csce-315-db.engr.tamu.edu',
    port: 5432, // default PostgreSQL port
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: 'CSCE315Database',
    ssl: { rejectUnauthorized: false } // often needed for remote servers
});

async function connectDB() {
    try {
        await client.connect();
        console.log('✅ Connected to PostgreSQL database');

        // Example query
        //const res = await client.query('SELECT NOW()');
        console.log('Server time:', res.rows[0]);

    } catch (err) {
        console.error('❌ Connection error:', err.stack);
    } finally {
        await client.end();
    }
}

connectDB();