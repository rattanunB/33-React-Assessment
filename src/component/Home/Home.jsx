import React, { useState } from "react"; // เพิ่ม { useState } จาก React
import "./home.css";
import Navbar from "../Navbar/Navbar";
import HomeContent from "../HomeContern/HomeContent";

const Home = () => {
  const [secter, setSecter] = useState(""); // เพิ่ม useState

  return (
    <>
      <Navbar />
      <div className="home">
        <h1>Generatio Thailand <br />React-Assessment</h1>
        <div className="btnSelect">
          <button className="secterBtn" onClick={() => setSecter("User")}>User Home Sector</button>
          <button className="secterBtn" onClick={() => setSecter("Admin")}>Admin Home Sector</button>
        </div>
        <HomeContent  secter={secter}/>
      </div>
    
    </>
  );
};

export default Home;
