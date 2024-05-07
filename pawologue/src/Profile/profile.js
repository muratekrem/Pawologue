// import React, { useState, useEffect } from 'react';
// import app from '../firebase'; // Firebase bağlantısını içe aktarın
// import {get, ref} from "firebase/database";
// import database from "../firebase";

// function Profile() {
//   const [userData, setUserData] = useState([]); // Kullanıcı verilerini saklamak için bir state

//   useEffect(() => {
//     // Firebase'den kullanıcı verilerini almak için bir fonksiyon tanımlayın
//     const userDataRef = ref(database ,"UserData");
//     get(userDataRef).then((snapshot)=>{
//         if(snapshot.exists()){
//             const usersArray = Object.entries(snapshot.val()).map(([id , data])=>({
//                 id , ...data,
//             }))
//             setUserData(usersArray);
//         } else {
//             console.log("Data not available")
//         }
//     }).catch((error) =>{
//         console.error(error);
//     })

    
//   },[]);

//   return (
//     <div>
//       {userData.map((user) =>(
//         <div key={user.id}>
//             <h2>{user.email}</h2>
//             <p>{user.name}</p>
//             <p>{user.surname}</p>
//             <p>{user.birthday}</p>
//             <p>{user.phoneNumber}</p>
//             </div>
//       ))}
//     </div>
//   );
// }

// export default Profile;

import React, { useEffect, useState } from 'react';

const fetchData = async () => {
  try {
    const response = await fetch("https://pawologue-default-rtdb.firebaseio.com/UserData.json");
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error.message);
    return null;
  }
};

function Profile() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchDataFromFirebase = async () => {
      try {
        const data = await fetchData();
        if (data) {
          // Convert the nested object into an array of user objects
          const userDataArray = Object.values(data);
          setUserData(userDataArray);
          console.log(userDataArray); // Log the array of user objects
          console.log(userDataArray[0].email); // Access email of the first user
        } else {
          console.log("No data available in Firebase");
        }
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };
  
    fetchDataFromFirebase();
  }, []);

  return (
    <div>
      <h1>User Profile</h1>
      {userData ? (
        userData.map(user => (
          <div key={user.email}>
            <p>Email: {user.email}</p>
            <p>Name: {user.name}</p>
            <p>Surname: {user.surname}</p>
            <p>Phone Number: {user.phoneNumber}</p>
            <p>Birthday: {user.birthday}</p>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Profile;