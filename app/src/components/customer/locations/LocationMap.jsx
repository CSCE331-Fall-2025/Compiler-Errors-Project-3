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

/**
 * Displays a Google Map with markers for given restaurant locations.
 *
 * @component
 * @param {Object[]} locations - Array of location objects to display on the map.
 * @param {Object} locations[].geometry.location - Coordinates for each location.
 * @param {number} locations[].geometry.location.lat - Latitude of the location.
 * @param {number} locations[].geometry.location.lng - Longitude of the location.
 *
 * @example
 * const locations = [
 *   { geometry: { location: { lat: 29.7604, lng: -95.3698 } } },
 *   { geometry: { location: { lat: 29.7499, lng: -95.3584 } } }
 * ];
 * return <LocationMap locations={locations} />;
 */
function LocationMap({ locations }) {

  const center = useMemo(() => {
    if (locations && locations.length > 0) {
      const firstLocation = locations[0].geometry.location;
      return { lat: firstLocation.lat, lng: firstLocation.lng };
    }
    return defaultCenter;
  }, [locations]);

  const onLoad = useCallback(function callback(map) {
    // Can be used to do something once the map loads
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
