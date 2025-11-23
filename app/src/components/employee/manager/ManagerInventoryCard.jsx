import React from "react";
import { Link } from "react-router-dom";
import "../../../css/style.css"


function ManagerInventoryCard({ name, quantity, unit_price, minimum }) {
  return (
    <Link to={"/employee/manager/inventory/" + name}><div class="manager-inventory-card">
      <div class="manager-inventory-name">{name}</div>

      <div class="manager-inventory-info">
          <div class="manager-info-row">
              <span class="label">Stock:</span>
              <span class="value">{quantity}</span>
          </div>
          <div class="manager-info-row">
              <span class="label">Unit Price:</span>
              <span class="value">${unit_price.toFixed(2)}</span>
          </div>
          <div class="manager-info-row">
              <span class="label">Minimum:</span>
              <span class="value">{minimum}</span>
          </div>
      </div>
    </div></Link>
  );
}

export default ManagerInventoryCard;