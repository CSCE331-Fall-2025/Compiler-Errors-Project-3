import React from "react";
import { Link } from "react-router-dom";
import "../../../css/style.css"


function ManagerMenuCard({ img, alt, title, cal, price, type, seasonal, onDelete }) {
  return (
    <div class="card-wrapper">
      <Link to={"/employee/manager/menu/" + title.replace(" ", "_")}><div class="manager-menu-card">
          <img class="manager-menu-img" src={`data:image/png;base64,${img}`} alt={alt}/>

          <div class="manager-menu-info">
              <h2 class="manager-menu-name">{title}</h2>
              <p class="manager-menu-cal">{cal}</p>
              <p class="manager-menu-type">{type}</p>
              <p class="manager-menu-seasonal">Seasonal: {seasonal ? "Yes" : "No"}</p>
          </div>

          <div class="manager-menu-price">{price}</div>
      </div></Link>

      <button className="manager-delete-btn" onClick={(e) => {
        e.preventDefault();
        if (window.confirm(`Delete ${title}?`)) {
            onDelete(title);
        }}}>✕</button>
    </div>
  );
}

export default ManagerMenuCard;