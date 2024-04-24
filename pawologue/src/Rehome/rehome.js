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
    type: "",
    click: false,
    submitDone: false // Added submitDone state
  });

  const [dogSelected, setDogSelected] = useState(false);
  const [catSelected, setCatSelected] = useState(false);

  const handleTypeSelection = (type) => {
    setPetInfo((prevState) => ({
      ...prevState,
      type
    }));
    if (type === "dog") {
      setDogSelected(true);
      setCatSelected(false);
    } else if (type === "cat") {
      setCatSelected(true);
      setDogSelected(false);
    }
    // Update click state based on form fields
    setPetInfo((prevState) => ({
      ...prevState,
      click:
        prevState.name !== "" &&
        prevState.age !== "" &&
        prevState.breed !== "" &&
        prevState.location !== "" &&
        type !== "" // Check if type is selected
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPetInfo((prevState) => ({
      ...prevState,
      [name]: value,
      click:
        prevState.name !== "" &&
        prevState.age !== "" &&
        prevState.breed !== "" &&
        prevState.location !== "" &&
        prevState.type !== "" // Check if type is selected
    }));
  };

  const handlePhotoChange = (e) => {
    const photo = e.target.files[0];
    setPetInfo((prevState) => ({
      ...prevState,
      photo,
      click:
        prevState.name !== "" &&
        prevState.age !== "" &&
        prevState.breed !== "" &&
        prevState.location !== "" &&
        prevState.type !== "" // Check if type is selected
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(petInfo);
    setPetInfo((prevState) => ({
      ...prevState,
      submitDone: true
    }));
    // Reset form fields
    setPetInfo({
      name: "",
      age: "",
      breed: "",
      location: "",
      photo: null,
      type: "",
      click: false,
      submitDone: false
    });
    setDogSelected(false);
    setCatSelected(false);
  };

  return (
    <div>
      <Navbar />
      <div className="rehome-container">
        <h2>Rehome</h2>
        <div style={{display:"flex", justifyContent:"center", marginBottom:"5px"}}>
          <div>
            <button 
              type="button" 
              disabled={dogSelected} 
              onClick={() => handleTypeSelection("dog")}
            >
              The pet is a Dog
            </button>
          </div>
          <div>
            <button 
              type="button" 
              disabled={catSelected} 
              onClick={() => handleTypeSelection("cat")}
            >
              The pet is a Cat
            </button>
          </div>
        </div>
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
          <button type="submit" disabled={!petInfo.click}>Submit</button>
          {petInfo.submitDone && <p>We hope the life lives in a home, submit is done.</p>}
        </form>
      </div>
    </div>
  );
};

export default Rehome;
