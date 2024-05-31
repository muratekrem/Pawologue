import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import "./rehome.css"; // Stil için CSS dosyasını içe aktar
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const Rehome = ({ onSubmit }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [submittedNotices, setSubmittedNotices] = useState([]);
  const [fileInputKey, setFileInputKey] = useState(Date.now()); // File input key
  const storage = getStorage();

  useEffect(() => {
    const storedCurrentUser = localStorage.getItem(`currentUser`);
    if (storedCurrentUser) {
      setCurrentUser(JSON.parse(storedCurrentUser));
    }
  }, []);

  const [petInfo, setPetInfo] = useState({
    name: "",
    age: "",
    breed: "",
    location: "",
    photo: null,
    type: "",
    click: false,
    submitDone: false,
  });

  const [dogSelected, setDogSelected] = useState(false);
  const [catSelected, setCatSelected] = useState(false);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await fetch(
          "https://pawologue-default-rtdb.firebaseio.com/Notice.json"
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

    fetchNotices();
  }, [currentUser]);

  const handleTypeSelection = (type) => {
    setPetInfo((prevState) => ({
      ...prevState,
      type,
    }));
    if (type === "dog") {
      setDogSelected(true);
      setCatSelected(false);
    } else if (type === "cat") {
      setCatSelected(true);
      setDogSelected(false);
    }
    setPetInfo((prevState) => ({
      ...prevState,
      click:
        prevState.name !== "" &&
        prevState.age !== "" &&
        prevState.breed !== "" &&
        prevState.location !== "" &&
        prevState.type !== "" &&
        prevState.photo !== "",
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
        prevState.type !== "" &&
        prevState.photo !== "",
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
        prevState.type !== "" &&
        photo !== null,
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
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            updatedPetInfo.photoURL = downloadURL;

            fetch("https://pawologue-default-rtdb.firebaseio.com/Notice.json", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(updatedPetInfo),
            })
              .then((res) => {
                if (res.ok) {
                  console.log("Message sent to database");
                  onSubmit(updatedPetInfo);
                  setPetInfo({
                    name: "",
                    age: "",
                    breed: "",
                    location: "",
                    photo: null,
                    type: "",
                    click: false,
                    submitDone: true,
                  });
                  setDogSelected(false);
                  setCatSelected(false);
                  setFileInputKey(Date.now()); // Input alanını sıfırla
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
    fetch(`https://pawologue-default-rtdb.firebaseio.com/Notice/${id}.json`, {
      method: "DELETE",
    })
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
        <h2>Rehome</h2>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginBottom: "20px",
          }}
        >
          <div>
            <button
              type="button"
              disabled={dogSelected || !currentUser}
              onClick={() => handleTypeSelection("dog")}
            >
              The pet is a Dog
            </button>
          </div>
          <div>
            <button
              type="button"
              disabled={catSelected || !currentUser}
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
          <input
            key={fileInputKey} // unique key to reset the input
            type="file"
            name="photo"
            onChange={handlePhotoChange}
          />
          <button
            type="submit"
            disabled={!petInfo.click || !petInfo.photo || !currentUser}
          >
            Submit
          </button>
          {petInfo.submitDone && (
            <p>We hope the life lives in a home, submit is done.</p>
          )}
        </form>
      </div>

      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}
      >
        My Notices
      </div>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        {submittedNotices.map((notice, index) => (
          <div key={index}>
            <p>
              {notice.name} - {notice.breed}
            </p>
            <button onClick={() => removeNotice(notice.id)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rehome;
