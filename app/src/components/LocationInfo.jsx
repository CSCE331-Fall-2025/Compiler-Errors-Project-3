import React from 'react';
import NavBar from "./NavBar";

function LocationInfo(){
    return(
        <section className="card info-card">
            <h3>Information</h3>
            <p className="status open">Open • Closes 10PM</p>
            <address className="address">6027 Stewart Rd<br/>Galveston, TX 77551</address>
            <p className="phone">(346) 291-2298</p>
            <p className="services">Catering | Delivery | Takeout</p>
            
          </section>
    );
}

export default LocationInfo;