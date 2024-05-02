import React, { useState, useEffect } from "react";
import dogPhoto from "../dog.jpg";
import catPhoto from "../cat.jpg";
import Navbar from "../Navbar";

function HomePage() {

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Navbar />
      <h1>Welcome to Pawologue</h1>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ margin: "20px", alignItems: "center" }}>
          <p>
            Dogs are domesticated mammals that belong to the Canidae family,
            which also includes wolves, foxes, and other similar species. They
            are highly social animals and often form strong bonds with their
            human companions, earning them the title of "man's best friend."
            Dogs have been selectively bred for thousands of years for various
            purposes, including hunting, herding, guarding, and companionship,
            resulting in the wide variety of breeds we see today.
          </p>
          <img
            src={dogPhoto}
            style={{ width: "600px", marginLeft: "100px" }}
            alt="Dog"
          />
        </div>
        <div style={{ margin: "20px", alignItems: "center" }}>
          <p>
            Cats are small carnivorous mammals known for their agility, grace,
            and independent nature. They belong to the Felidae family, which
            also includes lions, tigers, and other wild cats. Domestic cats are
            descended from wild ancestors that were domesticated over 10,000
            years ago, likely for their ability to control pests such as
            rodents. Cats are highly territorial animals and often establish
            territories that they defend from other cats.
          </p>
          <img
            src={catPhoto}
            style={{ width: "500px", marginLeft: "200px" }}
            alt="Cat"
          />
        </div>
      </div>
    </div>
  );
}
export default HomePage;
