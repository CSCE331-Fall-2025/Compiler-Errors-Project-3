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

//Used for testing addOrders in testQuery
async function getIngredientList(name){ 
    const res = await getIngredients(name);
    var temp = res.rows[0].ingredients;
    var temp2 = temp.split(', ');
    return temp2;
}

//Not to be actually used. Use this as a test site for all connections
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
    //const data = await response.json();
    //console.log("Translated:", data.translation_text);
}

//Account Management
async function validateEmployee(username, password){
    const res = await pool.query('SELECT name, employeetype, email, phonenum FROM usersce');

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

//Employee Management
async function addEmployee(name = '', employeetype = '', email = '', phonenum = '', img)
{

    // TO BE IMPLEMENTED: Add img column to database, add img to INSERT. 
    try
    {
        return pool.query('INSERT INTO employeesce (name, employeetype, email, phonenum, img) VALUES ($1, $2, $3, $4, $5)', [name, employeetype, email, phonenum, img]);
    }
    catch(err)
    {
        console.log(err);
    }
}

async function updateEmployeeName(targetName, name = ''){
    pool.query('UPDATE employeesce SET name = $1 WHERE name = $2', [name, targetName]);
}

async function updateEmployeeType(targetName, employeetype = ''){
    pool.query('UPDATE employeesce SET employeetype = $1 WHERE name = $2', [employeetype, targetName]);
}

async function updateEmployeeEmail(targetName, email = '', phonenum = ''){
    pool.query('UPDATE employeesce SET email = $1 WHERE name = $2', [email, targetName]);
}

async function updateEmployeePhoneNum(targetName, phonenum){
    pool.query('UPDATE employeesce SET phonenum = $1 WHERE name = $2', [phonenum, targetName]);
}

async function updateEmployeePfp(targetName, img){
    pool.query('UPDATE employeesce SET img = $1 WHERE name = $2', [img, targetName]);
}

function deleteEmployee(name){
    pool.query('DELETE FROM employeesce WHERE name = $1', [name]);
}

//Managing Inventory
function addInventoryItem(name, qty, unit_price, minimum)
{
    pool.query('INSERT INTO inventoryce (name, quantity, unit_price, minimum) VALUES ($1, $2, $3, $4)', [name, qty, unit_price, minimum]);
}

//Used in updating orders
function updateInventory(usedIngrMap, inventoryMap){
    for(const [key,value] of usedIngrMap){
        pool.query('UPDATE inventoryce SET quantity = $1 WHERE name = $2', [inventoryMap.get(key) - value, key]);
    };
}

//Used in manager side
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

async function deleteInventoryItem(name){
    pool.query('DELETE FROM inventoryce WHERE name = $1', [name]);
}

async function checkStock(name){
    try{
        return pool.query('SELECT quantity FROM inventoryce WHERE name = $1', [name]);
    } catch(err) {
        console.log(err);
    }
}

async function getStock(){
    try{
        return pool.query('SELECT name, quantity, minimum FROM inventoryce');
    } catch(err) {
        console.log(err);
    }
}

//Menu Management
async function getMenuItems(){
    try{
        return await pool.query('SELECT * FROM menuce');
    } catch(err) {
        console.log(err);
    }
}

async function getEmployees(){
    try{
        return await pool.query('SELECT * FROM employeesce');
    } catch(err) {
        console.log(err);
    }
}

async function getInventory(){
    try{
        return await pool.query('SELECT * FROM inventoryce');
    } catch(err) {
        console.log(err);
    }
}

async function getIngredients(name){
    try{
        return await pool.query('SELECT ingredients FROM menuce WHERE name = $1', [name]);
    } catch(err) {
        console.log(err);
    }
}

function addMenuItem(name, calories, type, price, seasonal, ingredients, img){
    pool.query('INSERT INTO menuce (name, price, ingredients, itemtype, isseasonal, calories, img) VALUES ($1, $2, $3, $4, $5, $6, $7)', 
        [name, price, ingredients, type, seasonal, calories, img]);
}

function updateMenuItem(name, newName, price, type, seasonal, calories, ingredients, img){
    console.log("Testing: ", name, newName, price, type, seasonal, calories, ingredients);

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

async function updateMenuIngr(name, newList){
    pool.query('UPDATE menuce SET ingredients = $1 WHERE name = $2', [newList,name]);
}

function deleteMenuItem(itemName){
    pool.query('DELETE FROM menuce WHERE name = $1', [itemName]);
}

//Misc Functions
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
 * 
 * @param {*} currentHour Integer (1 = 1AM, 24 = 12AM)
 * @param {*} date String. Format is 'XXXX-XX-XX' (Year, month, day)
 * @returns Array of order entries
 */
async function getXReport(currentHour, date) {
    try {
        const qry = `
            SELECT EXTRACT(HOUR FROM time) AS hour, item, qty, price
            FROM orderhistoryce
            WHERE "date" = $1 AND EXTRACT(HOUR FROM time) < $2`;
            
        const res = await pool.query(qry, [date, currentHour]);
        return res.rows;
    } catch (err) {
        console.error(err);
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
    var res = await pool.query('SELECT MAX(id) FROM orderhistoryce');
    const id = res.rows[0].max;
    const now = new Date();
    const corrMonth = parseInt(now.getMonth())+1;

    var date = now.getFullYear() + '-' + corrMonth.toString() + '-' + now.getDate();
    var time = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
    var i = 1;
    for(const order of orderArray) {
        res = await pool.query('SELECT price FROM menuce WHERE name = $1', [order.name]);
        var price = res.rows[0].price;
        pool.query('INSERT INTO orderhistoryce (id, date, time, item, qty, price) VALUES ($1, $2, $3, $4, $5, $6)',
            [id+i, date, time, order.name, order.quantity, price]
        );
        i += 1;
    };
}



export default {
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
    getXReport
};