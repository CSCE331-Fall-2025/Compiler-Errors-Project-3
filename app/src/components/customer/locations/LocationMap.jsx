import React from 'react';
import "../../../css/locations.css"

function Map(){
    return(
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
    );
}

export default Map;