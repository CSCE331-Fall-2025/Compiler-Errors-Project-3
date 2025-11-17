//Command to run: node main.js (for a file called "main.js")
import dbConn  from './db.js';
//Object that contains the connection protocol
//This is the testing site.

import functionTest from './function.js';
//dbConn.connectDB();
//dbConn.addInventoryItem('toast', 3, 2.04);
dbConn.testQuery();
//console.log(dbConn.query('SELECT * FROM inventoryce WHERE name = "toast"'));

//functionTest.createMenuItemArray();

//console.log("completion:");