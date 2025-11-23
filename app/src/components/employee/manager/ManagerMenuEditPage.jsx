import React from "react";
import "../../../css/style.css"
import ManagerNavBar from "./ManagerNavBar";
import EditableField from "./EditableField";
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { updateMenuItem } from "../../../js/utils";

function ManagerMenuEditPage() {
    const { id } = useParams();

    const nav = useNavigate();

    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getMenu() {
            const response = await fetch('http://localhost:3000/api/OrderMenu/fetchMenu');
            const data = await response.json();
            
            const match = data.find(e =>
                e.title.replace(" ", "_") === id
            );

            if (!match) {
                nav("/404");
                return;
            }
            
            setItem(match);
            setLoading(false);
        }
        getMenu();
    }, [id, nav]);

    if(loading) { return null; }

    if(!item) { return null; }

    if(typeof item.cal === 'string') {
        const fixedItem = {...item, price: parseFloat(item.price.replace(/[^0-9.]/g, "")), cal: parseFloat(item.cal.replace(/[^0-9.]/g, ""))};
        setItem(fixedItem);
    }


    async function test() {
        return 0;
    }

    async function editName(name) {
        await fetch("http://localhost:3000/api/Manager/updateMenuItem", 
            updateMenuItem(item.title, name, item.price, item.type, item.seasonal, item.cal));
        setItem(({...item, title: name}));
    }
    
    async function editCal(calories) {
        await fetch("http://localhost:3000/api/Manager/updateMenuItem", 
            updateMenuItem(item.title, item.title, item.price, item.type, item.seasonal, calories));
        setItem(({...item, cal: calories}));
    }
    
    async function editType(type) {
        await fetch("http://localhost:3000/api/Manager/updateMenuItem", 
            updateMenuItem(item.title, item.title, item.price, type, item.seasonal, item.cal));
        setItem(({...item, type: type}));
    }

    async function editPrice(cost) {
        await fetch("http://localhost:3000/api/Manager/updateMenuItem", 
            updateMenuItem(item.title, item.title, cost, item.type, item.seasonal, item.cal));
        setItem(({...item, price: cost}));
    }

    return (
        <>
            <ManagerNavBar/>
            <div class="edit-page">
                <div class="edit-card-template">
                    <div class="edit-menu-img-container">
                        <img class="edit-menu-img" src={item.img} alt={item.alt}/>
                    </div>

                    <div class="edit-menu-item-info">
                        <div class="edit-menu-info-row">
                            <EditableField value={item.title} onSave={editName} className="edit-menu-item-title"/>
                        </div>
                        <div class="edit-menu-info-row">    
                            <EditableField value={item.cal} onSave={editCal} className="edit-menu-item-cal"
                                format={(v) => `${item.cal} cal`} parse={(s) => parseFloat(s.replace(/[^0-9.]/g, ""))}/>
                        </div>
                        <div class="edit-menu-info-row">
                            <EditableField value={item.type} onSave={editType} className="edit-menu-item-type"/>
                        </div>
                        <div class="edit-menu-info-row">
                            <p>Seasonal: </p>
                            <EditableField value={item.seasonal} onSave={test} className="edit-menu-item-seasonal"
                                format={(v) => v ? "Yes" : "No"} parse={(s) => parseFloat(s.replace(/[^0-9.]/g, ""))}/>
                        </div>
                        <div class="edit-menu-info-row">
                            <EditableField value={item.price} onSave={editPrice} className="edit-menu-item-price"
                                format={(v) => `$${Number(v).toFixed(2)}`} parse={(s) => parseFloat(s.replace(/[^0-9.]/g, ""))}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

}

export default ManagerMenuEditPage;