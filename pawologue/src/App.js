import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import MapComponent from "./Map/MapComponent";
import Pairing from "./Pairing/pairing";
import PetSitting from "./PetSitting/petSitting";
import Adopt from "./Adopt/adopt";
import Rehome from "./Rehome/rehome";
import Homepage from "./Homepage/homepage";
import Profile from "./Profile/profile";


function App() {
  const [adoptedPets, setAdoptedPets] = useState([]);

  const handleAdopt = (petInfo) => {
    setAdoptedPets((prevPets) => [...prevPets, petInfo]);
  };

  return (
    <div style={styles.container}>
      <Router> {/* Router bileşeni ile App bileşenini sarmalayın */}
        <div className="App">
          <Routes>
            <Route exact path="/" element={<Homepage />} />
            
            <Route path="/homepage" element={<Homepage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/rehome" element={<Rehome onSubmit={handleAdopt} />} />
            <Route path="/adopt" element={<Adopt adoptedPets={adoptedPets} />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/mapcomponent" element={<MapComponent />} />
            <Route path="/pairing" element={<Pairing />} />
            <Route path="/petSitting" element={<PetSitting />} />
            <Route path="/profile" element={<Profile />} />
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
