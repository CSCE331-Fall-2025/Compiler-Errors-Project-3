import React from "react";
import { Link } from "react-router-dom";
import "../../../css/style.css"

/**
 * ManagerEmployeeCard component.
 *
 * Displays an employee card with name, role, contact info, image, and a delete button.
 *
 * @component
 * @param {Object} props
 * @param {string} props.name - Employee's full name.
 * @param {string} props.type - Employee's role/type (e.g., Cashier, Manager).
 * @param {string} props.email - Employee's email address.
 * @param {string} props.phone - Employee's phone number.
 * @param {string} props.img - Employee's image in base64 format.
 * @param {Function} props.onDelete - Callback when the delete button is clicked.
 * @returns {JSX.Element} The employee card UI
 */
function ManagerEmployeeCard({ name, type, email, phone, img, onDelete}) {
  return (
    <div class="card-wrapper">
      <Link to={"/employee/manager/staff/" + name.replace(" ", "_").toLowerCase()}><div class="manager-employee-card">
          <div class="employee-main">
              <h2 class="employee-name">{name}</h2>
              <p class="employee-role">{type}</p>
          </div>
          <img src={`data:image/png;base64,${img}`}></img>
          <div class="employee-contact">
              <p>Email: {email}</p>
              <p>Phone: {phone}</p>
          </div>
      </div></Link>

      <button className="manager-delete-btn" onClick={(e) => {
        e.preventDefault();
        if (window.confirm(`Fire ${name}?`)) {
            onDelete(name);
        }}}>✕</button>
    </div>
  );
}

export default ManagerEmployeeCard;
