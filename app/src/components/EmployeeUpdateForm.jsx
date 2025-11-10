import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { updateEmployee } from "../js/utils";

function EmployeeUpdateForm() {
    const [targetName, setTargetName] = useState("");
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const formatPhone = (value) => {
        const digits = value.replace(/\D/g, "");

        if (digits.length === 0) return "";
        if (digits.length < 4) return `(${digits}`;
        if (digits.length < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;

        return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
    };

    const handleChange = (e) => {
        setPhone(formatPhone(e.target.value));
    };

    async function submitForm(e) {
            e.preventDefault(); 
            
            await fetch("http://localhost:3000/api/Manager/updateEmployee", updateEmployee(targetName, name, role, email, phone));
            // window.location.href = "/";
    }

    return (
        <form onSubmit={submitForm} id="employeeForm">
            <input type="text" value={targetName} onChange={e => setTargetName(e.target.value)} id = "targetName" placeholder = "Current Employee Name" required/>
            <input type="text" value={name} onChange={e => setName(e.target.value)} id="name" placeholder="New employee Name" required/>
            <select value={role} onChange={e => setRole(e.target.value)} id="role" required>
                <option value="">Select Role</option>
                <option value="Manager">Manager</option>
                <option value="Cashier">Cashier</option>
            </select>
            <input type="text" value={email} onChange={e => setEmail(e.target.value)} id="email" placeholder="New email" required/>
            <input type="text" value={phone} onChange={handleChange} maxLength={14} id="phone" placeholder="New Phone number" required/>
            <button type="submit">Update Employee</button>
        </form>
    );
}

export default EmployeeUpdateForm;
