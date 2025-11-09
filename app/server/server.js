import express from "express";
import cors from "cors";
import functions from './function.js';
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

app.listen(3000, () => console.log("Server running on port 3000"));