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
        price: `$${row.price.toFixed(2)}`,
        type: row.itemtype
    }));

    //Prepare restrictions
    let restrictedMenu = new Array();
    const temp = await dbConn.getStock();
    const inventoryMap = new Map(res.rows.map(row => [row.name,row.quantity]));
    const stockLevel = new Map(res.rows.map(row => [row.name,row.minimum]));

    //For each menu item, if their ingredients are not below minimum required stock, then display.
    menuItemArray.forEach(obj => {
        const ingrList = getIngredientList(obj.alt);
        var flag = true;
        
        ingrList.forEach(name => {
            if(inventoryMap.get(name) < stockLevel.get(minimum)){
                flag = false;
            }
        });

        if(flag){
            restrictedMenu.push(obj);
        }
    });

    return restrictedMenu;
}

async function getIngredientList(name){ 
    const res = await dbConn.getIngredients(name);
    return res.rows[0].split(", ");
}

export default {
    createMenuItemArray,
    getIngredientList
}