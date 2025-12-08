import React, { useEffect, useState, useCallback } from "react";
import "../../../css/locations.css";
import NavBar from "../../NavBar";
import Map from "./LocationMap";

const initialCenter = { lat: 29.2882, lng: -94.8105 };

/**
 * LocationsPage component displays all restaurant locations, a search bar,
 * and a map showing the locations as markers.
 *
 * @component
 *
 * @example
 * return <LocationsPage />;
 */
function LocationsPage() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentCenter, setCurrentCenter] = useState(initialCenter);

  const [searchAddress, setSearchAddress] = useState("");
  const [submittedAddress, setSubmittedAddress] = useState("");

  /**
   * Loads restaurant locations from the API and updates state.
   * @param {Object} center - Latitude and longitude to center the map.
   * @param {number} center.lat - Latitude coordinate.
   * @param {number} center.lng - Longitude coordinate.
   */
  const loadLocations = useCallback(async (center) => {
    setLoading(true);
    setError(null);

    const lat = center?.lat ?? initialCenter.lat;
    const lng = center?.lng ?? initialCenter.lng;

    try {
      const res = await fetch(`http://localhost:3000/api/places`);
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

  /**
   * Callback called when a new address is geocoded to coordinates.
   * @param {Object} coords - Latitude and longitude of the geocoded address.
   * @param {number} coords.lat - Latitude coordinate.
   * @param {number} coords.lng - Longitude coordinate.
   */
  const handleAddressGeocoded = (coords) => {
    if (!coords) return;
    loadLocations(coords);
  };

  /**
   * Handles the form submit for address search.
   * @param {React.FormEvent<HTMLFormElement>} e - Form submission event.
   */
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
