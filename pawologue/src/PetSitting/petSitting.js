import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import "./petSitting.css";
import { getAuth } from "firebase/auth";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const PetSitting = ({ onSubmit, onStartConversation }) => {
  const [currentUser, setCurrentUser] = useState(null); 
  const [submittedNotices, setSubmittedNotices] = useState([]); 
  const [fileInputKey, setFileInputKey] = useState(Date.now()); 
  const storage = getStorage();

  useEffect(() => {
    const storedCurrentUser = localStorage.getItem(`currentUser`);
    if (storedCurrentUser) {
      setCurrentUser(JSON.parse(storedCurrentUser));
    }
  }, []); 

  const [petInfo, setPetInfo] = useState({
    name: "",
    breed: "",
    location: "",
    hourlyRate: "",
    photo: null,
    submitDone: false, 
  });

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await fetch(
          "https://pawologue-default-rtdb.firebaseio.com/petSitting.json"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch notices");
        }
        const data = await response.json();
        const notices = [];
        for (const key in data) {
          const notice = {
            id: key,
            ...data[key],
          };
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

    fetchNotices();
  }, [currentUser]); 

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedPetInfo = {
      ...petInfo,
      createdBy: currentUser.name, 
      email: currentUser.email, 
    };

    try {
      const storageRef = ref(storage, "photos/" + petInfo.photo.name);
      const uploadTask = uploadBytesResumable(storageRef, petInfo.photo);

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
          console.log("File uploaded successfully");

          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            updatedPetInfo.photoURL = downloadURL;

            fetch(
              "https://pawologue-default-rtdb.firebaseio.com/petSitting.json",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedPetInfo),
              }
            )
              .then((res) => {
                if (res.ok) {
                  console.log("Message sent to database");
                  onSubmit(updatedPetInfo);
                  setPetInfo({
                    name: "",
                    breed: "",
                    location: "",
                    hourlyRate: "",
                    photo: null,
                    submitDone: true,
                  });
                  setFileInputKey(Date.now());
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
      `https://pawologue-default-rtdb.firebaseio.com/petSitting/${id}.json`,
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
      <div className="petsitting-container">
        <h2>Pet Sitting</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            key={fileInputKey}
            placeholder="Enter pet name"
            value={petInfo.name}
            onChange={handleChange}
          />
          <input
            type="text"
            name="breed"
            key={fileInputKey}
            placeholder="Enter pet breed"
            value={petInfo.breed}
            onChange={handleChange}
          />
          <input
            type="text"
            name="location"
            key={fileInputKey}
            placeholder="Enter location"
            value={petInfo.location}
            onChange={handleChange}
          />
          <input
            type="text"
            name="hourlyRate"
            key={fileInputKey}
            placeholder="Enter hourly rate"
            value={petInfo.hourlyRate}
            onChange={handleChange}
          />
          <input type="file" name="photo" onChange={handlePhotoChange} />
          <button
            type="submit"
            disabled={
              !petInfo.name ||
              !petInfo.breed ||
              !petInfo.location ||
              !petInfo.hourlyRate ||
              !petInfo.photo ||
              !currentUser
            }
          >
            Submit
          </button>
          {petInfo.submitDone && (
            <p>Pet Sitting advertisement submitted successfully.</p>
          )}
        </form>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        My Notices
      </div>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        {submittedNotices.map((notice, index) => (
          <div key={index}>
            <p>
              {notice.name} - {notice.breed}
            </p>
            <p>Location: {notice.location}</p>
            <p>Hourly Rate: {notice.hourlyRate}</p>
            <button onClick={() => removeNotice(notice.id)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PetSitting;
