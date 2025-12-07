import React from "react";
import "../../../css/style.css"
import ManagerNavBar from "./ManagerNavBar";
import EditableField from "./EditableField";
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { updateMenuItem } from "../../../js/utils";
import { useContext } from 'react';
import { AuthContext } from "../../contexts/AuthContext";

function ManagerMenuEditPage() {
    const { id } = useParams();

    const nav = useNavigate();

    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);

    const { isManager, loaded } = useContext(AuthContext);

    useEffect(() => {
        if(!isManager && loaded) {
            nav("/403");
        }

    });

    if(!isManager) { return; }

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

    async function editImage(img) {
        const formData = new FormData();

        formData.append("img", img);
        formData.append("name", item.title);
        formData.append("newName", item.title);
        formData.append("price", item.price);
        formData.append("type", item.type);
        formData.append("cal", item.cal);

        await fetch("http://localhost:3000/api/Manager/updateMenuitem", {
            method: "POST",
            body: formData
        });

        const reader = new FileReader();
        reader.onload = () => {
            const base64 = reader.result.split(",")[1];
            setItem({ ...item, img: base64 });
        };
        reader.readAsDataURL(img);
    }


    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        editImage(file);
    };

    return (
        <>
            <ManagerNavBar/>
            <div class="edit-page">
                <div class="edit-card-template">
                    <div class="edit-menu-img-container" onClick={() => document.getElementById("staff-img-input").click()}>
                        <img class="edit-menu-img" src={`data:image/png;base64,${item.img}`} alt={item.alt}/>
                    </div>

                    <input id="staff-img-input" type="file" accept="image/*" style={{ display: "none" }} onChange={handleImageUpload}/>

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