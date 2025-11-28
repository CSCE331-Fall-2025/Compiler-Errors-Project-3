import React from "react";
import "../../../css/style.css"
import ManagerNavBar from "./ManagerNavBar";
import ManagerEmployeeCard from "./ManagerEmployeeCard";
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'

function ManagerStaffPage() {
    const [data, setData] = useState([]);

    useEffect(() => {
        async function getEmployees() {
            const response = await fetch('http://localhost:3000/api/Manager/fetchEmployees');
            const data = await response.json();
            setData(data);
        }
        getEmployees();
    }, []);

    return (
        <>
            <div class="manager-page-root">
                <ManagerNavBar/>
                <div class="manager-template-page">
                    <div class="manager-template-list">
                            {data.map((item) => (
                                <div class="manager-template-card">
                                    <ManagerEmployeeCard key={item.name} {...item} />
                                </div>
                            ))}
                            <div class="manager-template-card">
                                <Link to="/employee/manager/staff/add"><div class="manager-add-card">+</div></Link>
                            </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ManagerStaffPage;