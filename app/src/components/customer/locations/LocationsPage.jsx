import React from "react";
import "../../../css/locations.css";
import NavBar from "../../NavBar";
import Map from "./LocationMap";
import Hours from "./LocationHours";
import LocationInfo from "./LocationInfo";

function LocationsPage() {
  return (
    <>
      <NavBar></NavBar>
      
      <div className="locations-page">
        <header className="locations-hero">
          <div className="hero-inner">
            <h3 className="hero-sub"> </h3>
            <h2 className="hero-sub">PANDA EXPRESS AT</h2>
            <h1 className="hero-title">61ST & STEWART</h1>
          </div>
        </header>
        <main className="locations-content">
          <div className="cards">
            <section className="card info-card">
              <h3>INformation</h3>
              <p className="status open">Open  Closes 10PM</p>
              <address className="address">6027 Stewart Rd<br/>Galveston, TX 77551</address>
              <p className="phone">(346) 291-2298</p>
              <p className="services">Catering | Delivery | Takeout</p>
              
            </section>

            <section className="card hours-card">
              <h3>Hours</h3>
              <ul className="hours-list">
                <li><span>Monday</span><span>9:30am - 10:00pm</span></li>
                <li><span>Tuesday</span><span>9:30am - 10:00pm</span></li>
                <li><span>Wednesday</span><span>9:30am - 10:00pm</span></li>
                <li><span>Thursday</span><span>9:30am - 10:00pm</span></li>
                <li><span>Friday</span><span>9:30am - 10:30pm</span></li>
                <li><span>Saturday</span><span>9:30am - 10:30pm</span></li>
                <li><span>Sunday</span><span>10:00am - 10:00pm</span></li>
              </ul>
            </section>

            <section className="card map-card">
              <iframe
                title="map"
                src="https://maps.google.com/maps?q=6027%20Stewart%20Rd%20Galveston%20TX&t=&z=14&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </section>
          </div>
        </main>
      </div>
    </>
  );
}

export default LocationsPage;
