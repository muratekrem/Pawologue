import React from "react";
import dogPhoto from "../dog.png";
import catPhoto from "../cat.png";
import Navbar from "../Navbar";
import logobg from "../logobg.png";

function HomePage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        position: "relative",
        minHeight: "98vh",
      }}
    >
      <Navbar />

      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            margin: "20px",
            marginLeft: "40px",
            backgroundColor: "#eeebf0",
            borderRadius: "20px",
            padding: "20px",
            width: "600px",
            height: "350px",
          }}
        >
          <img
            src={dogPhoto}
            style={{ width: "300px", marginRight: "20px", height: "300px" }}
            alt="Dog"
          />
          <div style={{ maxWidth: "300px" }}>
            <h3>🐶 Dogs</h3>
            <p>
              Dogs are domesticated mammals that belong to the Canidae family,
              which also includes wolves, foxes, and other similar species. They
              are highly social animals and often form strong bonds with their
              human companions, earning them the title of "man's best friend."
              Dogs have been selectively bred for thousands of years for various
              purposes, including hunting, herding, guarding, and companionship,
              resulting in the wide variety of breeds we see today.
            </p>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            margin: "20px",
            marginTop: "140px",
            marginRight: "100px",
            backgroundColor: "#eeebf0",
            borderRadius: "20px",
            padding: "20px",
            width: "600px",
            height: "350px",
          }}
        >
          <div style={{ maxWidth: "300px", marginRight: "20px" }}>
            <h3>🐱 Cats</h3>
            <p>
              Cats are small carnivorous mammals known for their agility, grace,
              and independent nature. They belong to the Felidae family, which
              also includes lions, tigers, and other wild cats. Domestic cats
              are descended from wild ancestors that were domesticated over
              10,000 years ago, likely for their ability to control pests such
              as rodents. Cats are highly territorial animals and often
              establish territories that they defend from other cats.
            </p>
          </div>
          <img
            src={catPhoto}
            style={{ width: "300px", height: "300px" }}
            alt="Cat"
          />
        </div>
      </div>

      <img
        src={logobg}
        style={{
          position: "absolute",
          bottom: "20px",
          left: "20px",
          width: "100px",
          transform: "rotate(15deg)",
        }}
        alt="Background Logo"
      />
      <img
        src={logobg}
        style={{
          position: "absolute",
          bottom: "10px",
          left: "130px",
          width: "150px",
          transform: "rotate(-10deg)",
        }}
        alt="Background Logo"
      />
      <img
        src={logobg}
        style={{
          position: "absolute",
          bottom: "70px",
          left: "90px",
          width: "80px",
          transform: "rotate(5deg)",
        }}
        alt="Background Logo"
      />
      <img
        src={logobg}
        style={{
          position: "absolute",
          bottom: "130px",
          left: "60px",
          width: "80px",
          transform: "rotate(0deg)",
        }}
        alt="Background Logo"
      />
      <img
        src={logobg}
        style={{
          position: "absolute",
          bottom: "200px",
          left: "20px",
          width: "50px",
          transform: "rotate(0deg)",
        }}
        alt="Background Logo"
      />
      <img
        src={logobg}
        style={{
          position: "absolute",
          bottom: "10px",
          left: "250px",
          width: "100px",
          transform: "rotate(0deg)",
        }}
        alt="Background Logo"
      />
    </div>
  );
}

export default HomePage;
