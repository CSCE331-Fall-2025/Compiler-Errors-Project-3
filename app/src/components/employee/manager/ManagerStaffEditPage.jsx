import React from "react";
import "../../../css/style.css"
import ManagerNavBar from "./ManagerNavBar";
import { updateEmployee } from "../../../js/utils";
import EditableField from "./EditableField";
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ManagerStaffEditPage() {
    const { id } = useParams();
    const nav = useNavigate();

    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getEmployees() {
            const response = await fetch('http://localhost:3000/api/Manager/fetchEmployees');
            const data = await response.json();
            
            const match = data.find(e =>
                e.name.replace(" ", "_").toLowerCase() === id
            );

            if (!match) {
                nav("/404");
                return;
            }
            
            setEmployee(match);
            setLoading(false);
        }
        getEmployees();
    }, [id, nav]);

    if(loading) { return null; }

    if(!employee) { return null; }


    async function editName(name) {
        await fetch("http://localhost:3000/api/Manager/updateEmployee", 
            updateEmployee(employee.name, name, employee.type, employee.email, employee.phone));
        setEmployee(({...employee, name: name}));
    }

    async function editType(type) {
        await fetch("http://localhost:3000/api/Manager/updateEmployee", 
            updateEmployee(employee.name, employee.name, type, employee.email, employee.phone));
        setEmployee(({...employee, type: type}));
    }

    async function editEmail(email) {
        await fetch("http://localhost:3000/api/Manager/updateEmployee", 
            updateEmployee(employee.name, employee.name, employee.type, email, employee.phone));
        setEmployee(({...employee, email: email}));
        
    }

    async function editPhone(phone) {
        await fetch("http://localhost:3000/api/Manager/updateEmployee", 
            updateEmployee(employee.name, employee.name, employee.type, employee.email, phone));
        setEmployee(({...employee, phone: phone}));
    }

    async function editImage(img) {
        const formData = new FormData();

        formData.append("img", img);
        formData.append("name", employee.name);
        formData.append("newName", employee.name);
        formData.append("type", employee.type);
        formData.append("email", employee.email);
        formData.append("phone", employee.phone);

        await fetch("http://localhost:3000/api/Manager/updateEmployee", {
            method: "POST",
            body: formData
        });

        const reader = new FileReader();
        reader.onload = () => {
            const base64 = reader.result.split(",")[1];
            setEmployee({ ...employee, img: base64 });
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
                    <div className="staff-edit-img-wrapper" onClick={() => document.getElementById("staff-img-input").click()}>
                        <img className="staff-edit-img" src={`data:image/png;base64,${employee.img}`} alt=""/>
                    </div>
                    <input id="staff-img-input" type="file" accept="image/*" style={{ display: "none" }} onChange={handleImageUpload}/>
                    
                    <EditableField value={employee.name} onSave={editName} className={"edit-employee-name"}/>
                    <EditableField value={employee.type} onSave={editType} className={"edit-employee-role"}/>

                    <div className="staff-edit-contact">Contact</div>

                    <EditableField value={employee.email} onSave={editEmail} className={"edit-employee-email"}/>
                    <EditableField value={employee.phone} onSave={editPhone} className={"edit-employee-phone"}/>
                </div>
            </div>
        </>
    );
}

export default ManagerStaffEditPage;