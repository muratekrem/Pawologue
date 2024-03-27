import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { Loader } from "@googlemaps/js-api-loader";
import BlueMark from "../blueMark.jpg";

const API_KEY = "AIzaSyDn_2p8NJHqWX_vHzv6MKyV7786XwUGtzo";

const defaultCenter = {
  lat: 39.7896,
  lng: 30.5162,
};
const defaultZoom = 13;

const vetsMarker = [
  { name: "Vet1", location: { lat: 39.7896, lng: 38.7896 } },
  { name: "Vet2", location: { lat: 39.2, lng: 39.0 } },
];

function MapComponent() {
  const [map, setMap] = useState(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: API_KEY,
      version: "weekly",
    });

    loader.load().then(() => {
      const { google } = window;
      const mapInstance = new google.maps.Map(document.getElementById("map"), {
        center: defaultCenter,
        zoom: defaultZoom,
      });
      setMap(mapInstance);
    });
  }, []);

  return (
    <div>
      <div id="map" style={{ width: "100%", height: "100vh" }}></div>
    </div>
  );
}

export default MapComponent;
