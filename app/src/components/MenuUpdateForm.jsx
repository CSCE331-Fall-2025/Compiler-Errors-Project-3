import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { updateMenuItem } from "../js/utils";

function MenuUpdateForm() {
    const [name, setName] = useState("");
    const [newName, setNewName] = useState("");
    const [price, setPrice] = useState("");
    const [ingredients, setIngredients] = useState("");

    async function handleChange(e) {
        const value = e.target.value === "" ? "" : parseFloat(e.target.value);
        setPrice(value);
    }

    async function submitForm(e) {
        e.preventDefault(); 

        await fetch("http://localhost:3000/api/Manager/updateMenuItem", updateMenuItem(name, newName, price, ingredients));
    }

    return (
        <form onSubmit={submitForm} id = "updateMenuItem">
            <input value={name} onChange={e => setName(e.target.value)} type = "text" id = "name" placeholder = "Menu Item Name" required/>
            <input value={newName} onChange={e => setNewName(e.target.value)} type = "text" id = "name" placeholder = "New Name"/>
            <select id = "category">
                <option value = "">Select Category</option>
                <option value = "Entree">Entree</option>
                <option value = "Sides">Sides</option>
                <option value = "Beverages">Beverages</option>
                <option value = "Seasonal">Seasonal</option>
            </select>
            <input value={price} onChange={handleChange} type = "number" id = "price" placeholder = "New Price" step="0.01" min="0"/>
            <input value={ingredients} onChange={e => setIngredients(e.target.value)} type = "text" id = "ingredients" placeholder = "New ingredients"/>
            <button type = "submit">Update Menu Item</button>
        </form>
    );
}

export default MenuUpdateForm;