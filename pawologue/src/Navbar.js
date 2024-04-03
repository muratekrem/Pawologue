import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import MapComponent from "./Map/MapComponent";
import Pairing from "./Pairing/pairing";
import PetSitting from "./PetSitting/petSitting";
import Adopt from "./Adopt/adopt";
import Rehome from "./Rehome/rehome";


const styles = {
    container: {
      width: "100%",
    },
    navbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: "#6a1b9a",
      color: "#fff",
      padding: "10px 20px",
      width: "100%",
      boxSizing: "border-box",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    },
    navbarLink: {
      textDecoration: "none",
      color: "#fff",
      fontSize: "1.2rem",
      fontWeight: "bold",
    },
    button: {
      padding: "8px 16px",
      borderRadius: "5px",
      backgroundColor: "#fff",
      color: "#6a1b9a",
      textDecoration: "none",
      border: "none",
      cursor: "pointer",
    },
  };

  function Navbar() {
    return (
      <div style={styles.navbar}>
          <Link to="/" style={styles.navbarLink}>
            <h3>
              Pawologue
            </h3>
            
          </Link>
          <Link to="/adopt" style={styles.button}>
            Adopt a Pet
          </Link>
          <Link to="/rehome" style={styles.button}>
            Find a Home
          </Link>
        <Link to="/pairing" style={styles.button}>
            Find a Partner
          </Link>
          
  
          
        <Link to="/petSitting" style={styles.button}>
            Pet Sitting
          </Link>
          
          <Link to="/mapcomponent" style={styles.button}>
            Map Component
          </Link>
        <div>
          <Link to="/login" style={styles.button}>
            Login
          </Link>
          <Link to="/signup" style={{ ...styles.button, marginLeft: "10px" }}>
            Sign Up
          </Link>
        </div>
      </div>
    );
  }

  function App() {
    return (
      <div style={styles.container}>
        <Router>
          <div className="App">
            <Routes>
              
              <Route path="/login" element={<Login />} />
              <Route path="/adopt" element={<Adopt />} />
              <Route path="/rehome" element={<Rehome />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/mapcomponent" element={<MapComponent />} />
              <Route path="/pairing" element={<Pairing />} />
              <Route path="/petSitting" element={<PetSitting />} />
            </Routes>
          </div>
        </Router>
      </div>
    );
  }

  export default Navbar;