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

    async function onDelete(name) {
        await fetch(`http://localhost:3000/api/Manager/deleteEmployee?name=${name}`);
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
                                    <ManagerEmployeeCard key={item.name} {...item} onDelete={onDelete}/>
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