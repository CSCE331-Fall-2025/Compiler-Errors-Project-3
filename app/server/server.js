import express from "express";
import cors from "cors";
import functions from './function.js';
import dbConn from './db.js';
const { 
    createMenuItemArray, 
    addEmployee, 
    updateEmployee,
    addMenuItem, 
    updateMenuItem,
    addInventoryItem,
    updateInventoryItem,
    deleteMenuItem,
    deleteEmployee,
    } = functions;

//Inside App, npm run dev
//Inside App/server, node server.js
    
console.log("Server.js starting");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/OrderMenu/fetchMenu", async (req, res) => {
    try {
        const menu = await createMenuItemArray();
        res.json(menu);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
//addEmployee
app.post("/api/Manager/addEmployee", async (req, res) => {
    try {
        const { name, role, email, phone } = req.body;
        console.log("Attempting");

        try {
            await addEmployee(name, role, email, phone);
        } catch (err) {
            console.error("add error: ", err);
            throw err;
        }
        console.log("Succeeded");
        res.status(200).json({ message: "Employee added successfully" });
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});
//updateEmployee
app.post("/api/Manager/updateEmployee", async (req, res) => {
    try{
        const {targetName, name, role, email, phone} = req.body;
        console.log("attempting");
        try{
            await updateEmployee(targetName, name, role, email, phone);
        }
        catch(err){
            console.error("add error: ", err);
            throw err;
        }
        console.log("Succeeded");
        res.status(200).json({ message: "Employee updated successfully" });
    }
    catch(err){
        console.error(err);
        res.status(500).json({error: "Failed to update employee"});
    }
});
//deleteEmployee
app.post("/api/Manager/deleteEmployee", async (req, res) => {
    try{
        const {name} = req.body;
        console.log("attempting");
        try{
            await deleteEmployee(name);
        }
        catch(err){
            console.error("add error: ", err);
            throw err;
        }
        console.log("Succeeded");
        res.status(200).json({ message: "Employee fired successfully" });
    }
    catch(err){
        console.error(err);
        res.status(500).json({error: "Failed to fire employee"});
    }
});

//deleteMenuItem
app.post("/api/Manager/deleteMenuItem", async (req, res) => {
    try{
        const {name} = req.body;
        console.log("Attempting: ", name);
        try{
            await deleteMenuItem(name);
        }
        catch(err){
            console.error("add error: ", err);
            throw err;
        }
        console.log("Succeeded");
      res.status(200).json({ message: "Menu item deleted" });
    }
    catch(err){
        console.error(err);
        res.status(500).json({error: "Failed to delete menu item"});
    }
});

//addInventoryItem
app.post("/api/Manager/addInventoryItem", async (req, res) => {
    try{
        const {name, qty, unit_price} = req.body;
        console.log("attempting");
        try{
            await addInventoryItem(name, qty, unit_price);
        }
        catch(err){
            console.error("add error: ", err);
            throw err;
        }
        console.log("Succeeded");
        res.status(200).json({ message: "Inventory item added" });
    }
    catch(err){
      console.error(err);
      res.status(500).json({error: "Failed to add inventory item"});
    }
});

app.post("/api/Manager/updateEmployee", async (req, res) => {
    try {
        const { name, newName, role, email, phone } = req.body;
        console.log("Attempting: ", name, newName, role, email, phone);

        try {
            await updateEmployee(name, newName, role, email, phone);
        } catch (err) {
            console.error("update error: ", err);
            throw err;
        }

        console.log("Succeeded");
        res.status(200).json({ message: "Employee added successfully" });
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

app.post("/api/Manager/addMenuItem", async (req, res) => {
    try {
        const { name, price, ingredients } = req.body;
        
        try {
            await addMenuItem(name, price, ingredients);
        } catch {
            console.error("add error: ", err);
            throw err;
        }

        res.status(200).json({ message: "Menu item added successfully" });
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

app.post("/api/Manager/updateMenuItem", async (req, res) => {
    try {
        const { name, newName, price, ingredients } = req.body;
        
        try {
            console.log("Testing");
            await updateMenuItem(name, newName, price, ingredients);
        } catch (err) {
            console.error("add error: ", err);
            throw err;
        }

        res.status(200).json({ message: "Menu item updated successfully" });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({error: err.message});
    }
});

app.post("/api/Manager/updateInventoryItem", async (req, res) => {
    try {
        const { name, newName, qty, uprice } = req.body;
        
        try {
            console.log("Testing");
            await updateInventoryItem(name, newName, qty, uprice);
        } catch (err) {
            console.error("add error: ", err);
            throw err;
        }

        res.status(200).json({ message: "Inventory item updated successfully" });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({error: err.message});
    }
});

//addOrders
app.post("/api/Cashier/addOrders", async (req, response) => {
    //Gets inventory
    const res = await dbConn.getStock();
    const inventoryMap = new Map(res.rows.map(row => [row.name,row.quantity]));
    const usedIngrMap = new Map();
    try {
        //Get the orders
        const { orders } = req.body; 
        console.log(orders);
        
        //Get ingredients used
        orders.forEach((order) => {
            const quantity = order.quantity;
            //Gets ingredients for order
            var ingrList = getIngredientList(order.name);
            
            //For each ingredient
            for(let i = 0; i < ingrList.length; i++){
                //If ingredient hasn't been used, initialize
                if(usedIngrMap.get(ingrList[i]) === undefined){
                    usedIngrMap.set(ingrList[i], 0);
                }
                usedIngrMap.set(ingrList[i], usedIngrMap.get(ingrList[i]) + quantity);
            }

            //Add is sides
            const addArr = order.add;
            for(let i = 0; i < addArr.length; i++){
                ingrList = getIngredientList(addArr[i]);
                for(let j = 0; i < ingrList.length; i++)
                {
                    if(usedIngrMap.get(ingrList[j]) === undefined){
                        usedIngrMap.set(ingrList[j], 0);
                    }
                    usedIngrMap.set(addArr[j], usedIngrMap.get(ingrList[j]) + quantity);
                }
            }

            //Remove quantity amount of some ingredient
            const subArr = order.sub;
            for(let i = 0; i < subArr.length; i++){
                usedIngrMap.set(subArr[i], usedIngrMap.get(subArr[i]) + quantity);
            }
        });

        var flag = true;
        //Check if exceeds stock
        usedIngrMap.forEach((value, key) => {
            if(value > inventoryMap.get(key)){
                flag = false;
            }
        });

        //If exceeds, error. Else, add to inventory
        if(!flag){
            throw new TypeError('Quantity Exceeds Inventory Stock');
        }
        else{
            dbConn.addOrders(orders);
            await dbConn.updateInventory(usedIngrMap,inventoryMap);
            response.status(200).json({ message: "Orders uploaded!", status: true });
        }

    } catch (err) {
        console.log(err.message);
        response.status(500).json({error: err.message});
    }
})

app.listen(3000, () => console.log("Server running on port 3000"));

/*
Template post
app.post("", async (req, res) => {
    try {
  
    } catch (err) {
        console.log(err.message);
        res.status(500).json({error: err.message}); 
    }
})
*/