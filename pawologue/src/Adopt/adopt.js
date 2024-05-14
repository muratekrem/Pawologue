import React from "react";
import { Link } from "react-router-dom"; // Link componentini import et
import Navbar from "../Navbar";
import "./adopt.css";

const Adopt = ({ adoptedPets, createdBy }) => {
  // Check if all adopted pets are dogs or cats
  const allDogs = adoptedPets.every((pet) => pet.type === "dog");
  const allCats = adoptedPets.every((pet) => pet.type === "cat");

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
                        <Link to="/chat" className="button">Start Conversation</Link>
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
                        <Link to="/chat" className="button">Start Conversation</Link>
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
