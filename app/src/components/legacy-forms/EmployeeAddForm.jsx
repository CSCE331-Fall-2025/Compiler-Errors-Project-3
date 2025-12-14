import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { addEmployee } from "../../js/utils";

function EmployeeAddForm() {
    const [name, setName] = useState("");
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
        
        await fetch("https://compiler-errors-project-3-backend.onrender.com/api/Manager/addEmployee", addEmployee(name, role, email, phone));
    }


    return (
        <form onSubmit={submitForm} id="employeeForm">
            <input type="text" value={name} onChange={e => setName(e.target.value)} id="name" placeholder="Employee Name" required/>
            <select value={role} onChange={e => setRole(e.target.value)} id="role" required>
                <option value="">Select Role</option>
                <option value="Manager">Manager</option>
                <option value="Cashier">Cashier</option>
            </select>
            <input type="text" value={email} onChange={e => setEmail(e.target.value)} id="email" placeholder="Email" required/>
            <input type="text" value={phone} onChange={handleChange} maxLength={14} minLength={14} id="phone" placeholder="Phone number" required/>
            <button type="submit">Add Employee</button>
        </form>
    );
}

export default EmployeeAddForm;