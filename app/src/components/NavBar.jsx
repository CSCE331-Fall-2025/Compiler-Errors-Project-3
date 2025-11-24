import React from "react";
import { Link } from "react-router-dom";
import "../css/style.css"


function NavBar() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/menu">Menu</Link></li>
        <li><Link to="/locations">Locations</Link></li>
        <li><Link to="/weather">Weather</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    </nav>
  );
}

export default NavBar;