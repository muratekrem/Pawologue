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
