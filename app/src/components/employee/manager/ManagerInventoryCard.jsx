import React from "react";
import { Link } from "react-router-dom";
import "../../../css/style.css"

/**
 * ManagerInventoryCard component.
 *
 * Displays a single inventory item with name, stock quantity, unit price, and minimum threshold.
 * Includes a delete button with confirmation.
 *
 * @component
 * @param {Object} props
 * @param {string} props.name - Name of the inventory item.
 * @param {number} props.quantity - Current stock quantity.
 * @param {number} props.unit_price - Unit price of the item.
 * @param {number} props.minimum - Minimum stock threshold.
 * @param {function} props.onDelete - Callback invoked when deleting the item.
 * @returns {JSX.Element} Inventory item card
 */
function ManagerInventoryCard({ name, quantity, unit_price, minimum, onDelete }) {
  return (
    <div class="card-wrapper">
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

      <button className="manager-delete-btn" onClick={(e) => {
        e.preventDefault();
        if (window.confirm(`Delete ${name}?`)) {
          onDelete(name);
        }}}>✕</button>
    </div>
  );
}

export default ManagerInventoryCard;
