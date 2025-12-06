import React from 'react';
import dbConn from './db.js';
import dotenv from 'dotenv';
import findConfig from 'find-config';
dotenv.config({ path: findConfig('.env') });

//Required APIs, Google Translate, Auth (google or otherwise), Place (done), Weather (done)

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
    return res.rows[0].ingredients.split(", ");
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
async function getWeatherAPI(lat = 29.7604, long = -95.3698){
    const apiKey = process.env.WEATHERAPI_KEY;
    //Houston Lat and Long: 29.7604, -95.3698
    //Defaults to Houston if no input
    const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${long}&appid=${apiKey}&exclude=${'minutely','hourly','alerts'}&units=imperial`;

    try {
        //Fetch query from API and send response to data
        const response = await fetch(url);
        const data = await response.json();
        
        /*
        Current Fields: (data.current)
            temp - Temperature (Configured for Imperial/Fahrenheit)
            humidity - Humidity in %
            weather - Array of objects
                weather.main - Weather type
                weather.description - Further details on weather type
            feels_like - Feels Like X degrees (Configured for Imperial/Fahrenheit)
        Daily Fields: (data.daily[X]; 0 is today)
            temp - Now an array of fields
                temp.morn - Morning time temp
                temp.day - Temp during the day
                temp.eve - Evening time temp
                temp.night - Night time temp
                temp.min - Low of X degrees
                temp.max - High of X degrees
            weather - Same as Current
        Alerts Fields: (data.alert[X])
            sender_name - who sent the alert
            event - Name of the alert
            description - Wall of text from the sender
        */
        return data;
    } catch (error) {
        console.error('Error fetching weather:', error);
    }

}

async function getPlacesAPI(lat, long){
    const apiKey = process.env.PLACEAPI_KEY;
    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent('Panda Express')}&radius=${50000}&key=${apiKey}`;

    //Location Constraint url
    //const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent('Panda Express')}&location=${lat},${lng}&radius=${50000}&key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        const results = data.results;
        /*
        Fields:
            name - Name of place. SHOULD always be 'Panda Express'
            formatted_address - Address, with road, city, state + zip code, country
            rating - rating according to google. 0.0 to 5.0 I presume (to reflect stars)
            opening_hours - contains an object with a field that is called open_now. That's it?
            photo_reference - Base 64 string I think
            types - Array containing all tags of that location (meal_delivery, meal_takeaway, etc)
         */
        return results;
    } catch (error) {
        console.error('Error fetching places:', error);
    }
}

//PLEASE BE CAREFUL USING THIS, I DON'T THINK I HAVE TOO MANY CALLS BEFORE IT STARTS COSTING ME
//Might not work lol
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