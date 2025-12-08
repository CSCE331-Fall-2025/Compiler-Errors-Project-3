import React from "react";
import "../../../css/style.css"

/**
 * DataRowEntry component.
 *
 * Displays a single row of manager data, including date, time, item, quantity, and price.
 *
 * @component
 * @param {Object} props
 * @param {string} props.date - The date of the entry.
 * @param {string} props.time - The time of the entry.
 * @param {string} props.item - The item name.
 * @param {number} props.qty - The quantity of the item.
 * @param {string} props.price - The price of the item.
 * @returns {JSX.Element} The data row entry UI
 */
function DataRowEntry({ date, time, item, qty, price }) {
  return (
    <div class="manager-data-viewer-row-entry">
        <div class="manager-data-date">{date}</div>
        <div class="manager-data-time">{time}</div>
        <div class="manager-data-item">{item}</div>
        <div class="manager-data-qty">{"x"+qty}</div>
        <div class="manager-data-price">{price}</div>
    </div>
  );
}

export default DataRowEntry;
