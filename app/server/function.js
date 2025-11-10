import React from 'react';
import dbConn from './db.js';

async function addEmployee(name, employeetype, email, phonenum)
{
    //Get variables

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

function addMenuItemBtn()
{
    //Get variables
    var name;
    var price;
    var ingredients;

    dbConn.addMenuItem(name,price,ingredients);
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

export default {
    createMenuItemArray,
    addEmployee,
    updateEmployee
}