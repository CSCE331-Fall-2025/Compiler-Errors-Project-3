import React from "react";
import { Link } from "react-router-dom";
import "../../../css/style.css"


function ManagerEmployeeCard({ name, type, email, phone, img}) {
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