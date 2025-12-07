import React, { useCallback, useEffect, useState, useRef } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const initialDefaultCenter = { lat: 29.7604, lng: -95.3698 };
const libraries = ["places"];

function LocationMap({ locations, searchAddress, initialCenter = initialDefaultCenter, onAddressGeocoded }) {
  const [mapCenter, setMapCenter] = useState(initialCenter);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const geocoderRef = useRef(null);
  const [apiReady, setApiReady] = useState(false);

  const onLoadMap = useCallback((map) => {
    if (window.google?.maps) {
      geocoderRef.current = new window.google.maps.Geocoder();
      setApiReady(true);
    }
  }, []);

  useEffect(() => {
    if (!apiReady) return;
    if (!searchAddress || searchAddress.trim() === "") {
      setMapCenter(initialCenter);
      return;
    }

    geocoderRef.current.geocode({ address: searchAddress }, (results, status) => {
      if (status === "OK" && results.length > 0) {
        const loc = results[0].geometry.location;
        const newCenter = { lat: loc.lat(), lng: loc.lng() };
        setMapCenter(newCenter);
        onAddressGeocoded(newCenter);
      } else {
        console.error("Geocode failed:", status);
        setMapCenter(initialCenter);
        onAddressGeocoded(initialCenter);
      }
    });
  }, [searchAddress, apiReady, initialCenter, onAddressGeocoded]);


  return (
    <LoadScript
      googleMapsApiKey={"AIzaSyD9CQzryA0YqZ6m5Nqlsexm55_WPDt4Jps"} // Need to find a way to hide this
      libraries={libraries}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={mapCenter}
        zoom={12}
        onLoad={onLoadMap}
      >
        {locations?.map((loc, i) => {
          if (!loc?.geometry?.location) return null;

          const position = {
            lat: typeof loc.geometry.location.lat === "function"
              ? loc.geometry.location.lat()
              : loc.geometry.location.lat,
            lng: typeof loc.geometry.location.lng === "function"
              ? loc.geometry.location.lng()
              : loc.geometry.location.lng,
          };

          const name = loc.name || "Panda Express";
          const address = loc.formatted_address || loc.vicinity || "";
          const rating = loc.rating || null;
          const totalReviews = loc.user_ratings_total || null;
          const hours = loc.opening_hours?.weekday_text || ["Hours not available"];
          const openNow = loc.opening_hours?.open_now;
          const types = loc.types?.join(", ") || "";

          return (
            <Marker
              key={i}
              position={position}
              onClick={() =>
                setSelectedLocation({ position, name, address, rating, totalReviews, hours, openNow, types })
              }
            />
          );
        })}

        {selectedLocation && (
          <InfoWindow
            position={selectedLocation.position}
            onCloseClick={() => setSelectedLocation(null)}
          >
            <div style={{ maxWidth: "250px", fontFamily: "Arial, sans-serif" }}>
              <h3 style={{ margin: "0 0 5px 0" }}>{selectedLocation.name}</h3>
              {selectedLocation.address && <p style={{ margin: "2px 0" }}>{selectedLocation.address}</p>}

              {selectedLocation.rating && (
                <p style={{ margin: "2px 0" }}>
                  Rating: {selectedLocation.rating} ({selectedLocation.totalReviews || 0} reviews)
                </p>
              )}

              {/* Open/Closed Status */}
              {selectedLocation.openNow !== undefined && (
                <p style={{ margin: "2px 0", fontWeight: "bold", color: selectedLocation.openNow ? "green" : "red" }}>
                  {selectedLocation.openNow ? "Open Now" : "Closed Now"}
                </p>
              )}
              {selectedLocation.types && (
                <p style={{ margin: "2px 0", fontSize: "12px" }}>Category: {selectedLocation.types}</p>
              )}

              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${selectedLocation.position.lat},${selectedLocation.position.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "inline-block", marginTop: "5px", fontSize: "14px", color: "#007bff" }}
              >
                Get Directions
              </a>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
}

export default LocationMap;
