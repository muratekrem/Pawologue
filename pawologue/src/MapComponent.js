import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { Loader } from '@googlemaps/js-api-loader';

const API_KEY = "AIzaSyDn_2p8NJHqWX_vHzv6MKyV7786XwUGtzo";
const mapContainerStyle = {
  height: "100vh",
  width: "100%"
};
const defaultCenter = {
  lat: 39.7896,
  lng: 30.5162
};
const defaultZoom = 13;

function MapComponent() {
  const [map, setMap] = useState(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: API_KEY,
      version: "weekly"
    });

    loader.load().then(() => {
      const { google } = window;
      const mapInstance = new google.maps.Map(document.getElementById("map"), {
        center: defaultCenter,
        zoom: defaultZoom
      });
      setMap(mapInstance);
    });
  }, []);

  return (
    <div id="map" style={mapContainerStyle} />
  );
}

export default MapComponent;
