import express from "express";
import cors from "cors";
import functions from './function.js';
import dbConn from './db.js';
import multer from "multer";
import { OAuth2Client } from "google-auth-library";
import dotenv from 'dotenv';
import findConfig from 'find-config';
dotenv.config({ path: findConfig('.env') });

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
    getInventory,
    addOrder,
    getIngredientList,
    getPlacesAPI
    } = functions;

//Inside App, npm run dev
//Inside App/server, node server.js
    
console.log("Server.js starting");

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

//# GOOGLE AUTH RELATED THINGS #//
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

//Switch redirect URI based on environment (If NODE_ENV is production (aka Render), then use that, else use localhost)
//RENDER IS NOT CONFIGURED. DO NOT TEST THERE 
const REDIRECT_URI =
//OAuth is configured to use port 5713 which is the port that appears in npm run dev. Might break if not that port
process.env.NODE_ENV === "production"
    ? "https://your-app-name.onrender.com/oauth2callback"
    : "http://localhost:5173/oauth2callback";

//Create client
const oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
//# END #//

app.use(cors());
app.use(express.json());

app.post("/api/login/validateEmployee", async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log("Attempting login for: ", username);
        const result = await dbConn.validateEmployee(username, password);
        if (result) {
            console.log("Login successful for: ", username);
            res.status(200).json({ message: "Login successful", status: true, result: result });
        } else {
            console.log("Login failed for: ", username);
            res.status(401).json({ message: "Invalid credentials", status: false, result: result });
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).json({error: err.message});
    }
});

app.post("/api/login/validateCustomer", async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log("Attempting login for: ", username);
        const result = await dbConn.validateCustomer(username, password);
        if (result) {
            console.log("Login successful for: ", username);
            res.status(200).json({ message: "Login successful", status: true, result: result });
        } else {
            console.log("Login failed for: ", username);
            res.status(401).json({ message: "Invalid credentials", status: false, result: result });
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).json({error: err.message});
    }
});

app.get("/api/Kitchen/getPending", async (req, res) => {
    try {
        const result = await dbConn.dataQuery("SELECT * FROM orderhistoryce WHERE status = 'pending'", [])
        res.json(result.rows);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({error: err.message});
    }
});

app.get("/api/kitchen/completeOrder", async (req, res) => {
    try {
        const { id } = req.query;
        await dbConn.dataQuery("UPDATE orderhistoryce SET status = 'completed' WHERE id = $1", [id]);
        res.json({ status: true });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({error: err.message});
    }
});

app.get("/api/Manager/fetchStats", async (req, res) => {
    try {
        const { startDate, endDate } = req.query;

        const query = `
            SELECT *
            FROM orderhistoryce
            WHERE date BETWEEN $1 AND $2
            ORDER BY date
        `;

        const result = await dbConn.dataQuery(query, [startDate, endDate]);
        res.json(result.rows);

    } catch (err) {
        console.log(err.message);
        res.status(500).json({error: err.message});
    }
});

app.get("/api/Manager/fetchData", async (req, res) => {
    try {
        const { sort, filterType, filterValue, limit, page} = req.query;

        let whereClause = "";
        let params = [];
        let paramIndex = 1; 

        if (filterType === "none") {
            // we dont have a where clause
        }
        else if (filterType === "item") {
            whereClause = `WHERE item ILIKE $${paramIndex}`;
            params.push(`%${filterValue}%`);
            paramIndex++;
        }
        else if (["year", "month", "day"].includes(filterType)) {
            const part = filterType;
            whereClause = `WHERE EXTRACT(${part.toUpperCase()} FROM date) = $${paramIndex}`;
            params.push(Number(filterValue));
            paramIndex++;
        }
        else if (["hour", "minute", "second"].includes(filterType)) {
            const part = filterType;
            whereClause = `WHERE EXTRACT(${part.toUpperCase()} FROM time) = $${paramIndex}`;
            params.push(Number(filterValue));
            paramIndex++;
        }
        else if (filterType === "price") {
            whereClause = `WHERE price = $${paramIndex}`;
            params.push(Number(filterValue));
            paramIndex++;
        }
        else if (filterType === "qty") {
            whereClause = `WHERE qty = $${paramIndex}`;
            params.push(Number(filterValue));
            paramIndex++;
        }
        else {
            return res.status(400).json({ error: "Invalid filterType" });
        }

        const validSorts = ["date", "time", "item", "qty", "price"];
        if (!validSorts.includes(sort)) {
            return res.status(400).json({ error: "Invalid sort value" });
        }

        const limitNum = Number(limit) || 50;
        const pageNum = Number(page) || 1;

        params.push(limitNum);
        params.push((pageNum - 1) * limitNum);

        const query = `
            SELECT *
            FROM orderhistoryce
            ${whereClause}
            ORDER BY ${sort} DESC
            LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
        `;

        const result = await dbConn.dataQuery(query, params);
        res.json(result.rows);

    } catch (err) {
        console.log(err.message);
        res.status(500).json({error: err.message});
    }
});

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

app.get("/api/login/employeeLogin", async (req, res) => {
    try {
        const {user} = req.query;
        const type = await dbConn.employeeAuth(user);
        res.json(type);
    } catch (err) {
        console.error(err);
        res.status(500).json({error: "Failed to fire employee"});
    }
});

//deleteEmployee
app.get("/api/Manager/deleteEmployee", async (req, res) => {
    try{
        const {name} = req.query;
        console.log("attempting");
        try{
            await dbConn.deleteEmployee(name);
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
app.get("/api/Manager/deleteMenuItem", async (req, res) => {
    try{
        const {name} = req.query;
        console.log("Attempting: ", name);
        try{
            await dbConn.deleteMenuItem(name);
            res.json({status: true});
        }
        catch(err){
            console.error("add error: ", err);
            throw err;
        }
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

app.post("/api/OrderMenu/fetchIngredients", async (req, res) => {
    try {
        
        const name = req.body.name;

        try {
            const ingredients = await getIngredientList(name);
            res.status(200).json({ message: "Success", result: ingredients})
        } catch (err) {
            throw err;
        }
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
        const orders = req.body; 
        
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

        if(flag) {
            await addOrder(orders);
            dbConn.updateInventory(usedIngrMap, inventoryMap);
            response.status(200).json({message: "Order submitted successfully"});
        }

    } catch (err) {
        console.log(err.message);
        response.status(500).json({error: err.message});
    }
})

app.get("/api/Manager/deleteInventoryItem", async (req, res) => {
    try {
        const { name } = req.query;
        //Find item. If it returns empty, then throw error
        //Delete from table
        await dbConn.deleteInventoryItem(name);

        //Get all menu items
        const res = await dbConn.getMenuItems();
        //console.log(res.rows);
        //For each menu item, if list contains menu item, carefully delete the ingredient and reassemble the string
        const names = [];
        const ingrs = [];
        for(const row of res.rows){
            let list = await getIngredientList(row.name);
            const updatedIngrs = [];
            var flag = false;
            for(const ingr of list){
                //If ingredient to delete exists in the list, mark down name and flag it for updating 
                if(ingr === name){
                    names.push(row.name);
                    flag = true;
                }
                else{
                    updatedIngrs.push(ingr);
                }
            }
            if(flag){
                ingrs.push(updatedIngrs);
            }
        }

        //Update menu item with new ingredient list
        const newList = [];
        //For each array of ingredients
        for(const ingrArr of ingrs){
            let ingrStr = '';

            //Concatenate with a ', ' between each ingredient
            for(let i = 0; i < ingrArr.length; i++){
                if(i+1 === ingrArr.length){
                    ingrStr = ingrStr + ingrArr[i];
                }
                else{
                    ingrStr = ingrStr + ingrArr[i] + ', ';
                }
            }
            newList.push(ingrStr);
        }

        for(let i = 0; i < newList.length; i++){
            dbConn.updateMenuIngr(names[i],newList[i]);
        }
        
    } catch (err) {
        console.log(err.message);
        res.status(500).json({error: err.message});
    }
});

//GOOGLE AUTH ENDPOINTS
//Fair warning, this is AI generated, so this may be slightly harder to utilize
//Step 1: Login route → redirect user to Google
app.get("/auth/google", (req, res) => {
    const url = oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: ["profile", "email"],
    });
    res.redirect(url);
});

// Step 2: Callback route → exchange code for tokens
app.get("/oauth2callback", async (req, res) => {
    const { code, error } = req.query;

    if (error) {
        // User cancelled or login failed
        console.error("OAuth error:", error);
        return res.status(400).send(`Login failed: ${error}`);
    }

    try {
        const { tokens } = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(tokens);

        // For demo: show tokens (in production, store securely in DB/session)
        //res.json(tokens); Commented out since apparently pasting tokens directly is a bad idea
        /*
        AI Generated Example of what Supposedly the above command returns:
        {
            "access_token": "ya29.a0AfH6SMCEXAMPLE...", //Used to call google APIs on behalf of user (idk if useful)
            "refresh_token": "1//0gEXAMPLElongstring...", //Long term token to not require logins (idk if useful)
            "scope": "profile email", //Scope of login?
            "token_type": "Bearer", //Should default to Bearer, whatevert that is
            "expiry_date": 1733200000000, //When token will expire (Milliseconds since Epoch )
            "id_token": "eyJhbGciOiJSUzI1NiIsImtpZCI6Ij..." //The useful thing
        } 
        */

        const ticket = await oauth2Client.verifyIdToken({
            idToken,
            audience: process.env.GOOGLE_CLIENT_ID, // must match your OAuth client ID
        });

        const payload = ticket.getPayload();
        /*
        Full payload data (JSON format):
        {
            "iss": "https://accounts.google.com",
            "sub": "123456789012345678901",
            "email": "user@example.com",
            "email_verified": true,
            "name": "Jane Doe",
            "picture": "https://lh3.googleusercontent.com/a-/AOh14Gh...",
            "given_name": "Jane",
            "family_name": "Doe",
            "aud": "your-client-id.apps.googleusercontent.com",
            "exp": 1733200000,
            "iat": 1733196400
        }
        I assume you access everything via the same way as below
        */

        //I guess you can augment this with whatever fields above
        const userData = {
            userId: payload['sub'],       // Google unique user ID
            email: payload['email'],
            name: payload['name'],
            picture: payload['picture'],
        }
        res.json(userData);
        
        //Replace temp with value from actual client login type
        const temp = 'EMPLOYEE';
        var loginCheck;
        //Special Pass is a random base 64 string I generated. Not important, just doing it like this for security
        if(temp === 'EMPLOYEE'){
            loginCheck = dbConn.validateEmployee(userData.email,process.env.OAUTH_SPECIALPASS);
        }
        else{
            loginCheck = dbConn.validateCustomer(userData.email,process.env.OAUTH_SPECIALPASS);
        }

        //Redirects to correct login. I don't see an endpoint for this so not quite sure how that works
        if(loginCheck === 'MANAGER'){
            res.json({
                type: 'MANAGER'
            })
        }
        else if(loginCheck === 'CASHIER'){
            res.json({
                type: 'CASHIER'
            })
        }
        else{ //If you end up being a customer or smth else idk
            res.json({
                type: 'CUSTOMER'
            })
        }
        
        
    } catch (err) {
        console.error("Error exchanging code:", err);
        res.status(500).send("Authentication failed");
    }
});


app.get("/api/places", async (req, res) => {
    const lat = req.query.lat || 29.7604; 
    const lng = req.query.lng || -95.3698; 

    try {
        const places = await getPlacesAPI(lat, lng); 
        
        res.json(places);
    } catch (err) {
        console.error("Places API error:", err);
        res.status(500).json({ error: "Failed to fetch restaurant locations" });
    }
});

app.get("/api/Manager/getXReport", async (req, res) => {
    try {
        const result = await dbConn.getXReport();
        res.json(result);
    } catch (err) {
        res.status(500).json({error: err});
    }
});


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
