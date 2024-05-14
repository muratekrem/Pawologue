import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import "./rehome.css"; // Stil için CSS dosyasını içe aktar
import { getAuth } from "firebase/auth";

const Rehome = ({ onSubmit }) => {
  const [currentUser, setCurrentUser] = useState(null); // currentUser durumunu tanımla
  const [submittedNotices, setSubmittedNotices] = useState([]); // Gönderilmiş ilanları saklamak için bir durum tanımla

  useEffect(() => {
    // localStorage'dan currentUser'ı al
    const storedCurrentUser = localStorage.getItem(`currentUser`);
    if (storedCurrentUser) {
      setCurrentUser(JSON.parse(storedCurrentUser));
    }
  }, []); // useEffect sadece ilk render sırasında çalışacak şekilde ayarlandı

  const [petInfo, setPetInfo] = useState({
    name: "",
    age: "",
    breed: "",
    location: "",
    photo: null,
    type: "",
    click: false,
    submitDone: false, // submitDone durumunu ekle
  });

  const [dogSelected, setDogSelected] = useState(false);
  const [catSelected, setCatSelected] = useState(false);

  useEffect(() => {
    // Gönderilen ilanları almak için Firebase Realtime Database'den veri çek
    const fetchNotices = async () => {
      try {
        const response = await fetch("https://pawologue-default-rtdb.firebaseio.com/Notice.json");
        if (!response.ok) {
          throw new Error("Failed to fetch notices");
        }
        const data = await response.json();
        const notices = [];
        for (const key in data) {
          const notice = {
            id: key,
            ...data[key]
          };
          notices.push(notice);
        }
        setSubmittedNotices(notices);
      } catch (error) {
        console.error("Error fetching notices:", error);
      }
    };

    fetchNotices();
  }, []); // useEffect sadece ilk render sırasında çalışacak şekilde ayarlandı

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
    // Form alanlarına bağlı olarak click durumunu güncelle
    setPetInfo((prevState) => ({
      ...prevState,
      click:
        prevState.name !== "" &&
        prevState.age !== "" &&
        prevState.breed !== "" &&
        prevState.location !== "" &&
        prevState.type !== "", // type seçilmiş mi kontrol et
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
        prevState.type !== "", // type seçilmiş mi kontrol et
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
        prevState.type !== "", // type seçilmiş mi kontrol et
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Oluşturulan pet bilgilerini güncelle
    const updatedPetInfo = {
      ...petInfo,
      createdBy: currentUser.name, // Kullanıcı adını kullan
      email: currentUser.email, // Kullanıcı e-posta adresini kullan
    };

    try {
      // Firebase Realtime Database'e POST isteği gönder
      const res = await fetch("https://pawologue-default-rtdb.firebaseio.com/Notice.json", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPetInfo),
      });
      if (res.ok) {
        console.log("Message sent to database");
        // İşlem başarılı ise onSubmit fonksiyonunu çağırarak veriyi Adopt bileşenine aktar
        onSubmit(updatedPetInfo);

        setPetInfo((prevState) => ({
          ...prevState,
          photo :null ,
          submitDone: true
        }));
        // Submit yapıldıktan sonra form alanlarını sıfırla
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
        console.log("Updated pet info:", petInfo); // Fotoğraf alanının sıfırlandığından emin olmak için petInfo durumunu kontrol et
        setDogSelected(false);
        setCatSelected(false);
      } else {
        console.log("Message didn't send. Error!");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const removeNotice = (id) => {
    // Firebase Realtime Database'den ilanı kaldır
    fetch(`https://pawologue-default-rtdb.firebaseio.com/Notice/${id}.json`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete notice");
        }
        // Başarılı ise güncellenmiş ilanlar listesini ayarla
        const updatedNotices = submittedNotices.filter((notice) => notice.id !== id);
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
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "5px" }}>
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
      <div style={{ display: "flex", justifyContent: "center" }}>My Notices</div>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        {submittedNotices.map((notice, index) => (
          <div key={index}>
            <p>
              {notice.name} - {notice.type}
            </p>
            <button onClick={() => removeNotice(notice.id)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rehome;
