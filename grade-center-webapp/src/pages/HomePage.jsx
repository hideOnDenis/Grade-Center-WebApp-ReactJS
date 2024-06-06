import React from "react";
import Navbar from "../components/Navbar.jsx";
import gradeImage from "../assets/images/gradeImage.jpg";

function HomePage() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Background image */}
      <img
        src={gradeImage}
        alt="Grade Center WebApp React"
        style={{
          position: "absolute",
          width: "100%",
          height: "100vh",
          objectFit: "cover",
          top: 0,
          left: 0,
        }}
      />
      {/* Text overlay */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "white",
          textAlign: "center",
          width: "100%",
          fontSize: "2rem",
          fontWeight: "bold",
          textShadow: "2px 2px 4px rgba(0,0,0,0.6)", // Adding text shadow for better readability
        }}
      >
        Grade Center WebApp React
      </div>
      {/* Navbar rendered last to naturally stack on top */}
      <Navbar
        style={{
          width: "100%",
          position: "fixed",
          top: 0,
          left: 0,
        }}
      />
    </div>
  );
}

export default HomePage;
