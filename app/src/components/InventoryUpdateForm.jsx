import React from "react";
import { useState } from "react";
import { updateInventoryItem } from "../js/utils.js";


function InventoryUpdateForm() {
    const [name, setName] = useState("");
    const [newName, setNewName] = useState("");
    const [qty, setQty] = useState("");
    const [uprice, setUPrice] = useState("");

    async function handlePriceChange(e) {
        const value = e.target.value === "" ? "" : parseFloat(e.target.value);
        setUPrice(value);
    }

    async function handleQtyChange(e) {
        const value = e.target.value === "" ? "" : parseFloat(e.target.value);
        setQty(value);
    }

    async function submitForm(e) {
        e.preventDefault(); 

        await fetch("http://localhost:3000/api/Manager/updateInventoryItem", updateInventoryItem(name, newName, qty, uprice));
    }

    return (
        <form onSubmit={submitForm} id = "updateInventoryItem">
        <input value={name} onChange={e => setName(e.target.value)} type = "text" id = "itemName" placeholder = "Inventory Item Name" required/>
        <input value={newName} onChange={e => setNewName(e.target.value)} type = "text" id = "itemNewName" placeholder = "New Name" required/>
        <input value={qty} onChange={handleQtyChange} type = "number" id = "quantity" min="0" placeholder = "New Quantity" required/>
        <input value={uprice} onChange={handlePriceChange} type = "number" id = "UnitPrice" min="0" step="0.01" placeholder = "New Unit Price" required/>
        <button type = "submit">Update Inventory Item</button></form>
    );
}

export default InventoryUpdateForm;