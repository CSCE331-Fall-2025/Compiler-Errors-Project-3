import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { updateEmployee } from "../js/utils";

function EmployeeUpdateForm() {
    const [name, setName] = useState("");
    const [newName, setNewName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [phone, setPhone] = useState("");

    const formatPhone = (value) => {
        const digits = value.replace(/\D/g, "");

        if (digits.length === 0) return "";
        if (digits.length < 4) return `(${digits}`;
        if (digits.length < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;

        return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
    };

    const handleChange = (e) => {
        const formatted = formatPhone(e.target.value);
        setPhone(formatted);
    };

    async function submitForm(e) {
        e.preventDefault(); 

        await fetch("http://localhost:3000/api/Manager/updateEmployee", updateEmployee(name, newName, role, email, phone));
    }


    return (
        <form onSubmit={submitForm} id = "updateEmployeeForm">
            <input value={name} onChange={e => setName(e.target.value)} type="text" id="name" placeholder="Employee Name" required/>
            <input value={newName} onChange={e => setNewName(e.target.value)} type="text" id="targetName" placeholder="New Name"/>
            <select value={role} onChange={e => setRole(e.target.value)} id="role">
                <option value="">Select Role</option>
                <option value="Manager">Manager</option>
                <option value="Cashier">Cashier</option>
            </select>
            <input value={email} onChange={e => setEmail(e.target.value)} type="text" id="email" placeholder="New Email"/>
            <input value={phone} onChange={handleChange} type="text" id="phone" placeholder="New Phone number"/>
            <button type="submit">Update Employee</button>
        </form>
    );
}

export default EmployeeUpdateForm;
