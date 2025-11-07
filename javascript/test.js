//Command to run: node main.js (for a file called "main.js")

//Object that contains the connection protocol
//This is the testing site.
var dbConn = require('./db');
dbConn.connectDB();
//dbConn.addInventoryItem('toast', 3, 2.04);
dbConn.testQuery();
//console.log(dbConn.query('SELECT * FROM inventoryce WHERE name = "toast"'));


//console.log("completion:");