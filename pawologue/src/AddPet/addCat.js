import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import "./addCat.css"; // Stil için CSS dosyasını içe aktar
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const AddCat = ({ onSubmit }) => {
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

  const [catInfo, setCatInfo] = useState({
    name:"",
    location:"",
    breed: "",
    age: "",
    characteristicFeatures: "",
    colorOfEye: "",
    typesOfFur: "",
    commonDisease: "",
    photo: null,
    submitDone: false,
  });

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await fetch(
          "https://pawologue-default-rtdb.firebaseio.com/CatDBMatch.json"
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
    setCatInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePhotoChange = (e) => {
    const photo = e.target.files[0];
    setCatInfo((prevState) => ({
      ...prevState,
      photo,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedCatInfo = {
      ...catInfo,
      createdBy: currentUser.name,
      email: currentUser.email,
    };

    try {
      const storageRef = ref(storage, "photos/" + catInfo.photo.name);
      const uploadTask = uploadBytesResumable(storageRef, catInfo.photo);

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
            updatedCatInfo.photoURL = downloadURL;

            fetch(
              "https://pawologue-default-rtdb.firebaseio.com/CatDBMatch.json",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedCatInfo),
              }
            )
              .then((res) => {
                if (res.ok) {
                  console.log("Message sent to database");
                  onSubmit(updatedCatInfo);
                  setSubmitSuccess(true); // Başarı durumunu ayarla
                  console.log("123");
                  console.log(submitSuccess);
                  setCatInfo({  // Form alanlarını sıfırla
                    name: "",      
                    location:"",             
                    breed: "",
                    age: "",
                    characteristicFeatures: "",
                    colorOfEye: "",
                    typesOfFur: "",
                    commonDisease: "",
                    photo: null,
                    submitDone:true,
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
      `https://pawologue-default-rtdb.firebaseio.com/CatDBMatch/${id}.json`,
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
        <h2>Cat Info</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Enter cat name"
            value={catInfo.name}
            onChange={handleChange}
          />
          <input
            type="text"
            name="location"
            placeholder="Enter location"
            value={catInfo.location}
            onChange={handleChange}
          />
          <select
            name="breed"
            value={catInfo.breed}
            onChange={handleChange}
          >
            <option >Select Breed</option>
            <option>Siamese</option>
                <option>Maine Coon</option>
                <option>Scottish Fold</option>
                <option>Sphynx</option>
                <option>British Shorthair</option>
                <option>Persian</option>
                <option>Ragdoll</option>
                <option>Bengal</option>
                <option>Turkish Van</option>
                <option>Abyssinian</option>
                <option>Birman</option>
                <option>Exotic Shorthair</option>
                <option>Devon Rex</option>
                <option>Oriental</option>
                <option>Burmese</option>
                <option>Russian Blue</option>
                <option>American Shorthair</option>
                <option>Cornish Rex</option>
                <option>Turkish Angora</option>
                <option>Tonkinese</option>
                <option>Himalayan</option>
          </select>
          <select
            name="age"
            value={catInfo.age}
            onChange={handleChange}
          >
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
          </select>
          
          <select
            name="characteristicFeatures"
            value={catInfo.characteristicFeatures}
            onChange={handleChange}
          >
            <option value="">Characteristic Features</option>
            <option>Talkative</option>
                <option>Affectionate</option>
                <option>Curled Ears</option>
                <option>Curious</option>
                <option>Calm</option>
                <option>Intelligent</option>
                <option>Docile</option>
                <option>Energetic</option>
                <option>Playful</option>
                <option>Active</option>
                <option>Friendly</option>
          </select>
          <select
            name="colorOfEye"
            value={catInfo.colorOfEye}
            onChange={handleChange}
          >
            <option>Select Color of Eye</option>
            <option>Blue</option>
            <option>Golden</option>
            <option>Green</option>
            <option>Golden-Green</option>
            <option>Yellow</option>
            <option>Golden-Blue</option>
            <option>Green-Blue</option>
          </select>
          <select
            name="typesOfFur"
            value={catInfo.typesOfFur}
            onChange={handleChange}
          >
            <option value="">Select Types of Fur</option>
            <option>Short</option>
            <option>Long</option>
            <option>Short-Wavy</option>
            <option>Hairless</option>
          </select>
          
          <select
            name="commonDisease"
            value={catInfo.commonDisease}
            onChange={handleChange}
          >
            <option value="">Common Disease</option>
            <option>Chronic Kidney Disease</option>
            <option>Hypertrophic Cardiomyopathy (HCM)</option>
            <option>Osteochondrodysplasia</option>
            <option>Eczema</option>
            <option>Polycystic Kidney Disease (PKD)</option>
            <option>Hip Dysplasia, Patellar Luxation</option>
            <option>Inherited Hyperkalemia (KHT), Phakomelia-Microphthalmia</option>
            <option>Periodontal Disease</option>
            <option>Glaucoma</option>
            <option>Inherited Hair Loss</option>
            <option>Healthy</option>
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
              !catInfo.breed ||
              !catInfo.age ||
              !catInfo.characteristicFeatures ||
              !catInfo.colorOfEye ||
              !catInfo.commonDisease ||
              !catInfo.name ||
              !catInfo.location ||
              !catInfo.typesOfFur ||
              !catInfo.photo
            }
          >
            Submit
          </button>
        </form>
        {catInfo.submitDone && <p>We added your cat to our system successfully.</p>}
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
export default AddCat;
