import React from "react";

function EmployeeDeleteForm() {
    return (
        <form id="deleteEmployeeForm">
            <input type="text" id="name" placeholder="Employee Name" required/>
            <button type="submit">Delete Employee</button>
        </form>
    );
}

export default EmployeeDeleteForm;