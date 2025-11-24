import React from 'react';
import dbConn from './db.js';
import dotenv from 'dotenv';
import findConfig from 'find-config';
dotenv.config({ path: findConfig('.env') });

//Required APIs, Google Translate, Auth (google or otherwise), Place, Weather

async function createMenuItemArray()
{
    //res.rows[i]."type" gets the value of that field
    //Gets name, price, and ingredients
    const res = await dbConn.getMenuItems();

    //For each row
    let menuItemArray = res.rows.map(row => ({
        img: row.img ? row.img.toString("base64") : null,
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
        phone: row.phonenum,
        img: row.img ? row.img.toString("base64") : null
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

async function addEmployee(name, role, email, phone, img) {
    await dbConn.addEmployee(name, role, email, phone, img);
}

async function updateEmployee(name, newName, role, email, phone, img) {
    const res1 = await dbConn.updateEmployeeType(name, role);
    const res2 = await dbConn.updateEmployeeEmail(name, email);
    const res3 = await dbConn.updateEmployeePhoneNum(name, phone);

    if(img != null) {
        const res4 = await dbConn.updateEmployeePfp(name, img);
    }

    const res5 = await dbConn.updateEmployeeName(name, newName);
}

async function updateInventoryItem(name, newName, qty, uprice, minimum) {
    await dbConn.updateInventoryItem(name, newName, qty, uprice, minimum);
}

async function updateMenuItem(name, newName, price, type, seasonal, calories, img) {
    await dbConn.updateMenuItem(name, newName, price, type, seasonal, calories, "", img);
}

async function addMenuItem(name, calories, type, price, seasonal, ingredients, imgbuf) {
    await dbConn.addMenuItem(name, calories, type, price, seasonal, ingredients, imgbuf);
}

async function addInventoryItem(name, qty, uprice, min) {
    await dbConn.addInventoryItem(name, qty, uprice, min);
}

//External API calls
async function getWeatherAPI(){
    const apiKey = process.env.WEATHERAPI_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${'Houston, Tx'}&appid=${apiKey}&units=imperial`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(`Weather in ${city}:`, data.weather[0].description);
        console.log(`Temperature: ${data.main.temp}°F`);
    } catch (error) {
        console.error('Error fetching weather:', error);
    }

}

async function getPlacesAPI(){
    const apiKey = process.env.PLACEAPI_KEY;
    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent('Panda Express')}&radius=${50000}&key=${apiKey}`;

    //Location Constraint url
    //const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent('Panda Express')}&location=${lat},${lng}&radius=${50000}&key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        data.results.forEach(place => {
            console.log(`Name: ${place.name}`);
            console.log(`Address: ${place.formatted_address}`);
        });
        console.log(data);
    } catch (error) {
        console.error('Error fetching places:', error);
    }
}


export default {
    createMenuItemArray,
    getIngredientList,
    getEmployees,
    getInventory,
    updateEmployee,
    updateInventoryItem,
    updateMenuItem,
    addEmployee,
    addMenuItem,
    addInventoryItem
}