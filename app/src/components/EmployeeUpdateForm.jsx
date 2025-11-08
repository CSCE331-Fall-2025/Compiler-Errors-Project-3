import React from "react";

function EmployeeUpdateForm() {
    return (
        <form id = "updateEmployeeForm">
            <input type="text" id="name" placeholder="Employee Name" required/>
            <select id="role" required>
                <option value="">Select Role</option>
                <option value="Manager">Manager</option>
                <option value="Cashier">Cashier</option>
            </select>
            <input type="text" id="email" placeholder="New Email" required/>
            <input type="number" id="phone" placeholder="New Phone number" required/>
            <button type="submit">Update Employee</button>
        </form>
    );
}

export default EmployeeUpdateForm;