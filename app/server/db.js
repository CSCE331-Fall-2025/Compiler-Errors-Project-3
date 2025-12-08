import { Pool } from 'pg';
import dotenv from 'dotenv';
import findConfig from 'find-config';
dotenv.config({ path: findConfig('.env') });

var pool = new Pool({
    user: process.env.DBUSER,
    host: process.env.DBHOST,
    database: process.env.DBNAME,
    password: process.env.DBPASSWORD,
    port: process.env.DBPORT,
    ssl: false,
});

/**
 * Used for testing addOrders in testQuery.
 * Retrieves ingredient list for a menu item.
 * @param {string} name Menu item name
 * @returns {Promise<string[]>} Array of ingredient names
 */
async function getIngredientList(name){ 
    const res = await getIngredients(name);
    var temp = res.rows[0].ingredients;
    var temp2 = temp.split(', ');
    return temp2;
}

/**
 * Testing site for verifying external API connections.
 * Not used in production.
 * @returns {Promise<void>}
 */
async function testQuery()
{
    const response = await fetch("https://api.nlpcloud.io/v1/nllb-200-3-3b/translation", {
    method: "POST",
    headers: {
      "Authorization": `Token ${process.env.NLP_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      text: 'Bread',
      source: "engl_Latn",
      target: "spa_Latn"
        })
    });

    console.log(response);
}

/**
 * Validates an employee login request.
 * @param {string} username Username or email
 * @param {string} password Raw password
 * @returns {Promise<string>} User type or 'FAIL'
 */
async function validateEmployee(username, password){
    const res = await pool.query('SELECT username, password, usertype, email FROM usersce');

    var flag = false;
    var userType = 'FAIL';
    if(password === process.env.OAUTH_SPECIALPASS){
        for(const row of res.rows){
            if(!flag){
                if(row.email === username){
                    userType = row.usertype;
                    flag = true;
                }
            }
        }
    }

    else{
        for(const row of res.rows){
            if(!flag){
                if((row.username === username  || row.email === username) && row.password === password){
                    userType = row.usertype;
                    flag = true;
                }
            }
        }
    }
    return userType;
}

/**
 * Validates a customer login request.
 * @param {string} username Username or email
 * @param {string} password Raw password
 * @returns {Promise<boolean>} Whether login is valid
 */
async function validateCustomer(username, password){
    const res = await pool.query('SELECT * FROM customersce');

    var flag = false;
    if(password === process.env.OAUTH_SPECIALPASS){
        for(const row of res.rows){
            if(!flag){
                if(row.email === username){
                    flag = true;
                }
            }
        }
    }
    else{
        for(const row of res.rows){
            if(!flag){
                if((row.username === username || row.email === username) && row.password === password){
                    flag = true;
                }
            }
        }
    }
    return flag;
}

/**
 * Adds a new customer to the database.
 * @param {string} name Customer full name
 * @param {string} email Email address
 * @param {string} password Raw password
 * @returns {Promise<void>}
 */
async function addCustomer(name, email, password){
    try{
        var id = await pool.query('SELECT MAX(id) FROM customersce');
        id = id.rows[0].max;
        
        pool.query('INSERT INTO customersce (id, email, password, name) VALUES ($1, $2, $3, $4)', [id+1, email, password, name]);
    }catch(err){
        console.log(err);
    }
}

/**
 * Adds a user account (employees only).
 * @param {string} username Username
 * @param {string} password Raw password
 * @param {string} usertype Role
 * @param {string} email Email address
 * @returns {Promise<void>}
 */
async function addUser(username, password, usertype, email){
    try{
        pool.query('INSERT INTO  (username, password, usertype, email) VALUES ($1, $2, $3, $4)', [username, password, usertype, email]);
    }catch(err){
        console.log(err);
    }
}

/**
 * Adds an employee record.
 * @param {string} [name=''] Name
 * @param {string} [employeetype=''] Employee type
 * @param {string} [email=''] Email
 * @param {string} [phonenum=''] Phone number
 * @param {*} img Image data / URL
 * @returns {Promise<any>}
 */
async function addEmployee(name = '', employeetype = '', email = '', phonenum = '', img)
{
    try
    {
        return pool.query('INSERT INTO employeesce (name, employeetype, email, phonenum, img) VALUES ($1, $2, $3, $4, $5)', [name, employeetype, email, phonenum, img]);
    }
    catch(err)
    {
        console.log(err);
    }
}

/**
 * Updates employee name.
 * @param {string} targetName Current name
 * @param {string} name New name
 * @returns {Promise<void>}
 */
async function updateEmployeeName(targetName, name = ''){
    pool.query('UPDATE employeesce SET name = $1 WHERE name = $2', [name, targetName]);
}

/**
 * Updates employee type.
 * @param {string} targetName Current name
 * @param {string} employeetype New type
 * @returns {Promise<void>}
 */
async function updateEmployeeType(targetName, employeetype = ''){
    pool.query('UPDATE employeesce SET employeetype = $1 WHERE name = $2', [employeetype, targetName]);
}

/**
 * Updates employee email.
 * @param {string} targetName Current name
 * @param {string} email New email
 * @returns {Promise<void>}
 */
async function updateEmployeeEmail(targetName, email = ''){
    pool.query('UPDATE employeesce SET email = $1 WHERE name = $2', [email, targetName]);
}

/**
 * Updates employee phone number.
 * @param {string} targetName Current name
 * @param {string} phonenum New phone number
 * @returns {Promise<void>}
 */
async function updateEmployeePhoneNum(targetName, phonenum){
    pool.query('UPDATE employeesce SET phonenum = $1 WHERE name = $2', [phonenum, targetName]);
}

/**
 * Updates employee profile image.
 * @param {string} targetName Current name
 * @param {*} img Image data
 * @returns {Promise<void>}
 */
async function updateEmployeePfp(targetName, img){
    pool.query('UPDATE employeesce SET img = $1 WHERE name = $2', [img, targetName]);
}

/**
 * Deletes an employee by name.
 * @param {string} name Employee name
 * @returns {Promise<void>}
 */
function deleteEmployee(name){
    pool.query('DELETE FROM employeesce WHERE name = $1', [name]);
}

/**
 * Adds a new inventory item.
 * @param {string} name Item name
 * @param {number} qty Quantity
 * @param {number} unit_price Unit price
 * @param {number} minimum Minimum allowed quantity
 * @returns {Promise<void>}
 */
function addInventoryItem(name, qty, unit_price, minimum)
{
    pool.query('INSERT INTO inventoryce (name, quantity, unit_price, minimum) VALUES ($1, $2, $3, $4)', [name, qty, unit_price, minimum]);
}

/**
 * Updates inventory values after orders.
 * @param {Map<string, number>} usedIngrMap Ingredients used
 * @param {Map<string, number>} inventoryMap Current inventory
 * @returns {void}
 */
function updateInventory(usedIngrMap, inventoryMap){
    for(const [key,value] of usedIngrMap){
        pool.query('UPDATE inventoryce SET quantity = $1 WHERE name = $2', [inventoryMap.get(key) - value, key]);
    };
}

/**
 * Updates fields for an inventory item.
 * @param {string} name Original item name
 * @param {string} newName New name (optional)
 * @param {number|string} qty New quantity
 * @param {number|string} uprice New unit price
 * @param {number|string} minimum New minimum
 * @returns {void}
 */
function updateInventoryItem(name, newName, qty, uprice, minimum){
    if(typeof qty !== 'string'){
        pool.query('UPDATE inventoryce SET quantity = $1 WHERE name = $2', [qty, name]);
    }
    if(typeof uprice !== 'string'){
        pool.query('UPDATE inventoryce SET unit_price = $1 WHERE name = $2', [uprice, name]);
    }
    if(typeof minimum !== 'string'){
        pool.query('UPDATE inventoryce SET minimum = $1 WHERE name = $2', [minimum, name]);
    }
    if(newName.localeCompare('') != 0){
        pool.query('UPDATE inventoryce SET name = $1 WHERE name = $2', [newName, name]);
    }
}

/**
 * Deletes an inventory item.
 * @param {string} name Item name
 * @returns {Promise<void>}
 */
async function deleteInventoryItem(name){
    pool.query('DELETE FROM inventoryce WHERE name = $1', [name]);
}

/**
 * Retrieves stock level for an item.
 * @param {string} name Item name
 * @returns {Promise<any>}
 */
async function checkStock(name){
    try{
        return pool.query('SELECT quantity FROM inventoryce WHERE name = $1', [name]);
    } catch(err) {
        console.log(err);
    }
}

/**
 * Retrieves all stock items.
 * @returns {Promise<any>}
 */
async function getStock(){
    try{
        return pool.query('SELECT name, quantity, minimum FROM inventoryce');
    } catch(err) {
        console.log(err);
    }
}

/**
 * Gets all menu items.
 * @returns {Promise<any>}
 */
async function getMenuItems(){
    try{
        return await pool.query('SELECT * FROM menuce');
    } catch(err) {
        console.log(err);
    }
}

/**
 * Gets all employees.
 * @returns {Promise<any>}
 */
async function getEmployees(){
    try{
        return await pool.query('SELECT * FROM employeesce');
    } catch(err) {
        console.log(err);
    }
}

/**
 * Gets all inventory items.
 * @returns {Promise<any>}
 */
async function getInventory(){
    try{
        return await pool.query('SELECT * FROM inventoryce');
    } catch(err) {
        console.log(err);
    }
}

/**
 * Retrieves ingredient list for a menu item.
 * @param {string} name Menu item name
 * @returns {Promise<any>}
 */
async function getIngredients(name){
    try{
        return await pool.query('SELECT ingredients FROM menuce WHERE name = $1', [name]);
    } catch(err) {
        console.log(err);
    }
}

/**
 * Adds a menu item.
 * @param {string} name
 * @param {number} calories
 * @param {string} type
 * @param {number} price
 * @param {boolean} seasonal
 * @param {string} ingredients
 * @param {*} img
 * @returns {void}
 */
function addMenuItem(name, calories, type, price, seasonal, ingredients, img){
    pool.query('INSERT INTO menuce (name, price, ingredients, itemtype, isseasonal, calories, img) VALUES ($1, $2, $3, $4, $5, $6, $7)', 
        [name, price, ingredients, type, seasonal, calories, img]);
}

/**
 * Updates a menu item.
 * @param {string} name Original name
 * @param {string} newName Updated name
 * @param {number|string} price
 * @param {string} type
 * @param {boolean|string} seasonal
 * @param {number|string} calories
 * @param {string} ingredients
 * @param {*} img
 * @returns {void}
 */
function updateMenuItem(name, newName, price, type, seasonal, calories, ingredients, img){
    if(type.localeCompare('') != 0){
        pool.query('UPDATE menuce SET itemtype = $1 WHERE name = $2', [type, name]);
    }
    if(typeof seasonal !== 'string') {
        pool.query('UPDATE menuce SET isseasonal = $1 WHERE name = $2', [seasonal, name]);
    }
    if(typeof price !== 'string'){
        pool.query('UPDATE menuce SET price = $1 WHERE name = $2', [price, name]);
    }
    if(typeof calories !== 'string'){
        pool.query('UPDATE menuce SET calories = $1 WHERE name = $2', [calories, name]);
    }
    if(ingredients.localeCompare('') != 0){
        pool.query('UPDATE menuce SET ingredients = $1 WHERE name = $2', [ingredients, name]);
    }
    if(img != null) {
        pool.query('UPDATE menuce SET img = $1 WHERE name = $2', [img, name]);
    }
    if(newName.localeCompare('') != 0){
        pool.query('UPDATE menuce SET name = $1 WHERE name = $2', [newName, name]);
    }
}

/**
 * Updates ingredient list for a menu item.
 * @param {string} name Menu item name
 * @param {string} newList New ingredients list
 * @returns {Promise<void>}
 */
async function updateMenuIngr(name, newList){
    pool.query('UPDATE menuce SET ingredients = $1 WHERE name = $2', [newList,name]);
}

/**
 * Deletes a menu item.
 * @param {string} itemName Name of menu item
 * @returns {Promise<void>}
 */
function deleteMenuItem(itemName){
    pool.query('DELETE FROM menuce WHERE name = $1', [itemName]);
}

/**
 * Runs a predefined report.
 * @param {string} reportName Report type
 * @returns {Promise<any>}
 */
async function getReport(reportName)
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
        return await pool.query(qry);
    }
    catch(err)
    {
        console.log(err);
    }
}

/**
 * Retrieves X-report (orders up to current hour).
 * @returns {Promise<any[]>}
 */
async function getXReport() {
    try {
        
        const qry = `
            SELECT EXTRACT(HOUR FROM time) AS hour, item, qty, price
            FROM orderhistoryce
            WHERE "date" = $1 AND EXTRACT(HOUR FROM time) <= $2`;
            
        const now = new Date();
        const res = await pool.query(
            qry, 
            [
                now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate(), 
                now.getHours()
            ]);
        return res.rows;
    } catch (err) {
        console.error(err);
    }
}

/**
 * Filters order history between two dates.
 * @param {string} startDate YYYY-MM-DD
 * @param {string} endDate YYYY-MM-DD
 * @returns {Promise<any>}
 */
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

/**
 * Adds orders to orderhistoryce.
 * Each order must contain: id, date, time, item, qty, price.
 * @param {Array<{name:string, quantity:number}>} orderArray
 * @returns {Promise<void>}
 */
async function addOrders(orderArray){
    var res = await pool.query('SELECT MAX(id) FROM orderhistoryce');
    const id = res.rows[0].max;
    const now = new Date();
    const corrMonth = parseInt(now.getMonth())+1;

    var date = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();
    var time = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
    var i = 1;
    for(const order of orderArray) {
        res = await pool.query('SELECT price FROM menuce WHERE name = $1', [order.name]);
        var price = res.rows[0].price;
        pool.query('INSERT INTO orderhistoryce (id, date, time, item, qty, price, status) VALUES ($1, $2, $3, $4, $5, $6, $7)',
            [id+i, date, time, order.name, order.quantity, price, "pending"]);
        i += 1;
    };
}

/**
 * Returns employee type based on email or username.
 * @param {string} email Email or username
 * @returns {Promise<string>} User type, or "DNE"
 */
async function employeeAuth(email) {
    const res = await pool.query('SELECT username, password, usertype, email FROM usersce');

    for(let i = 0; i < res.rows.length; i++) {
        const row = res.rows[i];

        if (row.email === email || row.username === email) {
            return row.usertype;
        }
    }

    return "DNE";
}

/**
 * Generic database query wrapper.
 * @param {string} query SQL query
 * @param {Array<any>} params Parameter array
 * @returns {Promise<any>}
 */
async function dataQuery(query, params) {
    return await pool.query(query, params);
}

export default {
    dataQuery,
    addOrders,
    addUser,
    addCustomer,
    validateCustomer,
    validateEmployee,
    deleteMenuItem,
    getMenuItems,
    addMenuItem,
    updateMenuItem,
    updateMenuIngr,
    addEmployee,
    addInventoryItem,
    updateInventoryItem,
    deleteInventoryItem,
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
    updateEmployeeType,
    updateEmployeePfp,
    updateInventory,
    getEmployees,
    getInventory,
    getXReport,
    employeeAuth
};
