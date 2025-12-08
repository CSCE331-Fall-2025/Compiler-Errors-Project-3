import React from "react";
import { Link } from "react-router-dom";
import "../../../css/style.css"

/**
 * ManagerMenuCard component.
 *
 * Displays a menu item card for managers, showing image, title, calories,
 * type, seasonal flag, price, and provides a delete button.
 *
 * @component
 * @param {Object} props
 * @param {string} props.img - Base64 image string of the menu item
 * @param {string} props.alt - Alt text for the image
 * @param {string} props.title - Title of the menu item
 * @param {string} props.cal - Calories information
 * @param {string} props.price - Price of the item
 * @param {string} props.type - Type of the menu item (Entree, Side, Beverage)
 * @param {boolean} props.seasonal - Whether the item is seasonal
 * @param {function} props.onDelete - Callback to delete the menu item
 * @returns {JSX.Element} Menu item card
 */
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
