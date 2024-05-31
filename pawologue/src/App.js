import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import MapComponent from "./Map/MapComponent";
import Pairing from "./Pairing/pairing";
import PetSitting from "./PetSitting/petSitting";
import Adopt from "./Adopt/adopt";
import Rehome from "./Rehome/rehome";
import Homepage from "./Homepage/homepage";
import Profile from "./Profile/profile";
import Chat from "./Chat/chat";
import DogNotices from "./PetSitting/DogNotices";
import DogMatchForm from "./Match/DogMatchForm";
import CatMatchForm from "./Match/CatMatchForm";
import AddDog from "./AddPet/addDog";
import AddCat from "./AddPet/addCat";

function App() {
  const [adoptedPets, setAdoptedPets] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [createdBy, setCreatedBy] = useState(null);

  const handleAdopt = (createdBy) => {
    setCreatedBy(createdBy);
    console.log(createdBy);
  };

  const handleSubmitDog = (dogData) => {
    // Here you can handle the submission of the dog data
    // For example, you can save it to a database or perform any other necessary actions
    console.log("Submitting dog data:", dogData);
  };
  const handleSubmitCat = (catData) => {
    // Here you can handle the submission of the dog data
    // For example, you can save it to a database or perform any other necessary actions
    console.log("Submitting dog data:", catData);
  };
  const handleSubmitPetSitting = (petData) => {
    // Here you can handle the submission of the dog data
    // For example, you can save it to a database or perform any other necessary actions
    console.log("Submitting dog data:", petData);
  };

  return (
    <div style={styles.container}>
      <Router>
        <div className="App">
          <Routes>
            <Route exact path="/" element={<Homepage />} />
            <Route path="/homepage" element={<Homepage />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/rehome"
              element={
                <Rehome currentUser={currentUser} onSubmit={handleAdopt} />
              }
            />
            <Route
              path="/adopt"
              element={
                <Adopt
                  adoptedPets={adoptedPets}
                  onStartConversation={handleAdopt}
                />
              }
            />
            <Route path="/signup" element={<Signup />} />
            <Route path="/mapcomponent" element={<MapComponent />} />
            <Route path="/pairing" element={<Pairing />} />
            <Route
              path="/petSitting"
              element={<PetSitting onSubmit={handleSubmitPetSitting} />}
            />
            <Route path="/profile" element={<Profile />} />
            <Route
              path="/chat"
              element={<Chat createdBy={createdBy} currentUser={currentUser} />}
            />
            <Route path="/dognotices" element={<DogNotices />} />
            <Route path="/dogmatchform" element={<DogMatchForm />} />
            <Route path="/catmatchform" element={<CatMatchForm />} />
            <Route
              path="/adddog"
              element={<AddDog onSubmit={handleSubmitDog} />}
            />
            <Route
              path="/addcat"
              element={<AddCat onSubmit={handleSubmitCat} />}
            />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

const styles = {
  container: {
    width: "100%",
  },
};

export default App;
