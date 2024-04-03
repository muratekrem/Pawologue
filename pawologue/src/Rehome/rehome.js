// Rehome.js

import React, { useState } from "react";
import Navbar from "../Navbar";
import "./rehome.css"; // Import CSS file for styling

const Rehome = ({ onSubmit }) => {
  const [petInfo, setPetInfo] = useState({
    name: "",
    age: "",
    breed: "",
    location: "",
    photo: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPetInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePhotoChange = (e) => {
    const photo = e.target.files[0];
    setPetInfo((prevState) => ({
      ...prevState,
      photo,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(petInfo);
    setPetInfo({
      name: "",
      age: "",
      breed: "",
      location: "",
      photo: null,
    });
  };

  return (
    <div>
        <Navbar />
    
    <div className="rehome-container">
      
      <h2>Rehome</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Enter pet name"
          value={petInfo.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="age"
          placeholder="Enter pet age"
          value={petInfo.age}
          onChange={handleChange}
        />
        <input
          type="text"
          name="breed"
          placeholder="Enter pet breed"
          value={petInfo.breed}
          onChange={handleChange}
        />
        <input
          type="text"
          name="location"
          placeholder="Enter pet location"
          value={petInfo.location}
          onChange={handleChange}
        />
        <input type="file" name="photo" onChange={handlePhotoChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
    </div>
  );
};

export default Rehome;
