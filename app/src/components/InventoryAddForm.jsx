import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { addInventoryItem } from "../js/utils";

function InventoryAddForm() {
    const [name, setName] = useState("");
    const [qty, setqty] = useState("");
    const [unit_price, setunitPrice] = useState("");
        
    async function submitForm(e) {
        e.preventDefault(); 
        
        await fetch("http://localhost:3000/api/Manager/addInventoryItem", addInventoryItem(name, qty, unit_price));
    }
    
    return (
        <form onSubmit={submitForm} id = "addInventoryItem">
            <input type="text" value={name} onChange={e => setName(e.target.value)} id="name" placeholder="Inventory item" required/>
            <input type = "number" value={qty} onChange={e => setqty(e.target.value)} id = "quantity" placeholder = "Quantity" required/>
            <input type = "number" value={unit_price} onChange={e => setunitPrice(e.target.value)} id = "UnitPrice" placeholder = "Unit Price" required/>
            <button type = "submit">Add Inventory Item</button>
        </form>
    );
}

export default InventoryAddForm;