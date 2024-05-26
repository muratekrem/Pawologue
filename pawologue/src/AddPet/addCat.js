import React, { useState } from 'react';
import Navbar from "../Navbar";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import './addCat.css'; // Stil için CSS dosyasını içe aktar

const AddCat = ({ onSubmit }) => {
  const [catInfo, setCatInfo] = useState({
    breed: "",
    age: "",
    characteristicFeatures: "",
    colorOfEye: "",
    typesOfFur: "",
    commonDisease: "",
    photo: null,
    submitDone: false,
  });

  const storage = getStorage();

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

    try {
      const storageRef = ref(storage, 'catPhotos/' + catInfo.photo.name);
      const uploadTask = uploadBytesResumable(storageRef, catInfo.photo);

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
            const updatedCatInfo = {
              ...catInfo,
              photoURL: downloadURL,
            };

            fetch("https://pawologue-default-rtdb.firebaseio.com/CatDBMatch.json", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(updatedCatInfo),
            })
              .then((res) => {
                if (res.ok) {
                  console.log("Cat info sent to database");
                  onSubmit(updatedCatInfo);
                  setCatInfo({
                    breed: "",
                    age: "",
                    characteristicFeatures: "",
                    colorOfEye: "",
                    typesOfFur: "",
                    commonDisease: "",
                    photo: null,
                    submitDone: true,
                  });
                } else {
                  console.log("Cat info didn't send. Error!");
                }
              })
              .catch((error) => {
                console.error("Error sending cat info:", error);
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
      <div className="add-cat-container">
        <div className="cat-box">
          <h2>Add Cat Information</h2>
          <form onSubmit={handleSubmit}>
            <select name="breed" value={catInfo.breed} onChange={handleChange}>
              <option value="">Select Breed</option>
              {/* Buraya seçenekler ekleyin */}
            </select>
            <select name="age" value={catInfo.age} onChange={handleChange}>
              <option value="">Select Age</option>
              {/* Buraya seçenekler ekleyin */}
            </select>
            <select name="characteristicFeatures" value={catInfo.characteristicFeatures} onChange={handleChange}>
              <option value="">Select Characteristic Features</option>
              {/* Buraya seçenekler ekleyin */}
            </select>
            <select name="colorOfEye" value={catInfo.colorOfEye} onChange={handleChange}>
              <option value="">Select Color of Eye</option>
              {/* Buraya seçenekler ekleyin */}
            </select>
            <select name="typesOfFur" value={catInfo.typesOfFur} onChange={handleChange}>
              <option value="">Select Types of Fur</option>
              {/* Buraya seçenekler ekleyin */}
            </select>
            <select name="commonDisease" value={catInfo.commonDisease} onChange={handleChange}>
              <option value="">Select Common Disease</option>
              {/* Buraya seçenekler ekleyin */}
            </select>
            <input type="file" name="photo" onChange={handlePhotoChange} />
            <button type="submit" disabled={!catInfo.photo}>Submit</button>
            {catInfo.submitDone && <p>Cat information submitted successfully.</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCat;
