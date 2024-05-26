import React, { useState } from 'react';
import Navbar from "../Navbar";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import './addDog.css'; // Stil için CSS dosyasını içe aktar

const AddDog = ({ onSubmit }) => {
  const [dogInfo, setDogInfo] = useState({
    breed: "",
    countryOfOrigin: "",
    furColor: "",
    height: "",
    eyeColor: "",
    age: "",
    character: "",
    health: "",
    photo: null,
    submitDone: false,
  });

  const storage = getStorage();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDogInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePhotoChange = (e) => {
    const photo = e.target.files[0];
    setDogInfo((prevState) => ({
      ...prevState,
      photo,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const storageRef = ref(storage, 'dogPhotos/' + dogInfo.photo.name);
      const uploadTask = uploadBytesResumable(storageRef, dogInfo.photo);

      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
        },
        (error) => {
          console.error('Error uploading file', error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            const updatedDogInfo = {
              ...dogInfo,
              photoURL: downloadURL,
            };

            fetch("https://pawologue-default-rtdb.firebaseio.com/DogDBMatch.json", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(updatedDogInfo),
            })
              .then((res) => {
                if (res.ok) {
                  console.log("Dog info sent to database");
                  onSubmit(updatedDogInfo);
                  setDogInfo({
                    breed: "",
                    countryOfOrigin: "",
                    furColor: "",
                    height: "",
                    eyeColor: "",
                    age: "",
                    character: "",
                    health: "",
                    photo: null,
                    submitDone: true,
                  });
                } else {
                  console.log("Dog info didn't send. Error!");
                }
              })
              .catch((error) => {
                console.error("Error sending dog info:", error);
              });
          });
        }
      );
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="add-dog-container">
        <div className="dog-box">
          <h2>Add Dog Information</h2>
          <form onSubmit={handleSubmit}>
            <select name="breed" value={dogInfo.breed} onChange={handleChange}>
              <option value="">Select Breed</option>
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
            <select name="countryOfOrigin" value={dogInfo.countryOfOrigin} onChange={handleChange}>
              <option value="">Select Country of Origin</option>
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
            <select name="furColor" value={dogInfo.furColor} onChange={handleChange}>
              <option value="">Select Fur Color</option>
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
            <select name="height" value={dogInfo.height} onChange={handleChange}>
              <option value="">Select Height</option>
              <option value="110">59CM ++</option>
                    <option value="101">44CM - 58CM</option>
                    <option value="100">38CM - 43CM</option>
                    <option value="011">31CM - 37CM</option>
                    <option value="010">24CM - 30CM</option>
                    <option value="001">23CM --</option>
            </select>
            <select name="eyeColor" value={dogInfo.eyeColor} onChange={handleChange}>
              <option value="">Select Eye Color</option>
              <option value="01">Brown</option>
                    <option value="10">Blue</option>
            </select>
            <select name="age" value={dogInfo.age} onChange={handleChange}>
              <option value="">Select Age</option>
              <option value="00010">1</option>
              <option value="00011">2</option>
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
            <select name="character" value={dogInfo.character} onChange={handleChange}>
              <option value="">Select Character</option>
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
            <select name="health" value={dogInfo.health} onChange={handleChange}>
              <option value="">Select Health</option>
              <option value="001">Healthy</option>
                    <option value="010">Hip dysplasia</option>
                    <option value="011">Ear infections</option>
                    <option value="100">Dental problems</option>
                    <option value="101">Eye problems</option>
                    <option value="110">Breathing problems</option>
            </select>
            <input type="file" name="photo" onChange={handlePhotoChange} />
            <button type="submit" disabled={!dogInfo.photo}>Submit</button>
            {dogInfo.submitDone && <p>Dog information submitted successfully.</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddDog;
