import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { addMenuItem } from "../../js/utils";

function MenuAddForm() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0.0);
    const [ingredients, setIngredients] = useState("");

    async function handleChange(e) {
        const value = parseFloat(e.target.value);
        setPrice(value);
    }

    async function submitForm(e) {
        e.preventDefault(); 

        await fetch("https://compiler-errors-project-3-backend.onrender.com/api/Manager/addMenuItem", addMenuItem(name, price, ingredients));
    }

    return (
        <form onSubmit={submitForm} id = "addMenuItem">
            <input type = "text" value={name} onChange={e => setName(e.target.value)} id = "name" placeholder = "Menu Item Name" required/>
            <select id = "category" required>
                <option value = "">Select Category</option>
                <option value = "Entree">Entree</option>
                <option value = "Sides">Sides</option>
                <option value = "Beverages">Beverages</option>
                <option value = "Seasonal">Seasonal</option>
            </select>
            <input type = "number" value={price} onChange={handleChange} id = "price" placeholder = "Price" step="0.01" min="0" required/>
            <input type = "text" value={ingredients} onChange={e => setIngredients(e.target.value)} id = "ingredients" placeholder = "Menu Item ingredients" required/>
            <button type = "submit">Add Menu Item</button>
        </form>
    );
}

export default MenuAddForm;