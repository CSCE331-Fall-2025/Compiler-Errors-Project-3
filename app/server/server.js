import express from "express";
import cors from "cors";
import functions from './function.js';
const { createMenuItemArray, addEmployee } = functions;

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

app.listen(3000, () => console.log("Server running on port 3000"));