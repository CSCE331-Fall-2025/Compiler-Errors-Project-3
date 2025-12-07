import React, { useCallback, useEffect, useState, useRef } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '300px'
};

const initialDefaultCenter = { lat: 29.7604, lng: -95.3698 };
const libraries = ["places"];

function LocationMap({ locations, searchAddress, initialCenter = initialDefaultCenter, onAddressGeocoded }) {

  const [mapCenter, setMapCenter] = useState(initialCenter);
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
      googleMapsApiKey="AIzaSyD9CQzryA0YqZ6m5Nqlsexm55_WPDt4Jps"
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

          return (
            <Marker
              key={i}
              position={{
                lat: typeof loc.geometry.location.lat === "function"
                  ? loc.geometry.location.lat()
                  : loc.geometry.location.lat,
                lng: typeof loc.geometry.location.lng === "function"
                  ? loc.geometry.location.lng()
                  : loc.geometry.location.lng,
              }}
            />
          );
        })}
      </GoogleMap>
    </LoadScript>
  );
}

export default LocationMap;
