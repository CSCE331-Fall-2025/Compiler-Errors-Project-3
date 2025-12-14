import React from 'react';
import NavBar from "../../NavBar";

/**
 * Component displaying general information about a restaurant location,
 * including status, address, phone number, and available services.
 *
 * @component
 * @example
 * return (
 *   <LocationInfo />
 * )
 */
function LocationInfo() {
    return (
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
