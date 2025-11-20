import React from "react";
import { Link } from "react-router-dom";
import "../../../css/style.css"

function ManagerNavBar() {
  return (
    <nav>
      <ul>
        <li class="nav-home"><Link to="/">HOME</Link></li>
        <li><Link to="/menu">DATA</Link></li>
        <li><Link to="/locations">EMPLOYEES</Link></li>
        <li><Link to="/weather">MENU</Link></li>
        <li><Link to="/login">INVENTORY</Link></li>
        <li><Link to="/login">STATS</Link></li>
      </ul>
    </nav>
  );
}

export default ManagerNavBar;