import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker, DirectionsService, DirectionsRenderer } from "@react-google-maps/api";
import { Loader } from "@googlemaps/js-api-loader";
import Navbar from "../Navbar";
import "./mapComponent.css";

const API_KEY = "AIzaSyDn_2p8NJHqWX_vHzv6MKyV7786XwUGtzo";
const defaultCenter = {
  lat: 39.7776,
  lng: 30.5162,
};
const defaultZoom = 14;

function MapComponent() {
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [showVets, setShowVets] = useState(false);
  const [showPetShops, setShowPetShops] = useState(false);
  const [showParks, setShowParks] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [currentLocationMarker, setCurrentLocationMarker] = useState(null);
  const [destination, setDestination] = useState(null);
  const [directions, setDirections] = useState(null);
  const [directionsService, setDirectionsService] = useState(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: API_KEY,
      version: "weekly",
      libraries: ["places"],
    });

    loader.load().then(() => {
      setDirectionsService(new window.google.maps.DirectionsService());
    });
  }, []);

  useEffect(() => {
    if (currentLocation && !currentLocationMarker && map) {
      const orangeMarkerURL = "http://maps.google.com/mapfiles/ms/icons/orange-dot.png";
      const orangeMarker = new window.google.maps.Marker({
        position: currentLocation,
        map: map,
        title: "Your Location",
        icon: orangeMarkerURL,
      });
      setCurrentLocationMarker(orangeMarker);
      setMarkers(prevMarkers => [...prevMarkers, orangeMarker]);
    }
  }, [currentLocation, currentLocationMarker, map]);

  useEffect(() => {
    if (map) {
      // Tüm önceki markerları kaldır
      markers.forEach(marker => {
        marker.setMap(null);
      });
      setMarkers([]);

      const service = new window.google.maps.places.PlacesService(map);

      if (showVets) {
        const vetRequest = {
          location: defaultCenter,
          radius: 30000,
          keyword: ["veteriner"],
        };
        service.nearbySearch(vetRequest, (vetResults, vetStatus) => {
          if (vetStatus === window.google.maps.places.PlacesServiceStatus.OK) {
            const newMarkers = vetResults.map(vetPlace => {
              const vetIcon = {
                url: "https://maps.google.com/mapfiles/kml/paddle/red-circle.png",
                scaledSize: new window.google.maps.Size(40, 40),
              };
              return new window.google.maps.Marker({
                position: vetPlace.geometry.location,
                map: map,
                icon: vetIcon,
                id: vetPlace.place_id
              });
            });
            setMarkers(prevMarkers => [...prevMarkers, ...newMarkers]);
          }
        });
      }
      

      if (showPetShops) {
        const petShopRequest = {
          location: defaultCenter,
          radius: 30000,
          keyword: ["pet shop"],
        };
        service.nearbySearch(petShopRequest, (petShopResults, petShopStatus) => {
          if (petShopStatus === window.google.maps.places.PlacesServiceStatus.OK) {
            const newMarkers = petShopResults.map(petShopPlace => {
              const petShopIcon = {
                url: "https://maps.google.com/mapfiles/kml/paddle/blu-circle.png",
                scaledSize: new window.google.maps.Size(40, 40),
              };
              return new window.google.maps.Marker({
                position: petShopPlace.geometry.location,
                map: map,
                icon: petShopIcon,
                id: petShopPlace.place_id
              });
            });
            setMarkers(prevMarkers => [...prevMarkers, ...newMarkers]);
          }
        });
      }

      if (showParks) {
        const parkRequest = {
          location: defaultCenter,
          radius: 30000,
          keyword: ["park"],
        };
        service.nearbySearch(parkRequest, (parkResults, parkStatus) => {
          if (parkStatus === window.google.maps.places.PlacesServiceStatus.OK) {
            const newMarkers = parkResults.map(parkPlace => {
              const parkIcon = {
                url: "https://maps.google.com/mapfiles/kml/paddle/grn-circle.png",
                scaledSize: new window.google.maps.Size(40, 40),
              };
              return new window.google.maps.Marker({
                position: parkPlace.geometry.location,
                map: map,
                icon: parkIcon,
                id: parkPlace.place_id
              });
            });
            setMarkers(prevMarkers => [...prevMarkers, ...newMarkers]);
          }
        });
      }
    }
  }, [map, showVets, showPetShops, showParks]);

  useEffect(() => {
    if (destination && currentLocation && directionsService) {
      directionsService.route(
        {
          origin: currentLocation,
          destination: destination,
          travelMode: "DRIVING",
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirections(result);
          } else {
            console.error(`Yönler alınamadı: ${status}`);
          }
        }
      );
    }
  }, [destination, currentLocation, directionsService]);

  const handleToggleVets = () => {
    setShowVets(true);
    setShowPetShops(false);
    setShowParks(false);
    setCurrentLocationMarker(null);
    setDestination(null);
  };

  const handleTogglePetShops = () => {
    setShowPetShops(true);
    setShowVets(false);
    setShowParks(false);
    setCurrentLocationMarker(null);
    setDestination(null);
  };

  const handleToggleParks = () => {
    setShowParks(true);
    setShowVets(false);
    setShowPetShops(false);
    setCurrentLocationMarker(null);
    setDestination(null);
  };

  const handleMarkerClick = (place_id) => {
    const place = markers.find(marker => marker.id === place_id);
    setDestination(place.position);
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ lat: latitude, lng: longitude });
        setDestination({ lat: latitude, lng: longitude });
      });
    } else {
      alert("Konum servisi kullanılamıyor!");
    }
  };

  return (
    <div>
      <Navbar />
      <div id="map" style={{ width: "100%", height: "89vh", position: "relative" }}>
        <LoadScript
          googleMapsApiKey={API_KEY}
          libraries={["places"]}
          onLoad={() => {}}
        >
          <GoogleMap
            mapContainerStyle={{
              width: "100%",
              height: "100%",
            }}
            zoom={defaultZoom}
            center={defaultCenter}
            onLoad={map => setMap(map)}
            options={{gestureHandling: "greedy"}}
          >
            {map && (
              <div style={{ position: "absolute", top: "10px", right: "10px", zIndex: "1000",  marginRight:"40px" }}>
                <button className="map-button" onClick={handleToggleVets}>Vets</button>
                <button className="map-button" onClick={handleTogglePetShops}>Pet Shops</button>
                <button className="map-button" onClick={handleToggleParks}>Parks</button>
                <button className="map-button" onClick={getCurrentLocation}>
                  My Location
                </button>
              </div>
            )}
            {(destination && currentLocation) && (
              <DirectionsService
                options={{
                  destination: destination,
                  origin: currentLocation,
                  travelMode: "DRIVING",
                }}
                callback={(result, status) => {
                  if (status === "OK") {
                    setDirections(result);
                  } else {
                    console.error(`Yönler alınamadı: ${status}`);
                  }
                }}
              />
            )}
            {directions && (
              <DirectionsRenderer
                options={{
                  directions: directions,
                  polylineOptions: { strokeColor: "red" },
                  preserveViewport:false, 
                  draggable:true,
                }}
              />
            )}
            {markers.map(marker => (
              <Marker
                key={marker.id}
                position={{ lat: marker.position.lat(), lng: marker.position.lng() }}
                onClick={() => handleMarkerClick(marker.id)}
              />
            ))}
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
}

export default MapComponent;
