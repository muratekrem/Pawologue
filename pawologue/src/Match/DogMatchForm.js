import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Navbar";
import { getDatabase, ref, get } from "firebase/database";
import { Link } from "react-router-dom";
import "./pairing.css";

const DogMatchForm = () => {
  const [features, setFeatures] = useState({
    feature1: "000001",
    feature2: "0001",
    feature3: "00001",
    feature4: "110",
    feature5: "01",
    feature6: "00010",
    feature7: "00001",
    feature8: "001",
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setFeatures({
      ...features,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5001/pairing", {
        features: Object.values(features),
      });
      setResult(response.data.indices);
    } catch (error) {
      console.error("Error fetching prediction", error);
    }
  };
  const [matchingDogs, setMatchingDogs] = useState([]);
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
      const petRef = ref(db, "DogDBMatch");
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
          setMatchingDogs(pets);
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
          <h1>Find Your Dog Match</h1>
          <form id="pet-form" onSubmit={handleSubmit}>
            <label htmlFor="feature1">Breed:</label>
            <select
              id="feature1"
              name="feature1"
              value={features.feature1}
              onChange={handleChange}
            >
              <option value="000001">Labrador Retriever</option>
              <option value="000010">German Shepherd</option>
              <option value="000011">Bulldog</option>
              <option value="000100">Poodle</option>
              <option value="000101">Beagle</option>
              <option value="000110">Chihuahua</option>
              <option value="000111">Boxer</option>
              <option value="001000">Golden Retriever</option>
              <option value="001001">Pug</option>
              <option value="001010">Rottweiler</option>
              <option value="001011">Siberian Husky</option>
              <option value="001100">Dachshund</option>
              <option value="001101">Shih Tzu</option>
              <option value="001110">Bichon Frise</option>
              <option value="001111">Australian Shepherd</option>
              <option value="010000">Basset Hound</option>
              <option value="010001">Cocker Spaniel</option>
              <option value="010010">French Bulldog</option>
              <option value="010011">Pomeranian</option>
              <option value="010100">Great Dane</option>
              <option value="010101">Mastiff</option>
              <option value="010110">Newfoundland</option>
              <option value="010111">Saint Bernard</option>
              <option value="011000">Old English Sheepdog</option>
              <option value="011001">Irish Wolfhound</option>
              <option value="011010">Greyhound</option>
              <option value="011011">Scottish Deerhound</option>
              <option value="011100">Great Pyrenees</option>
              <option value="011101">Shar Pei</option>
              <option value="011110">Doberman Pinscher</option>
              <option value="011111">Pekingese</option>
              <option value="100000">Bernese Mountain Dog</option>
              <option value="100001">Pembroke Welsh Corgi</option>
              <option value="100010">Shetland Sheepdog</option>
              <option value="100011">Weimaraner</option>
              <option value="100100">Cavalier King Charles Spaniel</option>
              <option value="100101">Border Collie</option>
              <option value="100110">Chesapeake Bay Retriever</option>
              <option value="100111">Collie</option>
              <option value="101000">Dalmatian</option>
            </select>

            <label htmlFor="feature2">Country Of Origin:</label>
            <select
              id="feature2"
              name="feature2"
              value={features.feature2}
              onChange={handleChange}
            >
              <option value="0001">Canada</option>
              <option value="0010">Germany</option>
              <option value="0011">England</option>
              <option value="0100">France</option>
              <option value="0101">Mexico</option>
              <option value="0110">Scotland</option>
              <option value="0111">China</option>
              <option value="1000">Russia</option>
              <option value="1001">Australia</option>
              <option value="1010">Switzerland</option>
              <option value="1011">United Kingdom</option>
              <option value="1100">Ireland</option>
              <option value="1101">United States</option>
            </select>

            <label htmlFor="feature3">Fur Color:</label>
            <select
              id="feature3"
              name="feature3"
              value={features.feature3}
              onChange={handleChange}
            >
              <option value="00001">Yellow</option>
              <option value="00010">Black</option>
              <option value="00011">White</option>
              <option value="00100">Fawn</option>
              <option value="00101">Golden</option>
              <option value="00110">Orange</option>
              <option value="00111">Apricot</option>
              <option value="01000">Red</option>
              <option value="01001">Blue</option>
              <option value="01010">Grey</option>
              <option value="01011">Cream</option>
              <option value="01100">Varies</option>
              <option value="01101">Tricolor</option>
              <option value="01110">Various</option>
              <option value="01111">Black & Tan</option>
            </select>

            <label htmlFor="feature4">Height:</label>
            <select
              id="feature4"
              name="feature4"
              value={features.feature4}
              onChange={handleChange}
            >
              <option value="110">59CM ++</option>
              <option value="101">44CM - 58CM</option>
              <option value="100">38CM - 43CM</option>
              <option value="011">31CM - 37CM</option>
              <option value="010">24CM - 30CM</option>
              <option value="001">23CM --</option>
            </select>

            <label htmlFor="feature5">Eye Color:</label>
            <select
              id="feature5"
              name="feature5"
              value={features.feature5}
              onChange={handleChange}
            >
              <option value="01">Brown</option>
              <option value="10">Blue</option>
            </select>

            <label htmlFor="feature6">Age:</label>
            <select
              id="feature6"
              name="feature6"
              value={features.feature6}
              onChange={handleChange}
            >
              <option value="00010">2</option>
              <option value="00011">3</option>
              <option value="00100">4</option>
              <option value="00101">5</option>
              <option value="00110">6</option>
              <option value="00111">7</option>
              <option value="01000">8</option>
              <option value="01001">9</option>
              <option value="01010">10</option>
              <option value="01011">11</option>
              <option value="01100">12</option>
              <option value="01101">13</option>
              <option value="01110">14</option>
              <option value="01111">15</option>
              <option value="10000">16</option>
              <option value="10001">17</option>
              <option value="10010">18</option>
            </select>

            <label htmlFor="feature7">Character:</label>
            <select
              id="feature7"
              name="feature7"
              value={features.feature7}
              onChange={handleChange}
            >
              <option value="00001">Loyal</option>
              <option value="00010">Playful</option>
              <option value="00011">Gentle</option>
              <option value="00100">Intelligent</option>
              <option value="00101">Energetic</option>
              <option value="00110">Independent</option>
              <option value="00111">Confident</option>
              <option value="01000">Brave</option>
              <option value="01001">Kind</option>
              <option value="01010">Good-natured</option>
              <option value="01011">Curious</option>
              <option value="01100">Sensitive</option>
              <option value="01101">Charming</option>
              <option value="01110">Strong</option>
              <option value="01111">Patient</option>
              <option value="10000">Athletic</option>
              <option value="10001">Social</option>
              <option value="10010">Protective</option>
              <option value="10011">Affectionate</option>
              <option value="10100">Outgoing</option>
              <option value="10101">Friendly</option>
              <option value="10110">Alert</option>
            </select>

            <label htmlFor="feature8">Health:</label>
            <select
              id="feature8"
              name="feature8"
              value={features.feature8}
              onChange={handleChange}
            >
              <option value="001">Healthy</option>
              <option value="010">Hip dysplasia</option>
              <option value="011">Ear infections</option>
              <option value="100">Dental problems</option>
              <option value="101">Eye problems</option>
              <option value="110">Breathing problems</option>
            </select>

            <button type="submit">Find Match</button>
          </form>
          {result && (
            <div id="result">Recommended Indices: {result.join(", ")}</div>
          )}
        </div>
      </div>
      <div>
        <div className="column">
          <h3 style={{ display: "flex", justifyContent: "center" }}>
            Listing Dogs For Waiting Partners{" "}
          </h3>
          <div className="pet-list">
            {matchingDogs.map((pet, index) => {
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
                        <div className="pet-info-text">Breed: {pet.breed}</div>
                        <div className="pet-info-text">
                          Country Of Origin: {pet.countryOfOrigin}
                        </div>
                        <div className="pet-info-text">
                          Fur Color: {pet.furColor}
                        </div>
                        <div className="pet-info-text">
                          Height: {pet.height}
                        </div>
                        <div className="pet-info-text">
                          Eye Color: {pet.eyeColor}
                        </div>
                        <div className="pet-info-text">Age: {pet.age}</div>
                        <div className="pet-info-text">
                          Character: {pet.character}
                        </div>
                        <div className="pet-info-text">
                          Health: {pet.health}
                        </div>
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

export default DogMatchForm;
