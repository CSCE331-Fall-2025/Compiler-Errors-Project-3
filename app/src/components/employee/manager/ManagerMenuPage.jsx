import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import "../../../css/style.css"
import ManagerNavBar from "./ManagerNavBar";
import ManagerMenuCard from "./ManagerMenuCard";
import { useContext } from 'react';
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

/**
 * ManagerMenuPage component.
 *
 * Displays a list of menu items for the manager with options to delete or add new items.
 * Fetches menu data on mount and allows item deletion.
 *
 * @component
 * @returns {JSX.Element} Menu management page
 */
function ManagerMenuPage() {
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
        async function getMenu() {
            const response = await fetch('https://compiler-errors-project-3-backend.onrender.com/api/OrderMenu/fetchMenu');
            const data = await response.json();
            setData(data);
        }
        getMenu();
    }, []);

    async function onDelete(name) {
        await fetch(`https://compiler-errors-project-3-backend.onrender.com/api/Manager/deleteMenuItem?name=${name}`);
        const newData = [...data];
        for(let i = 0; i < newData.length; i++) {
            if(newData[i].title === name) {
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
                        {data.map((item, idx) => (
                            <div key={item.title+"-Manager-"+idx} class="manager-template-card">
                                <ManagerMenuCard {...item} onDelete={onDelete}/>
                            </div>
                        ))}
                        <div class="manager-template-card">
                            <Link to="/employee/manager/menu/add"><div class="manager-add-card">+</div></Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ManagerMenuPage;
