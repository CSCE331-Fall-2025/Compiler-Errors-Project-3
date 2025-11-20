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
    <h1>.</h1>
    {/* Didn't really see the need to compartmentalize this */}
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
          <LocationInfo></LocationInfo>
          <Hours></Hours>
          <Map></Map>
        </div>
      </main>
    </div>
    </>
  );
}

export default LocationsPage;
