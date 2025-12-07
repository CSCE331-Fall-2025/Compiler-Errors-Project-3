import React from "react";
import "../../../css/style.css"


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