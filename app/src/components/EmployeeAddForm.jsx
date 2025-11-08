import React from "react";

function EmployeeAddForm() {
    return (
        <form id="employeeForm">
        <input type="text" id="name" placeholder="Employee Name" required/>
        <select id="role" required>
            <option value="">Select Role</option>
            <option value="Manager">Manager</option>
            <option value="Cashier">Cashier</option>
        </select>
        <input type="text" id="email" placeholder="Email" required/>
        <input type="number" id="phone" placeholder="Phone number" required/>
        <button type="submit">Add Employee</button>
        </form>
    );
}

export default EmployeeAddForm;