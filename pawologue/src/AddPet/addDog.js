import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import "./addDog.css"; // Stil için CSS dosyasını içe aktar
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const AddDog = ({ onSubmit }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [submittedNotices, setSubmittedNotices] = useState([]);
  const [fileInputKey, setFileInputKey] = useState(Date.now()); // File input key
  const [submitSuccess, setSubmitSuccess] = useState(false); // Submit başarılı mı?
  const storage = getStorage();

  useEffect(() => {
    const storedCurrentUser = localStorage.getItem(`currentUser`);
    if (storedCurrentUser) {
      setCurrentUser(JSON.parse(storedCurrentUser));
    }
  }, []);

  const [dogInfo, setDogInfo] = useState({
    name: "",
    location: "",
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

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await fetch(
          "https://pawologue-default-rtdb.firebaseio.com/DogDBMatch.json"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch notices");
        }
        const data = await response.json();
        const notices = [];
        for (const key in data) {
          const notice = { id: key, ...data[key] };
          if (!currentUser || notice.createdBy !== currentUser.name) {
            continue;
          }
          notices.push(notice);
        }
        setSubmittedNotices(notices);
      } catch (error) {
        console.error("Error fetching notices:", error);
      }
    };

    if (currentUser) {
      fetchNotices();
    }
  }, [currentUser]);

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

    const updatedDogInfo = {
      ...dogInfo,
      createdBy: currentUser.name,
      email: currentUser.email,
    };

    try {
      const storageRef = ref(storage, "photos/" + dogInfo.photo.name);
      const uploadTask = uploadBytesResumable(storageRef, dogInfo.photo);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          console.error("Error uploading file", error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            updatedDogInfo.photoURL = downloadURL;

            fetch(
              "https://pawologue-default-rtdb.firebaseio.com/DogDBMatch.json",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedDogInfo),
              }
            )
              .then((res) => {
                if (res.ok) {
                  console.log("Message sent to database");
                  onSubmit(updatedDogInfo);
                  setSubmitSuccess(true); // Başarı durumunu ayarla
                  console.log("123");
                  console.log(submitSuccess);
                  setDogInfo({
                    // Form alanlarını sıfırla
                    name: "",
                    location: "",
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
                  setFileInputKey(Date.now()); // Input alanını sıfırla
                  setTimeout(() => {
                    setSubmitSuccess(false);
                  }, 5000); // 5 saniye sonra mesajı gizle
                } else {
                  console.log("Message didn't send. Error!");
                }
              })
              .catch((error) => {
                console.error("Error sending message:", error);
              });
          });
        }
      );
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const removeNotice = (id) => {
    fetch(
      `https://pawologue-default-rtdb.firebaseio.com/DogDBMatch/${id}.json`,
      {
        method: "DELETE",
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete notice");
        }
        const updatedNotices = submittedNotices.filter(
          (notice) => notice.id !== id
        );
        setSubmittedNotices(updatedNotices);
      })
      .catch((error) => {
        console.error("Error deleting notice:", error);
      });
  };

  return (
    <div>
      <Navbar />
      <div className="rehome-container">
        <h2>Dog Info</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Enter pet name"
            value={dogInfo.name}
            onChange={handleChange}
          />
          <input
            type="text"
            name="location"
            placeholder="Enter location"
            value={dogInfo.location}
            onChange={handleChange}
          />
          <select name="breed" value={dogInfo.breed} onChange={handleChange}>
            <option value="">Select Breed</option>
            <option>Labrador Retriever</option>
            <option>German Shepherd</option>
            <option>Bulldog</option>
            <option>Poodle</option>
            <option>Beagle</option>
            <option>Chihuahua</option>
            <option>Boxer</option>
            <option>Golden Retriever</option>
            <option>Pug</option>
            <option>Rottweiler</option>
            <option>Siberian Husky</option>
            <option>Dachshund</option>
            <option>Shih Tzu</option>
            <option>Bichon Frise</option>
            <option>Australian Shepherd</option>
            <option>Basset Hound</option>
            <option>Cocker Spaniel</option>
            <option>French Bulldog</option>
            <option>Pomeranian</option>
            <option>Great Dane</option>
            <option>Mastiff</option>
            <option>Newfoundland</option>
            <option>Saint Bernard</option>
            <option>Old English Sheepdog</option>
            <option>Irish Wolfhound</option>
            <option>Greyhound</option>
            <option>Scottish Deerhound</option>
            <option>Great Pyrenees</option>
            <option>Shar Pei</option>
            <option>Doberman Pinscher</option>
            <option>Pekingese</option>
            <option>Bernese Mountain Dog</option>
            <option>Pembroke Welsh Corgi</option>
            <option>Shetland Sheepdog</option>
            <option>Weimaraner</option>
            <option>Cavalier King Charles Spaniel</option>
            <option>Border Collie</option>
            <option>Chesapeake Bay Retriever</option>
            <option>Collie</option>
            <option>Dalmatian</option>
          </select>
          <select
            name="countryOfOrigin"
            value={dogInfo.countryOfOrigin}
            onChange={handleChange}
          >
            <option value="">Select Country of Origin</option>
            <option>Canada</option>
            <option>Germany</option>
            <option>England</option>
            <option>France</option>
            <option>Mexico</option>
            <option>Scotland</option>
            <option>China</option>
            <option>Russia</option>
            <option>Australia</option>
            <option>Switzerland</option>
            <option>United Kingdom</option>
            <option>Ireland</option>
            <option>United States</option>
          </select>
          <select
            name="furColor"
            value={dogInfo.furColor}
            onChange={handleChange}
          >
            <option value="">Select Fur Color</option>
            <option>Yellow</option>
            <option>Black</option>
            <option>White</option>
            <option>Fawn</option>
            <option>Golden</option>
            <option>Orange</option>
            <option>Apricot</option>
            <option>Red</option>
            <option>Blue</option>
            <option>Grey</option>
            <option>Cream</option>
            <option>Varies</option>
            <option>Tricolor</option>
            <option>Various</option>
            <option>Black & Tan</option>
          </select>
          <select name="height" value={dogInfo.height} onChange={handleChange}>
            <option value="">Select Height</option>
            <option>59CM ++</option>
            <option>44CM - 58CM</option>
            <option>38CM - 43CM</option>
            <option>31CM - 37CM</option>
            <option>24CM - 30CM</option>
            <option>23CM --</option>
          </select>
          <select
            name="eyeColor"
            value={dogInfo.eyeColor}
            onChange={handleChange}
          >
            <option value="">Select Eye Color</option>
            <option>Brown</option>
            <option>Blue</option>
          </select>
          <select name="age" value={dogInfo.age} onChange={handleChange}>
            <option value="">Select Age</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
            <option>9</option>
            <option>10</option>
            <option>11</option>
            <option>12</option>
            <option>13</option>
            <option>14</option>
            <option>15</option>
            <option>16</option>
            <option>17</option>
            <option>18</option>
          </select>
          <select
            name="character"
            value={dogInfo.character}
            onChange={handleChange}
          >
            <option value="">Select Character</option>
            <option>Friendly</option>
            <option>Confident</option>
            <option>Intelligent</option>
            <option>Playful</option>
            <option>Loyal</option>
            <option>Energetic</option>
            <option>Protective</option>
            <option>Affectionate</option>
            <option>Calm</option>
            <option>Social</option>
            <option>Independent</option>
            <option>Brave</option>
            <option>Good natured</option>
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
          <input
            key={fileInputKey} // Key değişikliği burada uygulanıyor
            type="file"
            name="photo"
            onChange={handlePhotoChange}
          />
          <button
            type="submit"
            disabled={
              !dogInfo.breed ||
              !dogInfo.eyeColor ||
              !dogInfo.furColor ||
              !dogInfo.character ||
              !dogInfo.countryOfOrigin ||
              !dogInfo.age ||
              !dogInfo.health ||
              !dogInfo.height ||
              !dogInfo.name ||
              !dogInfo.location ||
              !dogInfo.photo
            }
          >
            Submit
          </button>
        </form>
        {dogInfo.submitDone && (
          <p>We add your dog to our system successfully.</p>
        )}
      </div>
      <div className="remove-notice">
        <h2>Remove notice</h2>
        <ul>
          {submittedNotices.map((notice) => (
            <li key={notice.id}>
              {notice.name} ({notice.breed})
              <button onClick={() => removeNotice(notice.id)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default AddDog;
