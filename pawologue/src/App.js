import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import MapComponent from "./MapComponent";
import dogPhoto from './dog.jpg';
import catPhoto from './cat.jpg';

function Navbar() {
  return (
    <div style={styles.navbar}>
      <div>
        <Link to="/" style={styles.navbarLink}>
          Pawologue
        </Link>
      </div>
      <div style={{ flexGrow: 1, textAlign: "center" }}>
        <Link to="/mapcomponent" style={styles.button}>
          Map Component
        </Link>
      </div>
      <div>
        <Link to="/login" style={styles.button}>
          Login
        </Link>
        <Link to="/signup" style={{ ...styles.button, marginLeft: "10px" }}>
          Sign Up
        </Link>
      </div>
    </div>
  );
}

function HomePage() {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Navbar />
      <h1>Welcome to Pawologue</h1>
      <div style={{ display: "flex", justifyContent: "center"}}>
        <div style={{margin:"20px" , alignItems:"center" }}>

        
        <p >
          Dogs are domesticated mammals that belong to the Canidae family, which
          also includes wolves, foxes, and other similar species. They are
          highly social animals and often form strong bonds with their human
          companions, earning them the title of "man's best friend." Dogs have
          been selectively bred for thousands of years for various purposes,
          including hunting, herding, guarding, and companionship, resulting in
          the wide variety of breeds we see today. Their sense of smell is
          highly developed, far surpassing that of humans, making them excellent
          trackers and detection animals. Dogs communicate through a combination
          of vocalizations, body language, and scent marking, allowing them to
          convey a wide range of emotions and intentions. Training and
          socialization are essential for dogs to become well-behaved and
          well-adjusted pets. Positive reinforcement methods are widely
          recommended for training. Regular exercise is crucial for maintaining
          a dog's physical and mental health. Daily walks, playtime, and mental
          stimulation activities help prevent boredom and behavioral issues.
          Dogs require a balanced diet tailored to their age, size, activity
          level, and health status. High-quality commercial dog food or a
          properly formulated homemade diet is recommended. Responsible pet
          ownership involves providing proper healthcare, including
          vaccinations, parasite prevention, dental care, and regular check-ups
          with a veterinarian. Dogs can provide emotional support and therapy to
          humans, and many are trained as service animals to assist individuals
          with disabilities or provide comfort in various settings.
        </p>
        <img src={dogPhoto} style={{width:"600px", marginLeft:"100px"}} />
        </div>
        <div style={{margin:"20px" , alignItems:"center"}}>

        
        <p >
          Cats are small carnivorous mammals known for their agility, grace, and
          independent nature. They belong to the Felidae family, which also
          includes lions, tigers, and other wild cats. Domestic cats are
          descended from wild ancestors that were domesticated over 10,000 years
          ago, likely for their ability to control pests such as rodents. Cats
          are highly territorial animals and often establish territories that
          they defend from other cats. They use scent marking and body language
          to communicate with other cats. Unlike dogs, cats are not pack animals
          and are generally solitary hunters in the wild. However, they can form
          close bonds with their human caregivers and other household pets. Cats
          are known for their grooming behavior, spending a significant amount
          of time grooming themselves to keep their fur clean and free of
          parasites. While cats are often portrayed as aloof and independent,
          they can be affectionate and social creatures, forming strong bonds
          with their owners and seeking out companionship. Training cats is
          possible but requires patience, consistency, and positive
          reinforcement techniques. They can learn basic commands and behaviors
          but may not be as responsive to training as dogs. Cats have specific
          dietary requirements as obligate carnivores, meaning they need meat to
          thrive. High-quality commercial cat food or a balanced homemade diet
          is essential for their health. Regular veterinary care, including
          vaccinations, parasite prevention, dental care, and wellness exams, is
          crucial for keeping cats healthy and detecting any potential health
          issues early. Cats can provide emotional support and companionship to
          their owners, and many people find comfort and joy in their presence.
          They may also exhibit therapeutic benefits for individuals dealing
          with stress, anxiety, or depression.
        </p>
        <img src={catPhoto} style={{width:"500px", marginLeft:"200px"}} />
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <div style={styles.container}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/mapcomponent" element={<MapComponent />} />
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
  navbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#6a1b9a",
    color: "#fff",
    padding: "10px 20px",
    width: "100%",
    boxSizing: "border-box",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  navbarLink: {
    textDecoration: "none",
    color: "#fff",
    fontSize: "1.2rem",
    fontWeight: "bold",
  },
  button: {
    padding: "8px 16px",
    borderRadius: "5px",
    backgroundColor: "#fff",
    color: "#6a1b9a",
    textDecoration: "none",
    border: "none",
    cursor: "pointer",
  },
};

export default App;
