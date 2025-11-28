import React from "react";
import "../../../css/style.css"
import ManagerNavBar from "./ManagerNavBar";
import EditableField from "./EditableField";
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { updateInventoryItem } from "../../../js/utils";

function ManagerInventoryEditPage() {
    const { id } = useParams();
    const nav = useNavigate();

    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getInventory() {
            const response = await fetch('http://localhost:3000/api/Manager/fetchInventory');
            const data = await response.json();
            const match = data.find(e =>
                e.name === id
            );

            if (!match) {
                console.log(id);
                nav("/404");
                return;
            }

            setItem(match);
            setLoading(false);
        }
        getInventory();
    }, [id, nav]);

    if(loading) { return null; }

    if(!item) { return null; }

    async function editName(name) {
        await fetch("http://localhost:3000/api/Manager/updateInventoryItem", 
                    updateInventoryItem(item.name, name, item.quantity, item.unit_price, item.minimum));
        setItem(({...item, name: name}));
    }
    
    async function editQty(qty) {
        await fetch("http://localhost:3000/api/Manager/updateInventoryItem", 
                    updateInventoryItem(item.name, item.name, qty, item.unit_price, item.minimum));
        setItem(({...item, quantity: qty}));
    }
    
    async function editUnitPrice(uprice) {
        await fetch("http://localhost:3000/api/Manager/updateInventoryItem", 
                    updateInventoryItem(item.name, item.name, item.quantity, uprice, item.minimum));
        setItem(({...item, unit_price: uprice}));
    }
    
    async function editMinimum(min) {
        await fetch("http://localhost:3000/api/Manager/updateInventoryItem", 
                    updateInventoryItem(item.name, item.name, item.quantity, item.unit_price, min));
        setItem(({...item, minimum: min}));
    }
    
    return (
        <>
            <ManagerNavBar/>
            <div class="edit-page">
                <div class="edit-card-template">
                    <EditableField value={item.name} onSave={editName} className="edit-inventory-name"/>
                    <div class="inventory-edit-info">
                        <div class="inventory-edit-info-row">
                            <p>In stock: </p>
                            <EditableField value={item.quantity} onSave={editQty} className="edit-inventory-quantity"/>
                        </div>
                        <div class="inventory-edit-info-row">
                            <p>Unit Price: </p>
                            <EditableField value={item.unit_price} onSave={editUnitPrice} className="edit-inventory-uprice" 
                        format={(v) => `$${Number(v).toFixed(2)}`} parse={(s) => parseFloat(s.replace(/[^0-9.]/g, ""))}/>
                        </div>
                        <div class="inventory-edit-info-row">
                            <p>Expected minimum: </p>
                            <EditableField value={item.minimum} onSave={editMinimum} className="edit-inventory-min"/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

}

export default ManagerInventoryEditPage;