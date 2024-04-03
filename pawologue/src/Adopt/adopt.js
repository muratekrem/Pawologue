import React from "react";
import Navbar from "../Navbar";
import "./adopt.css";

const Adopt = ({ adoptedPets }) => {
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
          {adoptedPets.map((pet, index) => {
            if (pet.type === "cat") {
              return (
                <div key={index} className="pet-card">
                  {pet.photo && (
                    <img src={URL.createObjectURL(pet.photo)} alt="" width={250} />
                  )}
                  <p>Name: {pet.name}</p>
                  <p>Age: {pet.age}</p>
                  <p>Breed: {pet.breed}</p>
                  <p>Location: {pet.location}</p>
                </div>
              );
            }
            return null;
          })}
        </div>
        <div className="divider"></div>
        <div className="column">
          <h3>Dogs</h3>
          {adoptedPets.map((pet, index) => {
            if (pet.type === "dog") {
              return (
                <div key={index} className="pet-card">
                  {pet.photo && (
                    <img src={URL.createObjectURL(pet.photo)} alt="" width={250} />
                  )}
                  <p>Name: {pet.name}</p>
                  <p>Age: {pet.age}</p>
                  <p>Breed: {pet.breed}</p>
                  <p>Location: {pet.location}</p>
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
};

export default Adopt;
