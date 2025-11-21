import React from "react";
import { Link } from "react-router-dom";
import "../css/style.css"

function NavBar() {
  return (
    <nav className="navbar-white">
      <div className="navbar-container">
        <div className="logo"> </div>
      
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/menu">Menu</Link></li>
          <li><Link to="/locations">Locations</Link></li>
          <li><Link to="/weather">Weather</Link></li>
          <li>
            <Link to="/login" className="login-button">Login</Link>
          </li>
        </ul>
      </div>      

    </nav>
  );
}

export default NavBar;