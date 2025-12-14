import React from "react";
import "../../../css/style.css";
import ManagerNavBar from "./ManagerNavBar";
import ManagerEmployeeCard from "./ManagerEmployeeCard";
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

/**
 * ManagerStaffPage component.
 *
 * Displays a list of all employees with the ability to delete or navigate to edit/add pages.
 *
 * @component
 * @returns {JSX.Element} Manager staff page
 */
function ManagerStaffPage() {
    const [data, setData] = useState([]);
    const nav = useNavigate();
    const { isManager, loaded } = useContext(AuthContext);

    useEffect(() => {
        if (!isManager && loaded) {
            nav("/403");
        }
    }, [isManager, loaded, nav]);

    if (!isManager) { return null; }

    useEffect(() => {
        async function getEmployees() {
            try {
                const response = await fetch('https://compiler-errors-project-3-backend.onrender.com/api/Manager/fetchEmployees');
                const data = await response.json();
                setData(data);
            } catch (err) {
                console.error("Failed to fetch employees:", err);
            }
        }
        getEmployees();
    }, []);

    async function onDelete(name) {
        try {
            await fetch(`https://compiler-errors-project-3-backend.onrender.com/api/Manager/deleteEmployee?name=${name}`);
            setData(prev => prev.filter(emp => emp.name !== name));
        } catch (err) {
            console.error("Failed to delete employee:", err);
        }
    }

    return (
        <div className="manager-page-root">
            <ManagerNavBar/>
            <div className="manager-template-page">
                <div className="manager-template-list">
                    {data.map(item => (
                        <div className="manager-template-card" key={item.name}>
                            <ManagerEmployeeCard {...item} onDelete={onDelete}/>
                        </div>
                    ))}
                    <div className="manager-template-card">
                        <Link to="/employee/manager/staff/add">
                            <div className="manager-add-card">+</div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ManagerStaffPage;
