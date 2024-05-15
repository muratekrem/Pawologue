import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
// import io from 'socket.io-client'; 
import Navbar from "../Navbar";

// const socket = io('http://localhost:3001'); // Connect to the server

function Profile() {
  const [userData, setUserData] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const location = useLocation();

  useEffect(() => {
    console.log('Location:', location);
  }, [location]);

  // Load currentUser from local storage when component mounts
  useEffect(() => {
    // Load currentUser from local storage
    const storedCurrentUser = localStorage.getItem(`currentUser`);
    if (storedCurrentUser) {
      setCurrentUser(JSON.parse(storedCurrentUser));
    }
  }, []);

  useEffect(() => {
    const fetchDataFromFirebase = async () => {
      try {
        const response = await fetch("https://pawologue-default-rtdb.firebaseio.com/UserData.json");
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setUserData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error.message);
        setLoading(false);
      }
    };

    fetchDataFromFirebase();
  }, []);

  useEffect(() => {
    if (!loading && location.state && location.state.email) {
      const emailToFind = location.state.email;
      let foundUser = null;
      for (const userId in userData) {
        if (Object.prototype.hasOwnProperty.call(userData, userId)) {
          const user = userData[userId];
          if (user.email === emailToFind) {
            foundUser = user;
            break; // Exit loop if user is found
          }
        }
      }
      setCurrentUser(foundUser);
      // Store currentUser in local storage with a generic key
      localStorage.setItem(`currentUser`, JSON.stringify(foundUser));

      // Emit currentUser data to the server
      console.log(currentUser);
      // socket.emit('current_user', foundUser);
    }
  }, [location.state, userData, loading]);

  return (
    <div>
      <Navbar />
      <div style={styles.container}>
        <h1 style={{ display: "flex", justifyContent: "center" }}>User Profile</h1>
        {loading && <p>Loading...</p>}
        {!loading && currentUser ? (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div style={styles.profileBox}>
              <div style={styles.row}>
                <span>Email: </span>
                <span>{currentUser.email}</span>
              </div>
              <div style={styles.row}>
                <span>Name: </span>
                <span>{currentUser.name}</span>
              </div>
              <div style={styles.row}>
                <span>Surname: </span>
                <span>{currentUser.surname}</span>
              </div>
              <div style={styles.row}>
                <span>Phone Number: </span>
                <span>{currentUser.phoneNumber}</span>
              </div>
              <div style={styles.row}>
                <span>Birthday: </span>
                <span>{currentUser.birthday}</span>
              </div>
            </div>
          </div>
        ) : (
          !loading && <p>No user found</p>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    
  },
  profileBox: {
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '20px',
  },
  row: {
    display: 'flex',
    marginBottom: '10px',
  },
};

export default Profile;
