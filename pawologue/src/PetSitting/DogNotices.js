import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import { getDatabase, ref, get } from "firebase/database";
import { Link } from "react-router-dom";
import "./DogNotices.css";

const DogNotice = () => {
  const [sittingNotices, setSittingNotices] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const storedCurrentUser = localStorage.getItem("currentUser");
    if (storedCurrentUser) {
      setCurrentUser(JSON.parse(storedCurrentUser));
    }
  }, []);

  useEffect(() => {
    const fetchSittingNotices = async () => {
      const db = getDatabase();
      const petRef = ref(db, "petSitting");
      try {
        const snapshot = await get(petRef);
        if (snapshot.exists()) {
          const notices = [];
          snapshot.forEach((childSnapshot) => {
            const notice = {
              id: childSnapshot.key,
              ...childSnapshot.val(),
            };
            notices.push(notice);
          });
          setSittingNotices(notices);
        } else {
          console.log("No data available");
        }
      } catch (error) {
        console.error("Error fetching sitting notices:", error);
      }
    };

    fetchSittingNotices();
  }, []);

  const handleStartConversation = async (selectedUser) => {
    try {
      const response = await fetch(
        "https://pawologue-default-rtdb.firebaseio.com/Messaging.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            currentUser: currentUser.name,
            selectedUser: selectedUser,
            messages: [],
          }),
        }
      );
      if (response.ok) {
        console.log("Messaging data sent to database");
      } else {
        console.error("Error sending messaging data:", response.statusText);
      }
    } catch (error) {
      console.error("Error sending messaging data:", error);
    }
  };

  const styles = {
    button: {
      padding: "8px 16px",
      borderRadius: "5px",
      backgroundColor: "#6a1b9a",
      color: "#fff",
      textDecoration: "none",
      border: "none",
      cursor: "pointer",
      marginTop: "10px",
    },
  };
  return (
    <div>
      <Navbar />
      <div
        style={{ display: "flex", alignItems: "center", justifyContent: "end" }}
      >
        <Link to="/petSitting" style={styles.button}>
          Walk your dog by handing it over to someone else
        </Link>
      </div>

      <div className="pet-container">
        <div className="columnn">
          <h3 className="text">Earn money by walking dogs</h3>
          <div className="pet-card-wrapperr">
            {sittingNotices.map((notice, index) => {
              return (
                <div key={index} className="pet-car">
                  <div className="pet-content">
                    {notice.photoURL && (
                      <img
                        src={notice.photoURL}
                        alt=""
                        width={170}
                        height={170}
                      />
                    )}
                    <div className="pet-details">
                      <div className="pet-info-text">Name: {notice.name}</div>
                      <div className="pet-info-text">Breed: {notice.breed}</div>
                      <div className="pet-info-text">
                        Location: {notice.location}
                      </div>
                      <div className="pet-info-text">
                        Hourly Rate: {notice.hourlyRate}
                      </div>
                      <div className="pet-info-text">
                        Created By: {notice.createdBy}
                      </div>
                      {currentUser &&
                      currentUser.name &&
                      notice.createdBy !== currentUser.name ? (
                        <Link
                          to="/chat"
                          className="button"
                          onClick={() =>
                            handleStartConversation(notice.createdBy)
                          }
                        >
                          Start Conversation
                        </Link>
                      ) : (
                        <button disabled className="button">
                          Start Conversation
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DogNotice;
