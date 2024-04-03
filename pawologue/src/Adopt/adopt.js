// Adopt.js

import React from "react";
import Navbar from "../Navbar";

const Adopt = ({ adoptedPets }) => {
  return (
    <div>
      <Navbar />
      <h2>Adopt</h2>
      <div>
        {adoptedPets.map((pet, index) => (
          <div key={index}>
            <p>Name: {pet.name}</p>
            <p>Age: {pet.age}</p>
            <p>Breed: {pet.breed}</p>
            <p>Location: {pet.location}</p>
            {pet.photo && <img src={URL.createObjectURL(pet.photo)} alt="" />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Adopt;
