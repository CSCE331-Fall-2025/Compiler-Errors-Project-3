import React from "react";

function MenuDeleteForm() {
    return (
        <form id = "deleteMenuItem">
            <input type = "text" id = "name" placeholder = "Menu Item Name" required/>
            <select id = "category" required>
                <option value = "">Select Category</option>
                <option value = "Entree">Entree</option>
                <option value = "Sides">Sides</option>
                <option value = "Beverages">Beverages</option>
                <option value = "Seasonal">Seasonal</option>
            </select>
            <button type = "submit">Delete Menu Item</button>
        </form>
    );
}

export default MenuDeleteForm;