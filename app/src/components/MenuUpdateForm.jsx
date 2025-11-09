import React from "react";

function MenuUpdateForm() {
    return (
        <form id = "updateMenuItem">
            <input type = "text" id = "name" placeholder = "Menu Item Name" required/>
            <select id = "category" required>
                <option value = "">Select Category</option>
                <option value = "Entree">Entree</option>
                <option value = "Sides">Sides</option>
                <option value = "Beverages">Beverages</option>
                <option value = "Seasonal">Seasonal</option>
            </select>
            <input type = "number" id = "price" placeholder = "New Price" required/>
            <button type = "submit">Update Menu Item</button>
        </form>
    );
}

export default MenuUpdateForm;