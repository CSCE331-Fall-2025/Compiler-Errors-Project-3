import React, { useEffect, useState, useCallback } from "react";
import "../../../css/locations.css";
import NavBar from "../../NavBar";
import Map from "./LocationMap";

const initialCenter = { lat: 29.2882, lng: -94.8105 };

function LocationsPage() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentCenter, setCurrentCenter] = useState(initialCenter);

  const [searchAddress, setSearchAddress] = useState("");
  const [submittedAddress, setSubmittedAddress] = useState("");

  const loadLocations = useCallback(async (center) => {
    setLoading(true);
    setError(null);

    const lat = center?.lat ?? initialCenter.lat;
    const lng = center?.lng ?? initialCenter.lng;

    try {
      const res = await fetch(`http://localhost:3000/api/places?lat=${lat}&lng=${lng}`);
      const data = await res.json();

      if (!Array.isArray(data) || data.length === 0) {
        setError("No restaurant locations found.");
        setLocations([]);
      } else {
        setLocations(data);
        setCurrentCenter(center);
      }
    } catch (err) {
      setError("Failed to fetch locations.");
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    loadLocations(initialCenter);
  }, [loadLocations]);

  const handleAddressGeocoded = useCallback((coords) => {
    if (!coords) return;
    loadLocations(coords);
  }, [loadLocations]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSubmittedAddress(searchAddress);
  };

  if (loading && locations.length === 0) return <p>Loading...</p>;
  if (error && locations.length === 0) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <>
      <NavBar />

      <div className="locations-page">
        <header className="locations-hero">
          <div className="hero-inner">
            <h3 className="hero-sub">FIND A</h3>
            <h2 className="hero-sub">PANDA EXPRESS NEAR YOU</h2>
            <h1 className="hero-title">LOCATIONS</h1>
          </div>
        </header>

        <main className="locations-content">

          <div className="location-search-bar">
            <form onSubmit={handleSearchSubmit}>
              <input
                type="text"
                placeholder="Enter address or zip code..."
                value={searchAddress}
                onChange={(e) => setSearchAddress(e.target.value)}
              />
              <button type="submit">Search</button>
            </form>
          </div>

          <div className="cards">
            <section className="card map-card">
              <Map
                locations={locations}
                searchAddress={submittedAddress}
                initialCenter={currentCenter}
                onAddressGeocoded={handleAddressGeocoded}
              />
            </section>
          </div>
        </main>
      </div>
    </>
  );
}

export default LocationsPage;