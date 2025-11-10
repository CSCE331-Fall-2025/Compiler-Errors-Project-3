import React from "react";

function EmployeeDeleteForm() {
    return (
        <form id="deleteEmployeeForm">
            <input type="text" id="name" placeholder="Employee Name" required/>
            <select id="role" required>
                <option value="">Select Role</option>
                <option value="Manager">Manager</option>
                <option value="Cashier">Cashier</option>
            </select>
            <button type="submit">Delete Employee</button>
        </form>
    );
}

export default EmployeeDeleteForm;