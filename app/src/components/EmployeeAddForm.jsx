import React, { useState } from "react";

function EmployeeAddForm() {
    const [name, setName] = React.useState("");
    const [role, setRole] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [phone, setPhone] = React.useState("");

    const submitHandler = async (e) => {
        e.preventDefault();
        const employeeData = {
            name,
            employeetype: role,
            email,
            phonenum: phone
        };
        try{
            const response = await fetch("http://localhost:3000/api/Employee/addEmployee", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(employeeData),
            });

            if (!response.ok){
                alert("Failed to add employee");
            }
            
            alert("Employee added successfully");
            setName("");
            setRole("");
            setEmail("");
            setPhone("");
        }
        catch (error)
        {
            console.error("Error adding employee:", error);
            alert("Unable to add employee");
        }
    };

    return (
        <form id="employeeForm" onSubmit = {submitHandler}>
        <input type="text" id="name" placeholder="Employee Name"  value = {name} onChange={(e) => setName(e.target.value)} required/>
        <select value={role} onChange={(e) => setRole(e.target.value)} required>
            <option value="">Select Role</option>
            <option value="Manager">Manager</option>
            <option value="Cashier">Cashier</option>
        </select>
        <input type="text" placeholder="Email" value={email} onChange = {(e) => setEmail(e.target.value)} required/>
        <input type="number" id="phone" placeholder="Phone number" value = {phone} onChange={(e) => setPhone(e.target.value)} required/>
        <button type="submit">Add Employee</button>
        </form>
    );
}

export default EmployeeAddForm;