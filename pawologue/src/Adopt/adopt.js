import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import { getDatabase, ref, get } from "firebase/database";
import "./adopt.css";
import { Link } from "react-router-dom";

const Adopt = () => {
  const [adoptedPets, setAdoptedPets] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const storedCurrentUser = localStorage.getItem(`currentUser`);
    if (storedCurrentUser) {
      setCurrentUser(JSON.parse(storedCurrentUser));
    }
  }, []);

  useEffect(() => {
    const fetchAdoptedPets = async () => {
      const db = getDatabase();
      const petRef = ref(db, "Notice");
      try {
        const snapshot = await get(petRef);
        if (snapshot.exists()) {
          const pets = [];
          snapshot.forEach((childSnapshot) => {
            const pet = {
              id: childSnapshot.key,
              ...childSnapshot.val(),
            };
            pets.push(pet);
          });
          setAdoptedPets(pets);
        } else {
          console.log("No data available");
        }
      } catch (error) {
        console.error("Error fetching adopted pets:", error);
      }
    };

    fetchAdoptedPets();
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

  return (
    <div>
      <Navbar />
      <h2>Adopt</h2>
      <div className="pet-container">
        <div className="column">
          <h3 style={{ marginLeft: "5px" }}>Cats</h3>
          <div className="pet-card-wrapper">
            {adoptedPets.map((pet, index) => {
              if (pet.type === "cat") {
                return (
                  <div key={index} className="pet-cardd">
                    <div className="pet-content">
                      {pet.photoURL && (
                        <img
                          src={pet.photoURL}
                          alt=""
                          width={170}
                          height={170}
                        />
                      )}
                      <div className="pet-details">
                        <div className="pet-info-text">Name: {pet.name}</div>
                        <div className="pet-info-text">Age: {pet.age}</div>
                        <div className="pet-info-text">Breed: {pet.breed}</div>
                        <div className="pet-info-text">
                          Location: {pet.location}
                        </div>
                        <div className="pet-info-text">
                          Created By: {pet.createdBy}
                        </div>
                        {currentUser &&
                        currentUser.name &&
                        pet.createdBy !== currentUser.name ? (
                          <Link
                            to="/chat"
                            className="button"
                            onClick={() =>
                              handleStartConversation(pet.createdBy)
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
              }
              return null;
            })}
          </div>
        </div>
        <div className="divider"></div>
        <div className="column">
          <h3>Dogs</h3>
          <div className="pet-card-wrapper">
            {adoptedPets.map((pet, index) => {
              if (pet.type === "dog") {
                return (
                  <div key={index} className="pet-cardd">
                    <div className="pet-content">
                      {pet.photoURL && (
                        <img
                          src={pet.photoURL}
                          alt=""
                          width={170}
                          height={170}
                        />
                      )}
                      <div className="pet-details">
                        <div className="pet-info-text">Name: {pet.name}</div>
                        <div className="pet-info-text">Age: {pet.age}</div>
                        <div className="pet-info-text">Breed: {pet.breed}</div>
                        <div className="pet-info-text">
                          Location: {pet.location}
                        </div>
                        <div className="pet-info-text">
                          Created By: {pet.createdBy}
                        </div>
                        {currentUser &&
                        currentUser.name &&
                        pet.createdBy !== currentUser.name ? (
                          <Link
                            to="/chat"
                            className="button"
                            onClick={() =>
                              handleStartConversation(pet.createdBy)
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
              }
              return null;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Adopt;
