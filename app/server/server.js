import express from "express";
import cors from "cors";
import functions from './function.js';
import {addEmployee} from "./db.js";
const { createMenuItemArray } = functions;

console.log("Server.js starting");

const app = express();

app.use(cors());

app.get("/api/OrderMenu/fetchMenu", async (req, res) => {
  try {
    const menu = await createMenuItemArray();
    res.json(menu);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//addEmployee 
app.post("/api/employees/add", async (req,res) => {
  try{
    const {name, employeetype, email, phonenum} = req.body;
    if(!name || !employeetype || !email || !phonenum){
      return res.status(400).json({error: "Missing required info"});
    }
    await addEmployee(name, employeetype, email, phonenum);
    res.status(201).json({message: "Employee added successfully"});
  }
  catch(err){
    console.error("Error adding employee", err);
    res.status(500).json({error: "Failed to add employee"});
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));