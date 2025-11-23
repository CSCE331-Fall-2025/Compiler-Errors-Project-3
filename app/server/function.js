import React from 'react';
import dbConn from './db.js';

//Required APIs, Google Translate, Auth (google or otherwise), Place, Weather

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
        price: `$${row.price.toFixed(2)}`,
        type: row.itemtype,
        seasonal: row.isseasonal
    }));

    return menuItemArray;
}

async function getIngredientList(name){ 
    const res = await dbConn.getIngredients(name);
    return res.rows[0].split(", ");
}

async function getEmployees() {
    const res = await dbConn.getEmployees();

    //For each row
    let employees = res.rows.map(row => ({
        name: row.name,
        type: row.employeetype,
        email: row.email,
        phone: row.phonenum
    }));

    return employees;
}

async function getInventory() {
    const res = await dbConn.getInventory();

    //For each row
    let inventory = res.rows.map(row => ({
        name: row.name,
        quantity: row.quantity,
        unit_price: row.unit_price,
        minimum: row.minimum
    }));

    return inventory;
}

async function updateEmployee(name, newName, role, email, phone) {
    const res1 = await dbConn.updateEmployeeType(name, role);
    const res2 = await dbConn.updateEmployeeEmail(name, email);
    const res3 = await dbConn.updateEmployeePhoneNum(name, phone);
    const res4 = await dbConn.updateEmployeeName(name, newName);
}

async function updateInventoryItem(name, newName, qty, uprice, minimum) {
    await dbConn.updateInventoryItem(name, newName, qty, uprice, minimum);
}

async function updateMenuItem(name, newName, price, type, seasonal, calories) {
    await dbConn.updateMenuItem(name, newName, price, type, seasonal, calories, "");
}


export default {
    createMenuItemArray,
    getIngredientList,
    getEmployees,
    getInventory,
    updateEmployee,
    updateInventoryItem,
    updateMenuItem
}