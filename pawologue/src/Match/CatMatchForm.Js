import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Navbar";
import { getDatabase, ref, get } from "firebase/database";
import { Link } from "react-router-dom";
import "./pairing.css";

const CatMatchForm = () => {
  const [result, setResult] = useState([]);
  const [matchingCats, setMatchingCats] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [showAllCats, setShowAllCats] = useState(true); // Yeni durum

  const handleSubmit = async (e) => {
    e.preventDefault();

    const features = [
      parseFloat(e.target.feature1.value),
      parseFloat(e.target.feature2.value),
      parseFloat(e.target.feature3.value),
      parseFloat(e.target.feature4.value),
      parseFloat(e.target.feature5.value),
      parseFloat(e.target.feature6.value),
    ];

    try {
      let response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ features: features }),
      });

      if (response.ok) {
        let result = await response.json();
        setResult(result.indices);
        setShowAllCats(false); // "Find Match" butonuna basıldığında false yap
      } else {
        console.error("Failed to fetch predictions");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setResult([{ name: "Error fetching data" }]);
    }
  };

  useEffect(() => {
    const storedCurrentUser = localStorage.getItem(`currentUser`);
    if (storedCurrentUser) {
      setCurrentUser(JSON.parse(storedCurrentUser));
    }
  }, []);

  useEffect(() => {
    const fetchAdoptedPets = async () => {
      const db = getDatabase();
      const petRef = ref(db, "CatDBMatch");
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
          setMatchingCats(pets);
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
      <Navbar></Navbar>
      <div className="ayar">
        <div className="container">
          <h1>Cat Match</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="feature1">Breed:</label>
            <select id="feature1" name="feature1">
              <option value="00001">Siyam Kedisi</option>
              <option value="00010">Maine Coon</option>
              <option value="00011">Scottish Fold</option>
              <option value="00100">Sphynx</option>
              <option value="00101">British Shorthair</option>
              <option value="00110">Persian</option>
              <option value="00111">Ragdoll</option>
              <option value="01000">Bengal</option>
              <option value="01001">Turkish Van</option>
              <option value="01010">Abyssinian</option>
              <option value="01011">Birman</option>
              <option value="01100">Exotic Shorthair</option>
              <option value="01101">Devon Rex</option>
              <option value="01110">Oriental</option>
              <option value="01111">Burmese</option>
              <option value="10000">Russian Blue</option>
              <option value="10001">American Shorthair</option>
              <option value="10010">Cornish Rex</option>
              <option value="10011">Turkish Angora</option>
              <option value="10100">Tonkinese</option>
              <option value="10101">Himalayan</option>
            </select>
            <label htmlFor="feature2">Age:</label>
            <select id="feature2" name="feature2">
              <option value="0010">2</option>
              <option value="0011">3</option>
              <option value="0100">4</option>
              <option value="0101">5</option>
              <option value="0110">6</option>
              <option value="0111">7</option>
              <option value="1000">8</option>
              <option value="1001">9</option>
              <option value="1010">10</option>
              <option value="1011">11</option>
              <option value="1100">12</option>
              <option value="1101">13</option>
              <option value="1110">14</option>
            </select>
            <label htmlFor="feature3">Characteristic Features:</label>
            <select id="feature3" name="feature3">
              <option value="0001">Konuşkan</option>
              <option value="0010">Sevecen</option>
              <option value="0011">Kıvrık Kulaklar</option>
              <option value="0100">Meraklı</option>
              <option value="0101">Sakin</option>
              <option value="0110">Zeki</option>
              <option value="0111">Uysal</option>
              <option value="1000">Enerjik</option>
              <option value="1001">Oyuncu</option>
              <option value="1010">Aktif</option>
              <option value="1011">Dostça</option>
            </select>
            <label htmlFor="feature4">Color Of Eye:</label>
            <select id="feature4" name="feature4">
              <option value="0001">Mavi</option>
              <option value="0010">Altın</option>
              <option value="0011">Yeşil</option>
              <option value="0100">Altın-Yeşil</option>
              <option value="0101">Sarı</option>
              <option value="0110">Altın-Mavi</option>
              <option value="0111">Yeşil-Mavi</option>
            </select>
            <label htmlFor="feature5">Types Of Fur:</label>
            <select id="feature5" name="feature5">
              <option value="001">Kısa</option>
              <option value="010">Uzun</option>
              <option value="011">Kısa-Dalgalı</option>
              <option value="100">Tüysüz</option>
            </select>
            <label htmlFor="feature6">Common Disease:</label>
            <select id="feature6" name="feature6">
              <option value="0001">Kronik Böbrek Hastalığı</option>
              <option value="0010">Hipertrofik Kardiyomiyopati (HCM)</option>
              <option value="0011">
                Osteochondrodysplasia (Kıkırdak Displazisi)
              </option>
              <option value="0100">Egzema</option>
              <option value="0101">Polikistik Böbrek Hastalığı (PKD)</option>
              <option value="0110">Kalça Displazisi, Patella Luxation</option>
              <option value="0111">
                Kalıtsal Hiperkalemi (KHT), Fakomelamikroftalmi
              </option>
              <option value="1000">Periodontal Hastalık</option>
              <option value="1001">Glokom</option>
              <option value="1010">Kalıtsal Saç Dökülmesi</option>
              <option value="1100">Sağlıklı</option>
            </select>
            <button type="submit">Find Match</button>
          </form>
        </div>
        <div className="row mb-4"></div>
      </div>
      <div className="pet-list">
        {showAllCats
          ? matchingCats.map((pet, index) => {
              if (currentUser) {
                return (
                  <div key={index} className="pet-card">
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
                        <div className="pet-info-text">
                          Location: {pet.location}
                        </div>
                        <div className="pet-info-text">Breed: {pet.breed}</div>
                        <div className="pet-info-text">Age: {pet.age}</div>
                        <div className="pet-info-text">
                          Characteristic Features: {pet.characteristicFeatures}
                        </div>
                        <div className="pet-info-text">
                          Color of Eye: {pet.colorOfEye}
                        </div>
                        <div className="pet-info-text">
                          Types of Fur: {pet.typesOfFur}
                        </div>
                        <div className="pet-info-text">
                          Common Disease: {pet.commonDisease}
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
            })
          : matchingCats
              .filter((cat, index) => result.includes(index)) // Eşleşen kedileri filtrele
              .map((pet, index) => {
                if (currentUser) {
                  return (
                    <div key={index} className="pet-card">
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
                          <div className="pet-info-text">
                            Location: {pet.location}
                          </div>
                          <div className="pet-info-text">
                            Breed: {pet.breed}
                          </div>
                          <div className="pet-info-text">Age: {pet.age}</div>
                          <div className="pet-info-text">
                            Characteristic Features:{" "}
                            {pet.characteristicFeatures}
                          </div>
                          <div className="pet-info-text">
                            Color of Eye: {pet.colorOfEye}
                          </div>
                          <div className="pet-info-text">
                            Types of Fur: {pet.typesOfFur}
                          </div>
                          <div className="pet-info-text">
                            Common Disease: {pet.commonDisease}
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
  );
};

export default CatMatchForm;
