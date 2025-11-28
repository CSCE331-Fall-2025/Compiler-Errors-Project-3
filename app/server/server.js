import express from "express";
import cors from "cors";
import functions from './function.js';
import dbConn from './db.js';
import multer from "multer";
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
    getEmployees,
    getInventory
    } = functions;

//Inside App, npm run dev
//Inside App/server, node server.js
    
console.log("Server.js starting");

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

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

app.get("/api/Manager/fetchEmployees", async (req, res) => {
    try {
        const employees = await getEmployees();
        res.json(employees);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get("/api/Manager/fetchInventory", async (req, res) => {
    try {
        const employees = await getInventory();
        res.json(employees);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//addEmployee
app.post("/api/Manager/addEmployee", upload.single("img"), async (req, res) => {
    try {
        const { name, role, email, phone } = req.body;
        const imgbuf = req.file ? req.file.buffer : null;
        console.log("Attempting");

        try {
            await addEmployee(name, role, email, phone, imgbuf);
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
app.post("/api/Manager/updateEmployee", upload.single("img"), async (req, res) => {
    try{
        const {name, newName, role, email, phone} = req.body;
        const imgbuf = req.file ? req.file.buffer : null;
        console.log("attempting");
        try{
            await updateEmployee(name, newName, role, email, phone, imgbuf);
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
        const {name, qty, unit_price, minimum} = req.body;
        console.log("attempting");
        try{
            await addInventoryItem(name, qty, unit_price, minimum);
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

app.post("/api/Manager/addMenuItem", upload.single("img"), async (req, res) => {
    try {
        const { name, calories, type, price, seasonal, ingredients } = req.body;
        const imgbuf = req.file ? req.file.buffer : null;
        
        try {
            await addMenuItem(name, calories, type, price, seasonal, ingredients, imgbuf);
        } catch {
            console.error("add error: ", err);
            throw err;
        }

        res.status(200).json({ message: "Menu item added successfully" });
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

app.post("/api/Manager/updateMenuItem", upload.single("img"), async (req, res) => {
    try {
        console.log(req.body);
        const { name, newName, price, type, seasonal, cal } = req.body;
        const imgbuf = req.file ? req.file.buffer : null;
        
        try {
            await updateMenuItem(name, newName, price, type, seasonal, cal, imgbuf);
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
        const { name, newName, qty, uprice, minimum } = req.body;
        
        try {
            console.log("Testing: ", name, newName, qty, uprice, minimum);
            await updateInventoryItem(name, newName, parseInt(qty), parseFloat(uprice), parseInt(minimum));
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
        for(let k = 0; k < orders.length; k++) {
            const order = orders[k];
            const quantity = order.quantity;
            //Gets ingredients for order
            var ingrList = await getIngredientList(order.name);
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
                ingrList = await getIngredientList(addArr[i]);
                for(let j = 0; j < ingrList.length; j++)
                {
                    if(usedIngrMap.get(ingrList[j]) === undefined){
                        usedIngrMap.set(ingrList[j], 0);
                    }
                    usedIngrMap.set(ingrList[j], usedIngrMap.get(ingrList[j]) + quantity);
                }
            }

            //Remove quantity amount of some ingredient
            const subArr = order.sub;
            for(let i = 0; i < subArr.length; i++){
                usedIngrMap.set(subArr[i], usedIngrMap.get(subArr[i]) - quantity);
            }
        };

        var flag = true;
        //Check if exceeds stock
        for(const [key,value] of usedIngrMap){
            if(value > inventoryMap.get(key)){
                flag = false;
            }
        };

        if(!flag){
            throw new TypeError('Quantity Exceeds Inventory Stock');
        }
        else{
            await dbConn.addOrders(orders);
            dbConn.updateInventory(usedIngrMap,inventoryMap);
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