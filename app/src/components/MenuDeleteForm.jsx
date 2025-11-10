import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { deleteMenuItem } from "../js/utils";

function MenuDeleteForm() {
    const [name, setName] = useState("");
    
    async function submitForm(e) {
        e.preventDefault(); 
        
        await fetch("http://localhost:3000/api/Manager/deleteMenuItem", deleteMenuItem(name));
    }
    return (
        <form onSubmit={submitForm} id = "deleteMenuItem">
            <input type="text" value={name} onChange={e => setName(e.target.value)} id="name" placeholder="Menu item you wish to delete" required/>
            <button type = "submit">Delete Menu Item</button>
        </form>
    );
}

export default MenuDeleteForm;