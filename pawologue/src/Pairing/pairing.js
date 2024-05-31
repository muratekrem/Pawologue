import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import dogPhoto from "../dog.jpg";
import catPhoto from "../cat.jpg";
import "./pairing.css"; // Stil dosyasını import edin

const Pairing = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const storedCurrentUser = localStorage.getItem("currentUser");
    if (storedCurrentUser) {
      setCurrentUser(JSON.parse(storedCurrentUser));
    }
  }, []);

  return (
    <div>
      <Navbar />
      <h3 style={{ display: "flex", justifyContent: "center" }}>
        We use one of the best algorithm for matching pets. You must see a vet
        for your pet's health issues.
      </h3>
      <h3 style={{ display: "flex", justifyContent: "center" }}>
        {" "}
        For finding best partner for your pet, you must Login/Sign Up first
      </h3>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <Link
          to="/addcat"
          className={`button ${!currentUser ? "disabled-link" : ""}`}
        >
          You can add your cat to our system to find the best partners when a
          new cat is added to the system.
        </Link>
        <Link
          to="/adddog"
          className={`button ${!currentUser ? "disabled-link" : ""}`}
        >
          You can add your dog to our system to find the best partners when a
          new dog is added to the system.
        </Link>
      </div>
      <div className="pairing-container">
        <div>
          <h2>Find the best partners for your cat</h2>
          <Link
            to="/catmatchform"
            className={`pairing-photo-wrapper ${
              !currentUser ? "disabled-link" : ""
            }`}
          >
            <img src={catPhoto} alt="Cat" className="pairing-photo" />
          </Link>
        </div>
        <div>
          <h2>Find the best partners for your dog</h2>
          <Link
            to="/dogmatchform"
            className={`pairing-photo-wrapper ${
              !currentUser ? "disabled-link" : ""
            }`}
          >
            <img src={dogPhoto} alt="Dog" className="pairing-photo" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Pairing;
