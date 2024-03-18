import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import MapComponent from './MapComponent';


function HomePage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h1>Welcome to Pawologue!</h1>
      <div style={{ display: "flex" }}>
        <Link to="/login" style={styles.button}>Login</Link>
        <Link to="/signup" style={{ ...styles.button, marginLeft: "10px" }}>Sign Up</Link>
        <Link to="/mapcomponent" style={{ ...styles.button, marginLeft: "10px" }}>MapComponent</Link>
      </div>
    </div>
  );
}

function App() {
  return (
    <div>
      <div style={styles.container}>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/mapcomponent" element={<MapComponent />} />
            </Routes>
          </div>
        </Router>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center"
  },
  button: {
    padding: "8px 16px",
    borderRadius: "5px",
    backgroundColor: "#6a1b9a",
    color: "#fff",
    textDecoration: "none",
    border: "none",
    cursor: "pointer",
  }
};

export default App;
