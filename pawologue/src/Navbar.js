import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import logo from "./logo.png";

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#684589",
    color: "#fff",
    padding: "10px 20px",
    width: "100%",
    boxSizing: "border-box",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    flexWrap: "wrap",
  },
  logo: {
    height: "50px", 
    marginRight: "10px"
  },
  navbarLink: {
    textDecoration: "none",
    color: "#fff",
    fontSize: "1.5rem",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
  },
  mainLinks: {
    display: 'flex',
    justifyContent: 'center',
    flex: '1',
    flexWrap: 'wrap',
  },
  button: {
    padding: "8px 12px",
    borderRadius: "5px",
    backgroundColor: "#684589",
    color: "#fff",
    textDecoration: "none",
    border: "none",
    cursor: "pointer",
    textAlign: "center",
    margin: "5px 2px",
  },
  authButtons: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    flexWrap: 'wrap',
  },
  authButton: {
    backgroundColor: "#fff",
    color: "#6a1b9a",
    padding: "8px 12px",
    borderRadius: "5px",
    textDecoration: "none",
    border: "none",
    cursor: "pointer",
    textAlign: "center",
    margin: "5px 2px",
  }
};

function Navbar() {
  const auth = getAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem('currentUser');
        console.log("User logged out successfully!");
        navigate("/");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  return (
    <div style={styles.container}>
      <Link to="/" style={styles.navbarLink}>
        <img src={logo} alt="Logo" style={styles.logo}/> 
        <h3>Pawologue</h3>
      </Link>
      <div style={styles.mainLinks}> 
        <Link to="/adopt" style={styles.button}>Adopt a Pet</Link>
        <Link to="/rehome" style={styles.button}>Find a Home</Link>
        <Link to="/pairing" style={styles.button}>Find a Partner</Link>
        <Link to="/dognotices" style={styles.button}>Find a Pet Sitter</Link>
        <Link to="/mapcomponent" style={styles.button}>View Map</Link>
      </div>
      <div style={styles.authButtons}>
        {auth.currentUser ? (
          <>
            <Link to="/chat" style={styles.button}>Chat</Link>
            <Link to="/profile" style={styles.button}>Profile</Link>
            <Link to="/" onClick={handleLogout} style={styles.authButton}>Log Out</Link>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.authButton}>Login</Link>
            <Link to="/signup" style={styles.authButton}>Sign Up</Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
