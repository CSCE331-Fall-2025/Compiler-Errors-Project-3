import React from "react";

function InventoryUpdateForm() {
    return (
        <form id = "updateInventoryItem">
        <input type = "text" id = "itemName" placeholder = "Inventory Item Name" required/>
        <input type = "number" id = "quantity" placeholder = "New Quantity" required/>
        <input type = "number" id = "UnitPrice" placeholder = "New Unit Price" required/>
        <button type = "submit">Update Inventory Item</button></form>
    );
}

export default InventoryUpdateForm;