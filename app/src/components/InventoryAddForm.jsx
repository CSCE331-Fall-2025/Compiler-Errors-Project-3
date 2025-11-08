import React from "react";

function InventoryAddForm() {
    return (
        <form id = "addInventoryItem">
            <input type = "text" id = "itemName" placeholder = "Inventory Item Name" required/>
            <input type = "number" id = "quantity" placeholder = "Quantity" required/>
            <input type = "number" id = "UnitPrice" placeholder = "Unit Price" required/>
            <button type = "submit">Add Inventory Item</button>
        </form>
    );
}

export default InventoryAddForm;