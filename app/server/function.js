import React from 'react';
import dbConn from './db.js';

//Required APIs, Google Translate, Auth (google or otherwise), Place, Weather

async function createMenuItemArray()
{
    //res.rows[i]."type" gets the value of that field
    //Gets name, price, and ingredients
    const res = await dbConn.getMenuItems();

    //For each row
    let menuItemArray = res.rows.map((row) => ({
        img: 'images/Orange Chicken.png',
        alt: row.name,
        title: row.name,
        cal: row.calories + " cal",
        price: `$${row.price.toFixed(2)}`
    }));

    //Prepare restrictions
    const restrictedMenu = new Array();
    const temp = await dbConn.getStock();
    const inventoryMap = new Map(temp.rows.map(row => [row.name,row.quantity]));
    const stockLevel = new Map(temp.rows.map(row => [row.name,row.minimum]));

    //For each menu item, if their ingredients are not below minimum required stock, then display.
    for (const obj of menuItemArray) {
        const ingrList = await getIngredientList(obj.alt);
        let flag = true;

        for (const name of ingrList) {
            if (inventoryMap.get(name) < stockLevel.get(name)) {
                flag = false;
                break;
            }
        }

        if (flag) {
            restrictedMenu.push(obj);
        }
    }
    
    return restrictedMenu;
}

async function getIngredientList(name){ 
    const res = await dbConn.getIngredients(name);
    var temp = res.rows[0].ingredients;
    var temp2 = temp.split(', ');
    return temp2;
}

export default {
    createMenuItemArray,
    getIngredientList
}