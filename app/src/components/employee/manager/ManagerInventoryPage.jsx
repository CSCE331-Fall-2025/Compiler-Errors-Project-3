import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import "../../../css/style.css"
import ManagerNavBar from "./ManagerNavBar";
import ManagerInventoryCard from "./ManagerInventoryCard";
import { deleteInventoryItem } from "../../../js/utils";
import { useContext } from 'react';
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

/**
 * ManagerInventoryPage component.
 *
 * Displays a list of all inventory items for the manager. Allows deletion of items
 * and provides a link to add new inventory items.
 *
 * @component
 * @returns {JSX.Element} Inventory management page
 */
function ManagerInventoryPage() {
    const [data, setData] = useState([]);

    const nav = useNavigate();
    const { isManager, loaded } = useContext(AuthContext);

    useEffect(() => {
        if(!isManager && loaded) {
            nav("/403");
        }

    });

    if(!isManager) { return; }
    
    useEffect(() => {
        async function getInventory() {
            const response = await fetch('https://compiler-errors-project-3-backend.onrender.com/api/Manager/fetchInventory');
            const data = await response.json();
            setData(data);
        }
        getInventory();
    }, []);

    async function onDelete(name) {
        await fetch(`https://compiler-errors-project-3-backend.onrender.com/api/Manager/deleteInventoryItem?name=${name}`);
        const newData = [...data];
        for(let i = 0; i < newData.length; i++) {
            if(newData[i].name === name) {
                newData.splice(i, 1);
                break;
            }
        }
        setData(newData);
    }

    return (
        <>
            <div class="manager-page-root">
                <ManagerNavBar/>
                <div class="manager-template-page">
                    <div class="manager-template-list">
                            {data.map((item) => (
                                <div class="manager-template-card">
                                    <ManagerInventoryCard key={item.name} {...item} onDelete={onDelete}/>
                                </div>
                            ))}
                            <div class="manager-template-card">
                            <Link to="/employee/manager/inventory/add"><div class="manager-add-card">+</div></Link>
                            </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ManagerInventoryPage;
