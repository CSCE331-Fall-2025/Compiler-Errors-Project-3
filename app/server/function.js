import React from 'react';
import dbConn from './db.js';

async function addEmployee(name, employeetype, email, phonenum)
{
    dbConn.addEmployee(name,employeetype,email,phonenum);
}

async function updateEmployee(targetName, name, employeetype, email, phonenum)
{
    dbConn.updateEmployee(targetName,name,employeetype,email,phonenum);
}

async function deleteEmployee(name) 
{
    dbConn.deleteEmployee(name);
}

async function deleteMenuItem(name)
{
    dbConn.deleteMenuItem(name);
}

async function addInventoryItem(name, qty, unit_price)
{
    dbConn.addInventoryItem(name, qty, unit_price);
}

async function createMenuItemArray()
{
    //res.rows[i]."type" gets the value of that field
    //Gets name, price, and ingredients
    const res = await dbConn.getMenuItems();

    //For each row
    let menuItemArray = res.rows.map(row => ({
        img: 'images/Orange Chicken.png',
        alt: row.name,
        title: row.name,
        cal: row.calories + " cal",
        price: `$${row.price.toFixed(2)}`
    }));

    return menuItemArray;
}

async function addMenuItem(name, price, ingredients)
{
    dbConn.addMenuItem(name,price,ingredients);
}

async function updateMenuItem(name, newName, price, ingredients)
{
    dbConn.updateMenuItem(name, newName, price,ingredients);
}

async function updateInventoryItem(name, newName, qty, uprice)
{
    dbConn.updateInventoryItem(name, newName, qty, uprice);
}


function getReportBtn()
{
    //Get query type
    var type;
    
    //Exact same queries and checking logic from P2
    const res = dbConn.getReport(type);

    //Insert formatting here?
}

function filteredOrderHistoryBtn()
{
    //Get start/end dates
    var startDate;
    var endDate;

    if(endDate < startDate)
    {
        //Insert error here?
    }

    const res = dbConn.filterOrderHistory(startDate,endDate);
}

function deleteMenuItemBtn()
{
    //Get name
    var targetName;

    //The "true" is supposed to be an authentication value to prevent unauthorized deletion. Currently disabled and bypassed
    dbConn.deleteMenuItem(true, targetName);
}

async function getIngredientList(name)
{
    const res = await dbConn.getIngredients();
    return res.rows[0].split(", ");
}

//Need addInventoryItem function

export default {
    createMenuItemArray,
    addEmployee,
    updateEmployee,
    addMenuItem,
    updateMenuItem,
    updateInventoryItem,
    deleteEmployee,
    deleteMenuItem,
    addInventoryItem,
    getIngredientList
}