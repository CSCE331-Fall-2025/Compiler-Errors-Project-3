import React from 'react';
import dbConn from './db.js';
import dotenv from 'dotenv';
import findConfig from 'find-config';
dotenv.config({ path: findConfig('.env') });

/**
 * Builds an array of menu item objects with formatted fields.
 * @returns {Array}
 */
async function createMenuItemArray()
{
    const res = await dbConn.getMenuItems();

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

/**
 * Retrieves a list of ingredient names for a menu item.
 * @param {string} name
 * @returns {Promise<string[]>}
 */
async function getIngredientList(name){ 
    const res = await dbConn.getIngredients(name);
    return res.rows[0].ingredients.split(", ");
}

/**
 * Retrieves formatted employee data.
 * @returns {Array}
 */
async function getEmployees() {
    const res = await dbConn.getEmployees();

    let employees = res.rows.map(row => ({
        name: row.name,
        type: row.employeetype,
        email: row.email,
        phone: row.phonenum,
        img: row.img ? row.img.toString("base64") : null
    }));

    return employees;
}

/**
 * Retrieves inventory items.
 * @returns {Array}
 */
async function getInventory() {
    const res = await dbConn.getInventory();

    let inventory = res.rows.map(row => ({
        name: row.name,
        quantity: row.quantity,
        unit_price: row.unit_price,
        minimum: row.minimum
    }));

    return inventory;
}

/**
 * Adds a new employee.
 * @param {string} name
 * @param {string} role
 * @param {string} email
 * @param {string} phone
 * @param {*} img
 * @returns {Promise<void>}
 */
async function addEmployee(name, role, email, phone, img) {
    await dbConn.addEmployee(name, role, email, phone, img);
}

/**
 * Updates an employee record.
 * @param {string} name Existing employee name
 * @param {string} newName Updated name
 * @param {string} role Updated role
 * @param {string} email Updated email
 * @param {string} phone Updated phone number
 * @param {*} img Updated profile image buffer
 * @returns {Promise<void>}
 */
async function updateEmployee(name, newName, role, email, phone, img) {
    const res1 = await dbConn.updateEmployeeType(name, role);
    const res2 = await dbConn.updateEmployeeEmail(name, email);
    const res3 = await dbConn.updateEmployeePhoneNum(name, phone);

    if(img != null) {
        const res4 = await dbConn.updateEmployeePfp(name, img);
    }

    const res5 = await dbConn.updateEmployeeName(name, newName);
}

/**
 * Updates an inventory item.
 * @param {string} name
 * @param {string} newName
 * @param {number|string} qty
 * @param {number|string} uprice
 * @param {number|string} minimum
 * @returns {Promise<void>}
 */
async function updateInventoryItem(name, newName, qty, uprice, minimum) {
    await dbConn.updateInventoryItem(name, newName, qty, uprice, minimum);
}

/**
 * Updates a menu item.
 * @param {string} name
 * @param {string} newName
 * @param {number|string} price
 * @param {string} type
 * @param {boolean|string} seasonal
 * @param {number|string} calories
 * @param {*} img
 * @returns {Promise<void>}
 */
async function updateMenuItem(name, newName, price, type, seasonal, calories, img) {
    await dbConn.updateMenuItem(name, newName, price, type, seasonal, calories, "", img);
}

/**
 * Adds a new menu item.
 * @param {string} name
 * @param {number} calories
 * @param {string} type
 * @param {number} price
 * @param {boolean} seasonal
 * @param {string} ingredients
 * @param {*} imgbuf
 * @returns {Promise<void>}
 */
async function addMenuItem(name, calories, type, price, seasonal, ingredients, imgbuf) {
    await dbConn.addMenuItem(name, calories, type, price, seasonal, ingredients, imgbuf);
}

/**
 * Adds an inventory item.
 * @param {string} name
 * @param {number} qty
 * @param {number} uprice
 * @param {number} min
 * @returns {Promise<void>}
 */
async function addInventoryItem(name, qty, uprice, min) {
    await dbConn.addInventoryItem(name, qty, uprice, min);
}

/**
 * Retrieves weather information from OpenWeather API.
 * Defaults to Houston, TX if no coordinates given.
 * @param {number} [lat=29.7604]
 * @param {number} [long=-95.3698]
 * @returns {Promise<any>}
 */
async function getWeatherAPI(lat = 29.7604, long = -95.3698){
    const apiKey = process.env.WEATHERAPI_KEY;
    const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${long}&appid=${apiKey}&exclude=${'minutely','hourly','alerts'}&units=imperial`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching weather:', error);
    }

}

/**
 * Retrieves Google Places API results for Panda Express.
 * @param {number} lat
 * @param {number} long
 * @returns {Promise<any[]>}
 */
async function getPlacesAPI(lat, long){
    const apiKey = process.env.PLACEAPI_KEY;
    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent('Panda Express')}&radius=${50000}&key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);

        const results = data.results;
        return results;
    } catch (error) {
        console.error('Error fetching places:', error);
    }
}

/**
 * Translates text to Spanish using NLP Cloud.
 * @param {string} text
 * @returns {Promise<void>}
 */
async function translateText(text) {
    const response = await fetch("https://api.nlpcloud.io/v1/nllb-200-3.3b/translation", {
        method: "POST",
        headers: {
        "Authorization": `Token ${process.env.NLP_API_KEY}`,
        "Content-Type": "application/json"
        },
        body: JSON.stringify({
        text: text,
        source: "en",
        target: "es"
        })
    });

    const data = await response.json();
    console.log("Translated:", data.translation_text);
}

/**
 * Adds a list of orders to the system.
 * @param {Array<{name:string,quantity:number}>} orders
 * @returns {Promise<void>}
 */
async function addOrder(orders) {
    await dbConn.addOrders(orders);
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
    addInventoryItem,
    getWeatherAPI,
    getPlacesAPI,
    addOrder
}
