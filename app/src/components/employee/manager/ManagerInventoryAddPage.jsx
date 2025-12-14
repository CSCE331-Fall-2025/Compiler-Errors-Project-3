import React from "react";
import "../../../css/style.css"
import ManagerNavBar from "./ManagerNavBar";
import EditableField from "./EditableField";
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { addInventoryItem } from "../../../js/utils";
import { useContext } from 'react';
import { AuthContext } from "../../contexts/AuthContext";

/**
 * ManagerInventoryAddPage component.
 *
 * Page for managers to add new inventory items. Allows input of item name, quantity, unit price, and restock minimum.
 *
 * @component
 * @returns {JSX.Element} The inventory add page UI
 */
function ManagerInventoryAddPage() {
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [unitPrice, setUnitPrice] = useState("");
    const [minimum, setMinimum] = useState("");

    const { isManager, loaded } = useContext(AuthContext);

    useEffect(() => {
        if(!isManager && loaded) {
            nav("/403");
        }

    });

    if(!isManager) { return; }

    async function handleSubmit(e) {
        e.preventDefault();
        
        const res = await fetch("https://compiler-errors-project-3-backend.onrender.com/api/Manager/addInventoryItem",
            addInventoryItem(name, quantity, unitPrice, minimum)
        );
    }

    return (
        <>
            <ManagerNavBar/>
            <div class="edit-page">
                <div class="edit-card-template">
                    <h2>Add Inventory Item</h2>

                    <label>Name</label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} />

                    <label>In Stock</label>
                    <input type="number" value={quantity} onChange={e => setQuantity(e.target.value)} />

                    <label>Unit Price</label>
                    <input type="number" step="0.01" value={unitPrice} onChange={e => setUnitPrice(e.target.value)} />

                    <label>Restock Minimum</label>
                    <input type="number" value={minimum} onChange={e => setMinimum(e.target.value)} />

                    <label></label>
                    <button onClick={handleSubmit}>Add Inventory Item</button>
                </div>
            </div>
        </>
    );

}

export default ManagerInventoryAddPage;
