import React from "react";
import { Link } from "react-router-dom";
import "../../../css/style.css";

/**
 * ManagerNavBar component.
 *
 * Renders the navigation bar for the manager section with links to all manager pages.
 *
 * @component
 * @returns {JSX.Element} Navigation bar for manager
 */
function ManagerNavBar() {
  return (
    <nav>
      <ul>
        <li class="nav-home"><Link to="/employee/manager">HOME</Link></li>
        <li><Link to="/employee/manager/data">DATA</Link></li>
        <li><Link to="/employee/manager/staff">EMPLOYEES</Link></li>
        <li><Link to="/employee/manager/menu">MENU</Link></li>
        <li><Link to="/employee/manager/inventory">INVENTORY</Link></li>
        <li><Link to="/employee/manager/stats">STATS</Link></li>
      </ul>
    </nav>
  );
}

export default ManagerNavBar;
