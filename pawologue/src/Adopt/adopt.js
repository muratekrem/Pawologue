import { Link } from "react-router-dom"; // Link componentini import et
import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import { getDatabase, ref, get, child } from "firebase/database";
import "./adopt.css";

const Adopt = () => {
  const [adoptedPets, setAdoptedPets] = useState([]);
  const [currentUser, setCurrentUser] = useState(null); // Kullanıcı durumunu tanımla

  useEffect(() => {
    // localStorage'dan currentUser'ı al
    const storedCurrentUser = localStorage.getItem(`currentUser`);
    if (storedCurrentUser) {
      setCurrentUser(JSON.parse(storedCurrentUser));
    }
  }, []);

  useEffect(() => {
    const fetchAdoptedPets = async () => {
      const db = getDatabase();
      const petRef = ref(db, 'Notice'); // Notice olarak varsayalım, bu database yolunu ilanlarınızın bulunduğu yola göre güncellemelisiniz
      try {
        const snapshot = await get(petRef);
        if (snapshot.exists()) {
          const pets = [];
          snapshot.forEach((childSnapshot) => {
            const pet = {
              id: childSnapshot.key,
              ...childSnapshot.val()
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

  return (
    <div>
      <Navbar />
      <h2>Adopt</h2>
      <div className="pet-container">
        <div className="column">
          <h3>Cats</h3>
          <div className="pet-card-wrapper">
            {adoptedPets.map((pet, index) => {
              if (pet.type === "cat") {
                return (
                  <div key={index} className="pet-card">
                    <div className="pet-content">
                      {pet.photo && (
                        <img src={URL.createObjectURL(pet.photo)} alt="" width={170} height={170} />
                      )}
                      <div className="pet-details">
                        <div className="pet-info-text">Name: {pet.name}</div>
                        <div className="pet-info-text">Age: {pet.age}</div>
                        <div className="pet-info-text">Breed: {pet.breed}</div>
                        <div className="pet-info-text">Location: {pet.location}</div>
                        <div className="pet-info-text">Created By: {pet.createdBy}</div>
                        {/* Kullanıcı giriş yapmışsa ve ilan sahibi farklıysa, Start Conversation'a linkle */}
                {currentUser && pet.createdBy !== currentUser.name ? (
                  <Link to="/chat" className="button">Start Conversation</Link>
                ) : (
                  // Kullanıcı giriş yapmamışsa veya ilan sahibi kendisiyse, linki devre dışı bırak
                  <button disabled className="button">Start Conversation</button>
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
                  <div key={index} className="pet-card">
                    <div className="pet-content">
                      {pet.photo && (
                        <img src={URL.createObjectURL(pet.photo)} alt="" width={170} height={170} />
                      )}
                      <div className="pet-details">
                        <div className="pet-info-text">Name: {pet.name}</div>
                        <div className="pet-info-text">Age: {pet.age}</div>
                        <div className="pet-info-text">Breed: {pet.breed}</div>
                        <div className="pet-info-text">Location: {pet.location}</div>
                        <div className="pet-info-text">Created By: {pet.createdBy}</div>
                        {/* Kullanıcı giriş yapmışsa ve ilan sahibi farklıysa, Start Conversation'a linkle */}
                {currentUser && pet.createdBy !== currentUser.name ? (
                  <Link to="/chat" className="button">Start Conversation</Link>
                ) : (
                  // Kullanıcı giriş yapmamışsa veya ilan sahibi kendisiyse, linki devre dışı bırak
                  <button disabled className="button">Start Conversation</button>
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
