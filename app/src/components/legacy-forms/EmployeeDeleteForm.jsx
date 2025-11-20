import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { deleteEmployee } from "../../js/utils";

function EmployeeDeleteForm() {
    const [name, setName] = useState("");

    async function submitForm(e) {
        e.preventDefault(); 
        
        await fetch("http://localhost:3000/api/Manager/deleteEmployee", deleteEmployee(name));
    }

    return (
        <form onSubmit={submitForm} id="deleteEmployeeForm">
            <input type="text" value={name} onChange={e => setName(e.target.value)} id="name" placeholder="Employee name you wish to fire" required/>
            <button type="submit">Delete Employee</button>
        </form>
    );
}

export default EmployeeDeleteForm;