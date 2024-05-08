import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

const styles = {
  container: {
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
  const auth = getAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Clear currentUser from local storage
        localStorage.removeItem('currentUser');
        // Başarıyla çıkış yapıldığında yapılacak işlemler
        console.log("User logged out successfully!");
        // Kullanıcıyı "/" yoluna yönlendir
        navigate("/");
      })
      .catch((error) => {
        // Çıkış sırasında hata oluştuğunda yapılacak işlemler
        console.error("Error signing out:", error);
      });
  };

  return (
    <div style={styles.container}>
      <Link to="/" style={styles.navbarLink}>
        <h3>Pawologue</h3>
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
      {auth.currentUser ? (
        <>
          <Link to="/profile" style={styles.button}>
            Profile
          </Link>
          <Link to="/" onClick={() => handleLogout()} style={styles.button}>
            Log Out
          </Link>
        </>
      ) : (
        <div>
          <Link to="/login" style={styles.button}>
            Login
          </Link>
          <Link to="/signup" style={{ ...styles.button, marginLeft: "10px" }}>
            Sign Up
          </Link>
        </div>
      )}
    </div>
  );
}

export default Navbar;
