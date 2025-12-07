import React, { useCallback, useMemo } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

// Map container styles
const containerStyle = {
  width: '100%',
  height: '300px' 
};

// Default Houston
const defaultCenter = { lat: 29.7604, lng: -95.3698 }; 

const libraries = ["places"]; 

function LocationMap({ locations }) {

  const center = useMemo(() => {
    if (locations && locations.length > 0) {
      const firstLocation = locations[0].geometry.location;
      return { lat: firstLocation.lat, lng: firstLocation.lng };
    }
    return defaultCenter;
  }, [locations]);

  const onLoad = useCallback(function callback(map) {
  }, []);

  return (
    <LoadScript 
      googleMapsApiKey={'AIzaSyD9CQzryA0YqZ6m5Nqlsexm55_WPDt4Jps'} 
      libraries={libraries}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10} // Adjust zoom level for better viewing of nearby locations
        onLoad={onLoad}
      >
        {/* Map over the locations and place a Marker for each one */}
        {locations.map((loc, index) => (
          <Marker
            key={index}
            position={{
              lat: loc.geometry.location.lat,
              lng: loc.geometry.location.lng,
            }}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
}

export default LocationMap;