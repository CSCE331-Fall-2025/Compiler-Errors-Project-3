import React from "react";
import { Link } from "react-router-dom";
import "../../../css/style.css"


function ManagerEmployeeCard({ name, type, email, phone}) {
  return (
    <Link to={"/employee/manager/staff/" + name.replace(" ", "_").toLowerCase()}><div class="manager-employee-card">
        <div class="employee-main">
            <h2 class="employee-name">{name}</h2>
            <p class="employee-role">{type}</p>
        </div>
        {/* TO BE IMPLEMENTED */}
        <img src=""></img>
        <div class="employee-contact">
            <p>Email: {email}</p>
            <p>Phone: {phone}</p>
        </div>
    </div></Link>
  );
}

export default ManagerEmployeeCard;