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
  const [currentUser, setCurrentUser] = useState(null); // currentUser durumunu tanımla
  const [submittedNotices, setSubmittedNotices] = useState([]); // Gönderilmiş ilanları saklamak için bir durum tanımla
  const [fileInputKey, setFileInputKey] = useState(Date.now()); // File input key
  const storage = getStorage();

  useEffect(() => {
    // localStorage'dan currentUser'ı al
    const storedCurrentUser = localStorage.getItem(`currentUser`);
    if (storedCurrentUser) {
      setCurrentUser(JSON.parse(storedCurrentUser));
    }
  }, []); // useEffect sadece ilk render sırasında çalışacak şekilde ayarlandı

  const [petInfo, setPetInfo] = useState({
    name: "",
    breed: "",
    location: "",
    hourlyRate: "",
    photo: null,
    submitDone: false, // submitDone durumunu ekle
  });

  useEffect(() => {
    // Gönderilen ilanları almak için Firebase Realtime Database'den veri çek
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
          // Kullanıcı giriş yapmış ve ilan sahibi kendisi değilse, ilanları gösterme
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
  }, [currentUser]); // useEffect sadece ilk render sırasında çalışacak şekilde ayarlandı

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

    // Oluşturulan pet bilgilerini güncelle
    const updatedPetInfo = {
      ...petInfo,
      createdBy: currentUser.name, // Kullanıcı adını kullan
      email: currentUser.email, // Kullanıcı e-posta adresini kullan
    };

    try {
      // Firebase Storage'a dosyayı yükle
      const storageRef = ref(storage, "photos/" + petInfo.photo.name);
      const uploadTask = uploadBytesResumable(storageRef, petInfo.photo);

      // Yükleme tamamlandığında işlem yap
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Yükleme sırasında durumu takip et
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          // Hata durumunda işlem yap
          console.error("Error uploading file", error);
        },
        () => {
          // Yükleme tamamlandığında işlem yap
          console.log("File uploaded successfully");

          // Dosyanın indirme URL'sini al
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            // Dosyanın URL'sini güncellenmiş pet bilgilerine ekle
            updatedPetInfo.photoURL = downloadURL;

            // Firebase Realtime Database'e POST isteği gönder
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
                  // İşlem başarılı ise onSubmit fonksiyonunu çağırarak veriyi Adopt bileşenine aktar
                  onSubmit(updatedPetInfo);
                  // Submit yapıldıktan sonra form alanlarını sıfırla
                  setPetInfo({
                    name: "",
                    breed: "",
                    location: "",
                    hourlyRate: "",
                    photo: null,
                    submitDone: true,
                  });
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
    // Firebase Realtime Database'den ilanı kaldır
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
        // Başarılı ise güncellenmiş ilanlar listesini ayarla
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
