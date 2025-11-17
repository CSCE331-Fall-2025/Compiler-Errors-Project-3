import React from 'react';
import dbConn from './db.js';

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

async function getIngredientList(name)
{
    const res = await dbConn.getIngredients();
    return res.rows[0].split(", ");
}

export default {
    createMenuItemArray,
    getIngredientList
}