import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { Loader } from "@googlemaps/js-api-loader";
import BlueMark from "../blueMark.jpg";
import RedMark from "../redMark.png";

const API_KEY = "AIzaSyDn_2p8NJHqWX_vHzv6MKyV7786XwUGtzo";

const defaultCenter = {
  lat: 39.7856,
  lng: 30.5162,
};
const defaultZoom = 15;

const petShops = [
  { name: "Pet Shop 1", location: { lat: 39.7896, lng: 30.52 } },
  { name: "Pet Shop 2", location: { lat: 39.785, lng: 30.518 } },
];

const vetsMarker = [
  { name: "Vet1", location: { lat: 39.7888, lng: 30.510 } },
  { name: "Vet2", location: { lat: 39.7891, lng: 30.524 } },
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

  useEffect(() => {
    if (map) {
      const markers = [];

      // Add markers for pet shops
      petShops.forEach((shop) => {
        const marker = new window.google.maps.Marker({
          position: shop.location,
          map: map,
          icon: {
            url: BlueMark,
            scaledSize: new window.google.maps.Size(40, 40), // Adjust the size here
          },
        });
        markers.push(marker);
      });

      // Add markers for vets
      vetsMarker.forEach((vet) => {
        const marker = new window.google.maps.Marker({
          position: vet.location,
          map: map,
          icon: {
            url: RedMark,
            scaledSize: new window.google.maps.Size(40, 35), // Adjust the size here
          },
        });
        markers.push(marker);
      });
    }
  }, [map]);

  return (
    <div>
      <div id="map" style={{ width: "100%", height: "100vh" }}></div>
    </div>
  );
}

export default MapComponent;


